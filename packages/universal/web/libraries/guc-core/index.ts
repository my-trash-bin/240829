import { Config } from "./lib/types/Config";
import { CSSContent, Media, MediaCompound } from "./lib/types/CSSContent";

export function scanClasses(source: string, config: Config): string[] {
  const { plugins, ...configWithoutPlugins } = config;
  const result: string[] = [];
  for (const plugin of plugins) {
    for (const className of plugin.scanClasses(source, configWithoutPlugins)) {
      result.push(className);
    }
  }
  result.sort();

  const uniqueResult: string[] = [];
  for (let i = 0; i < result.length; i++) {
    if (i === 0 || result[i] !== result[i - 1]) {
      uniqueResult.push(result[i]);
    }
  }

  return uniqueResult;
}

export function cssContent(className: string, config: Config): CSSContent[] {
  const { plugins, ...configWithoutPlugins } = config;
  let result: CSSContent[] | undefined;
  for (const plugin of plugins) {
    let contents = plugin.cssContent(className, configWithoutPlugins);
    if (contents) {
      if (result) {
        throw new Error(
          `Error: there are two or more plugins to process class: ${className}`
        );
      } else {
        result = contents;
      }
    }
  }
  if (!result) {
    throw new Error(
      `Error: failed to find appropriate plugin to process class: ${className}`
    );
  }
  return result;
}

function flatMedia(media: Media[], type: MediaCompound["type"]): Media[] {
  const result: Media[] = [];
  for (const node of media) {
    if (node.type === "terminal") {
      result.push(node);
    } else {
      result.push(...flatMedia(node.media, type));
    }
  }
  return result;
}

function stringifyMedia(media: Media | undefined): string | undefined {
  if (!media) {
    return undefined;
  }
  switch (media.type) {
    case "terminal":
      return `(${media.media})`;
    case "and": {
      return flatMedia(media.media, "and")
        .map((media) =>
          media.type === "or"
            ? `(${stringifyMedia(media)})`
            : stringifyMedia(media)
        )
        .join(" and ");
    }
    case "or": {
      return flatMedia(media.media, "or").map(stringifyMedia).join(",");
    }
  }
}

export function stringify(contents: CSSContent[]): string {
  // TODO: group same media, optimize media
  const result: string[] = [];
  for (const content of contents) {
    const media = stringifyMedia(content.media);
    result.push(
      media
        ? `@media ${media}{${content.selector}{${content.content}}}`
        : `${content.selector}{${content.content}}`
    );
  }
  return result.join("");
}
