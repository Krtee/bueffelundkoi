const fs = require("fs");
const path = require("path");

const pdfjsDistPath = path.dirname(require.resolve("pdfjs-dist/package.json"));
const pdfWorkerPath = path.join(pdfjsDistPath, "build", "pdf.worker.mjs");

fs.mkdirSync("./public/pdf", { recursive: true });
fs.copyFileSync(pdfWorkerPath, "./public/pdf/pdf.worker.mjs");

console.log("✅ PDF.js worker copied to /public/pdf/pdf.worker.mjs");
