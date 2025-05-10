import * as vscode from "vscode";
import path from "path";
import { ComplexityCodeLensProvider } from "./javascript";

let codeLensProviderDisposable: vscode.Disposable | undefined;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "big-o-for-vscode.analyzeComplexity",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      const document = editor.document;
      const fileExtension = path.extname(document.fileName);

      if (fileExtension !== ".js" && fileExtension !== ".ts") {
        vscode.window.showWarningMessage(
          "This command only works on .js or .ts files."
        );
        return;
      }

      codeLensProviderDisposable = vscode.languages.registerCodeLensProvider(
        [
          { scheme: "file", language: "javascript" },
          { scheme: "file", language: "typescript" },
        ],
        new ComplexityCodeLensProvider()
      );

      context.subscriptions.push(codeLensProviderDisposable);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {
  if (codeLensProviderDisposable) {
    codeLensProviderDisposable.dispose();
    codeLensProviderDisposable = undefined;
  }
}
