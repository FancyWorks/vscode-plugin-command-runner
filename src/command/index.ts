import { jsonConfigLabels, jsonConfigMap, raiseLabel } from "../config";
import { pathJoin, readFile } from "../utils";

export function initCommand({ vscode, context }: any) {
  let disposable = vscode.commands.registerCommand(
    "vscode-plugin-command-runner.showCmds",
    async () => {
      vscode.window
        .showQuickPick(jsonConfigLabels, {
          placeHolder: "Select a script",
        })
        .then(async (selectedLabel: string) => {
          const config = jsonConfigMap[selectedLabel];
          if (!config) {
            return;
          }
          const scriptFilename = pathJoin(config.jsModule);
          const content = readFile(scriptFilename);
          const func = eval(content);
          func?.({ vscode });

          raiseLabel(selectedLabel);
        });
    }
  );

  context.subscriptions.push(disposable);
}
