const path = require("path");
const chokidar = require("chokidar");

const shortname = path.resolve(__dirname, "./obs.js");
console.log(__dirname);

// One-liner for current directory
const watcher = chokidar.watch("file").on("all", (event, path) => {
  console.log(event, path);
});

watcher.add("test/obs.js");

setTimeout(() => {
  // watcher.unwatch("test/obs.js");
}, 400);
