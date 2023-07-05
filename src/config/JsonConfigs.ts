import { isFileExist, pathJoin, readFileAsJson, watch } from "../utils";
import { globalConfig } from "./GlobalConfig";

interface JsonConfig {
  label: string;
  jsModule: string;
}

let watcher: any;

// string-copilot.json
export let jsonConfigs: JsonConfig[] = [];

export async function readJsonConfig(filename: string) {
  if (await isFileExist(filename)) {
    jsonConfigs = readFileAsJson(filename);
  }
}

export function startWatchJsonConfig() {
  const jsonConfigFilename = pathJoin("string-copilot.json");
  watcher = watch(jsonConfigFilename, readJsonConfig);
}

export async function stopWatchJsonConfig() {
  await watcher?.close();
}
