import * as vscode from "vscode";
import { computeCodeComplexity } from "./javascript/index";
import path from "path";

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

      computeCodeComplexity(document);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
