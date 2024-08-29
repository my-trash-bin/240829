import { ConfigWithoutPlugins } from "./Config";
import { CSSContent } from "./CSSContent";

export interface Plugin {
  scanClasses: (source: string, config: ConfigWithoutPlugins) => string[];
  cssContent: (
    className: string,
    config: ConfigWithoutPlugins
  ) => CSSContent[] | undefined;
}
