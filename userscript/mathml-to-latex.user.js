// ==UserScript==
// @name         MathML → LaTeX Copy Helper
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Convert MathML to LaTeX inline for easy copying
// @author       You
// @match        *://*/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
// ==/UserScript==

(function () {
    'use strict';

    // Wait until MathJax is ready
    window.addEventListener("load", () => {
        // Observe the page for MathML insertion
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        processMathML(node);
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Process existing MathML on the page
        document.querySelectorAll("math").forEach(processMathML);

        async function processMathML(mathNode) {
            if (mathNode.getAttribute("data-latex-done")) return; // avoid duplicates

            try {
                const tex = await MathJax.texConvert(mathNode.outerHTML, {
                    display: false
                });
                // Create inline copy box
                const latexSpan = document.createElement("span");
                latexSpan.textContent = tex.math;
                latexSpan.style.background = "#eef";
                latexSpan.style.padding = "2px 4px";
                latexSpan.style.marginLeft = "5px";
                latexSpan.style.cursor = "copy";
                latexSpan.style.fontFamily = "monospace";
                latexSpan.title = "Click to copy LaTeX";

                // Copy on click
                latexSpan.addEventListener("click", () => {
                    navigator.clipboard.writeText(tex.math);
                    latexSpan.style.background = "#cfc"; // green feedback
                    setTimeout(() => latexSpan.style.background = "#eef", 800);
                });

                mathNode.setAttribute("data-latex-done", "true");
                mathNode.after(latexSpan);

            } catch (e) {
                console.error("MathML → LaTeX conversion failed:", e);
            }
        }
    });
})();
