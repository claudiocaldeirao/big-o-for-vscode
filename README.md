# Big O for VSCode

**Big O for VSCode** is a Visual Studio Code extension that analyzes JavaScript and TypeScript files and adds an estimated Big O time complexity comment above each function. This helps developers quickly assess the computational cost of their functions during development.

### ✨ Features

- Detects and analyzes function definitions (`function`, arrow functions).
- Estimates time complexity using a basic heuristic:
  - `O(1)` – No loops detected
  - `O(n)` – One loop or loop-like expression
  - `O(n^2)` – Nested or multiple loops detected
- Inserts a comment like `// Complexity: O(n)` above the function.

> ⚠️ Note: This extension uses a simple static analysis technique and does **not** perform full control-flow or data-flow analysis. Use results as rough estimates only.

### 🎥 Demo

Before:

```ts
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}
```

After running Analyze Function Complexity:

```
// Complexity: O(n)
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}
```

### 🚀 Usage

- Open a JavaScript or TypeScript file.
- Open the Command Palette (**Ctrl+Shift+P** or **Cmd+Shift+P** on macOS).
- Run Analyze Function Complexity.

The extension will analyze the open file and insert a complexity comment above each function.

### 🔮 Next Steps

Planned enhancements for future versions include:

- **Multi-language support**:

  - ✅ JavaScript / TypeScript (current)

  - 🟡 Python: Detect def functions and analyze for, while, map, list comprehensions, etc.

  - 🟡 Go: Parse func declarations and loops (for, range).

- Improved complexity estimation with:

  - Support for recursive functions.

  - Include other bigO common notations:

    - ✅ O(1) (Constant time)
    - 🟡 O(log n) (Logarithmic time)
    - ✅ O(n) (Linear time)
    - 🟡 O(n log n)
    - ✅ O(n^2) (Quadratic time)
    - 🟡 O(2^n) (Exponential time)

  - Configurable detection rules via settings.

### 🔗 Useful links

- How to [create a vscode extension](https://code-visualstudio-com.translate.goog/api/get-started/your-first-extension?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc)
- how to [publish a vscode extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce)

### 📄 License

This project is open-source and available under the [MIT License](LICENSE).
