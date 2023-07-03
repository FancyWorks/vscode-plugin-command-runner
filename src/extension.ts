import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";
import { readConfig } from "./config";

export function activate(context: vscode.ExtensionContext) {
  const workspacePath: any =
    vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath;

  let configJson: any;

  if (workspacePath) {
    // 读取 test.json 文件的内容
    const filePath = path.join(workspacePath, "string-copilot.json");
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      // 将文件内容转换为 JSON 对象
      configJson = JSON.parse(fileContent);
      console.log("test.json data:", configJson?.[0]?.jsModule);
    } catch (error) {
      console.error(error);
    }
  }

  let disposable = vscode.commands.registerCommand(
    "stringcopilot.showCmds",
    async () => {
      const filename = path.join(workspacePath, configJson?.[0]?.jsModule);
      const func = (await import(filename)).default;

      const editor = vscode.window.activeTextEditor;
      func({ vscode, editor });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
