import chokidar from "chokidar";

export function watch(path: string, callback: any) {
  return chokidar.watch(path).on("all", callback);
}

export function createWatcher(callback: any) {
  return chokidar.watch("file").on("all", callback);
}
