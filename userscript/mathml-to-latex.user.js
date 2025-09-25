// ==UserScript==
// @name         Disable MathJax Rendering
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Prevent MathJax from rendering, show raw TeX/MathML instead
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Block MathJax scripts before they load
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === "SCRIPT" && node.src && node.src.match(/mathjax/i)) {
                    console.log("Blocking MathJax script:", node.src);
                    node.remove();
                }
            });
        }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // Remove MathJax if already present
    if (window.MathJax) {
        console.log("Disabling existing MathJax");
        delete window.MathJax;
    }

    // Unhide <math> and <script type="math/tex"> if MathJax hid them
    document.querySelectorAll('script[type^="math/tex"]').forEach(el => {
        const tex = el.textContent;
        const span = document.createElement("span");
        span.textContent = tex;
        span.style.fontFamily = "monospace";
        el.replaceWith(span);
    });
})();
