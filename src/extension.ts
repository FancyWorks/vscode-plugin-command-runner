import * as vscode from "vscode";
import { initWorkspacePath } from "./config/GlobalConfig";
import { startWatchJsonConfig, stopWatchJsonConfig } from "./config";
import { initCommand } from "./command";

export function activate(context: vscode.ExtensionContext) {
  initWorkspacePath({ vscode });

  startWatchJsonConfig();

  initCommand({ context, vscode });
}

// This method is called when your extension is deactivated
export function deactivate() {
  stopWatchJsonConfig();
}
