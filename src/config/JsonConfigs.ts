import { isFileExist, pathJoin, readFileAsJson, watch } from "../utils";

interface JsonConfig {
  label: string;
  jsModule: string;
}

let jsonConfigWatcher: any;

// string-copilot.json
export let jsonConfigs: JsonConfig[] = [];
export let jsonConfigLabels: string[] = [];
export let jsonConfigMap: Record<string, JsonConfig> = {};

export async function readJsonConfig(filename: string) {
  if (await isFileExist(filename)) {
    jsonConfigs = readFileAsJson(filename);
    jsonConfigLabels = jsonConfigs.map((o) => o.label);
    jsonConfigMap = {};
    jsonConfigs.forEach((config) => {
      jsonConfigMap[config.label] = config;
    });
  } else {
    jsonConfigs.length = 0;
    jsonConfigLabels.length = 0;
    jsonConfigMap = {};
  }
}

export function startWatchJsonConfig() {
  const jsonConfigFilename = pathJoin("string-copilot.json");
  jsonConfigWatcher = watch(
    jsonConfigFilename,
    (event: string, filename: string) => {
      readJsonConfig(filename);
    }
  );
}

export async function stopWatchJsonConfig() {
  await jsonConfigWatcher?.close();
}

export function raiseLabel(label: string) {
  if (!jsonConfigLabels.includes(label)) return;

  jsonConfigLabels.splice(
    jsonConfigLabels.findIndex((s) => s === label),
    1
  );
  jsonConfigLabels.unshift(label);
}
