import { jsonConfigLabels, jsonConfigMap } from "../config";

export function initCommand({ vscode, context }: any) {
  let disposable = vscode.commands.registerCommand(
    "stringcopilot.showCmds",
    async () => {
      vscode.window
        .showQuickPick(jsonConfigLabels, {
          placeHolder: "Select a script",
        })
        .then((selectedLabel: string) => {
          jsonConfigMap[selectedLabel]?.script?.({ vscode });
        });
    }
  );

  context.subscriptions.push(disposable);
}
