import { Plugin } from "./Plugin";
import { Theme } from "./Theme";

export interface Config extends ConfigWithoutPlugins {
  plugins: readonly Plugin[];
}

export interface ConfigWithoutPlugins {
  prefix: string;
  theme: Theme;
  allowArbitraryValue: boolean;
  darkModeStrategy: DarkModeStrategy;
}

export type DarkModeStrategy = DarkModeStrategyClass | DarkModeStrategyMedia;

export interface DarkModeStrategyClass {
  type: "class";
  on: "html" | "body" | "any";
  fallbackDarkMode: boolean;
}

export interface DarkModeStrategyMedia {
  type: "media";
  fallbackDarkMode: boolean;
}
