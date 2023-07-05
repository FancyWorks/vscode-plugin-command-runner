import * as fs from "fs";

export async function isFileExist(filename: string) {
  return new Promise((resolve, reject) => {
    fs.access(filename, fs.constants.R_OK, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

export function readFile(filename: string) {
  return fs.readFileSync(filename, "utf-8");
}

export function readFileAsJson(filename: string) {
  const content = readFile(filename);
  return JSON.parse(content);
}
