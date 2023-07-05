export function initCommand({ vscode, context }: any) {
  let disposable = vscode.commands.registerCommand(
    "stringcopilot.showCmds",
    async () => {
      vscode.window
        .showQuickPick(["Item 1", "Item 2", "Item 3"], {
          placeHolder: "Select an item",
        })
        .then((selectedItems: any) => {
          if (selectedItems) {
            console.log("Selected items:", selectedItems);
          }
        });
      // const filename = path.join(workspacePath, configJson?.[0]?.jsModule);
      // const func = (await import(filename)).default;

      // const editor = vscode.window.activeTextEditor;
      // func({ vscode, editor });
    }
  );

  context.subscriptions.push(disposable);
}
