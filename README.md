# MathML → LaTeX Userscript

A Tampermonkey/Greasemonkey userscript that converts MathML equations on webpages into LaTeX, making them easy to **view and copy inline**.

## ✨ Features
- Detects `<math>` (MathML) elements on any page.
- Uses [MathJax v3](https://www.mathjax.org/) to convert MathML → LaTeX.
- Shows LaTeX inline next to formulas.
- Click LaTeX text to copy to clipboard.

## 📦 Installation
1. Install [Tampermonkey](https://www.tampermonkey.net/) or another userscript manager.
2. Click to install the script:
https://raw.githubusercontent.com/YOUR_USERNAME/mathml-to-latex/main/userscript/mathml-to-latex.user.js

csharp
Copy code

## 🖼 Example
MathML on a webpage will show as:

∫ f(x) dx → \int f(x) , dx

shell
Copy code

Click the LaTeX to copy!

## 📜 License
MIT
