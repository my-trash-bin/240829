export interface Config {
  filesToProcessGlobPattern: string;
  shouldProcess?: (filePath: string) => boolean;
  emitTo: ConfigEmitTo;
  filesToClearBeforeStartGlobPattern?: string;
  shouldClearFileBeforeStart?: (filePath: string) => boolean;
}

export type ConfigEmitTo = ConfigEmitToNearSource | ConfigEmitToOneFile;

export interface ConfigEmitToNearSource {
  to: "nearSource";
  path: ConfigEmitToNearSourcePath;
}

export type ConfigEmitToNearSourcePath =
  | ConfigEmitToNearSourcePathRelativeString
  | ConfigEmitToNearSourcePathFunction;

export interface ConfigEmitToNearSourcePathRelativeString {
  type: "relativePath";
  relativePath: string;
}

export interface ConfigEmitToNearSourcePathFunction {
  type: "function";
  path: (sourcePath: string) => ConfigEmitToNearSourcePathFunctionReturnType;
}

export interface ConfigEmitToNearSourcePathFunctionReturnType {
  path: string;
  onConflict: ConfigEmitToNearSourcePathFunctionReturnTypeOnConflict;
}

export type ConfigEmitToNearSourcePathFunctionReturnTypeOnConflict =
  | "error"
  | "merge"
  | ((
      conflictedPath: string
    ) => ConfigEmitToNearSourcePathFunctionReturnTypeOnConflictReturnType);

export interface ConfigEmitToNearSourcePathFunctionReturnTypeOnConflictReturnType {
  merge: boolean;
}

export interface ConfigEmitToOneFile {
  to: "oneFile";
  path: string;
}
