interface GlobalConfig {
  workspacePath: string;
}

export let globalConfig: GlobalConfig = {
  workspacePath: "",
};

export function setGlobalConfig(config: GlobalConfig) {
  globalConfig.workspacePath = config.workspacePath;
}

export function initWorkspacePath({ vscode }: any) {
  const workspacePath: any =
    vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath;

  if (workspacePath) {
    setGlobalConfig({ workspacePath });
  }
}
