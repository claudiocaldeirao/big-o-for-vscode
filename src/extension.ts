import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "big-o-for-vscode.analyzeComplexity",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const document = editor.document;
      const text = document.getText();
      const lines = text.split("\n");

      const edit = new vscode.WorkspaceEdit();

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (
          /function\s+\w+\s*\(.*\)\s*{/.test(line) ||
          /const\s+\w+\s*=\s*\(.*\)\s*=>\s*{/.test(line)
        ) {
          const body = collectFunctionBody(lines, i);
          const complexity = estimateComplexity(body);
          const position = new vscode.Position(i, 0);
          edit.insert(document.uri, position, `// Complexity: ${complexity}\n`);
          i += body.length;
        }
      }

      vscode.workspace.applyEdit(edit);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

function collectFunctionBody(lines: string[], startIndex: number): string[] {
  let body: string[] = [];
  let braceCount = 0;
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    braceCount += (line.match(/{/g) || []).length;
    braceCount -= (line.match(/}/g) || []).length;
    body.push(line);
    if (braceCount === 0) {
      break;
    }
  }
  return body;
}

function estimateComplexity(lines: string[]): string {
  const loopMatches = lines.filter((line) =>
    /\b(for|while|forEach|map|filter|reduce)\b/.test(line)
  ).length;

  if (loopMatches >= 2) {
    return "O(n^2)";
  }
  if (loopMatches === 1) {
    return "O(n)";
  }
  return "O(1)";
}
