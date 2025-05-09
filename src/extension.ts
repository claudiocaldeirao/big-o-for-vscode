import * as vscode from "vscode";
import path from "path";
import { ComplexityCodeLensProvider } from "./javascript";

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

      // Verifica se o arquivo é JavaScript ou TypeScript
      if (fileExtension !== ".js" && fileExtension !== ".ts") {
        vscode.window.showWarningMessage(
          "This command only works on .js or .ts files."
        );
        return;
      }

      context.subscriptions.push(
        vscode.languages.registerCodeLensProvider(
          [
            { scheme: "file", language: "javascript" },
            { scheme: "file", language: "typescript" },
          ],
          new ComplexityCodeLensProvider()
        )
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
