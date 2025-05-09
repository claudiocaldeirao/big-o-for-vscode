import * as vscode from "vscode";

const FUNCTION_DECLARATION_REGEX = /function\s+\w+\s*\(.*\)\s*{/;
const ARROW_FUNCTION_REGEX = /const\s+\w+\s*=\s*\(.*\)\s*=>\s*{/;
const CLASS_METHOD_REGEX = /^\s*\w+\s*\(.*\)\s*{/;
const LOOP_REGEX = /\b(for|while|forEach|map|filter|reduce)\b/;

export function computeCodeComplexity(document: vscode.TextDocument) {
  const edit = new vscode.WorkspaceEdit();
  const text = document.getText();
  const lines = text.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (
      FUNCTION_DECLARATION_REGEX.test(line) ||
      ARROW_FUNCTION_REGEX.test(line) ||
      CLASS_METHOD_REGEX.test(line)
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
  const loopMatches = lines.filter((line) => LOOP_REGEX.test(line)).length;

  if (loopMatches >= 2) {
    return "O(n^2)";
  }
  if (loopMatches === 1) {
    return "O(n)";
  }
  return "O(1)";
}
