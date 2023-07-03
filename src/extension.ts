// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";
import { readConfig } from "./config";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "stringcopilot" is now active!');

  const workspacePath: any =
    vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath;
  console.log("111", workspacePath);

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

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "stringcopilot.showCmds",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      // vscode.window.showInformationMessage(
      //   "Hello World from StringCopilot! Ken"
      // );
      const filename = path.join(workspacePath, configJson?.[0]?.jsModule);
      console.log(filename);
      const func = (await import(filename)).default;
      console.log(func.toString());

      const editor = vscode.window.activeTextEditor;
      func({ vscode, editor });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
