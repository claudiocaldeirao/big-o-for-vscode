import * as vscode from "vscode";

const FUNCTION_DECLARATION_REGEX =
  /function\s+\w+\s*\([^)]*\)\s*(?::\s*\w+)?\s*{/;
const ARROW_FUNCTION_REGEX =
  /const\s+\w+\s*=\s*\([^)]*\)\s*(?::\s*\w+)?\s*=>\s*{/;
const CLASS_METHOD_REGEX = /^\s*\w+\s*\([^)]*\)\s*(?::\s*\w+)?\s*{/;
const LOOP_REGEX = /\b(for|while|forEach|map|filter|reduce)\b/;
const FUNCTION_NAME_REGEXES = [
  /function\s+(\w+)\s*\(/,
  /const\s+(\w+)\s*=\s*\(.*\)\s*=>/,
  /^\s*(\w+)\s*\(.*\)\s*{/,
];

export class ComplexityCodeLensProvider implements vscode.CodeLensProvider {
  provideCodeLenses(document: vscode.TextDocument): vscode.CodeLens[] {
    const lenses: vscode.CodeLens[] = [];
    const lines = document.getText().split("\n");

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
        const range = new vscode.Range(position, position);
        const lens = new vscode.CodeLens(range, {
          title: `Complexity: ${complexity}`,
          command: "",
          arguments: [],
        });

        lenses.push(lens);
        i += body.length;
      }
    }

    return lenses;
  }
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
  const loopMatches = loopCount(lines);
  const recursiveCalls = recursiveCallCount(lines);

  if (recursiveCalls >= 2) {
    return "O(2^n)";
  }

  if (loopMatches >= 2) {
    return "O(n^2)";
  }

  if (loopMatches === 1) {
    return "O(n)";
  }

  return "O(1)";
}

function loopCount(lines: string[]): number {
  return lines.filter((line) => LOOP_REGEX.test(line)).length;
}

function recursiveCallCount(lines: string[]): number {
  const header = lines[0];
  const functionName = extractFunctionName(header);

  let recursiveCalls = 0;

  if (functionName) {
    const bodyText = lines.slice(1).join("\n");
    const regex = new RegExp(`\\b${functionName}\\s*\\(`, "g");
    const matches = bodyText.match(regex);
    recursiveCalls = matches ? matches.length : 0;
  }

  return recursiveCalls;
}

function extractFunctionName(line: string): string | null {
  for (const regex of FUNCTION_NAME_REGEXES) {
    const match = line.match(regex);
    if (match) {
      return match[1];
    }
  }
  return null;
}
