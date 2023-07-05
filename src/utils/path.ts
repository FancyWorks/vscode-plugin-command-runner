import path from "path";
import { globalConfig } from "../config/GlobalConfig";

export function pathJoin(_path: string) {
  return isAbsolutePath(_path)
    ? _path
    : path.join(globalConfig.workspacePath, _path);
}

function isAbsolutePath(_path: string) {
  return _path.startsWith("/");
}
