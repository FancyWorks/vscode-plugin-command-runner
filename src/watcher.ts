import path from "path";
import chokidar from "chokidar";

const shortname = path.resolve(__dirname, "./obs.js");
console.log(__dirname);

// One-liner for current directory
const watcher = chokidar.watch("test/obs.js").on("all", (event, path) => {
  console.log(event, path);
});
