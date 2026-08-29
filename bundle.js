const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/grani/OneDrive/Desktop/Swasthya-setu/frontend';
let html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

// Inline CSS files
const cssFiles = ['auth.css', 'admin.css', 'doctor.css', 'patient.css', 'worker.css'];
let inlinedCss = '';
for (const f of cssFiles) {
  const cssPath = path.join(baseDir, f);
  if (fs.existsSync(cssPath)) {
    inlinedCss += '\n/* --- ' + f + ' --- */\n' + fs.readFileSync(cssPath, 'utf8');
    html = html.replace('<link rel="stylesheet" href="' + f + '">', '');
  }
}
html = html.replace('</head>', '<style>\n' + inlinedCss + '\n</style>\n</head>');

// Inline JS files
const jsFiles = ['store.js', 'i18n.js', 'patient.js', 'doctor.js', 'worker.js', 'admin.js'];
let inlinedJs = '';
for (const f of jsFiles) {
  const jsPath = path.join(baseDir, f);
  if (fs.existsSync(jsPath)) {
    inlinedJs += '\n/* ==================== ' + f + ' ==================== */\n' + fs.readFileSync(jsPath, 'utf8') + '\n';
    html = html.replace('<script src="' + f + '"></script>', '');
  }
}

// Replace the script loader comment or place directly before the inline controller script
html = html.replace('<!-- APP SCRIPTS -->', '<script>\n' + inlinedJs + '\n</script>');

const outPath = 'C:/Users/grani/OneDrive/Desktop/Swasthya-setu/swasthya-setu-standalone.html';
fs.writeFileSync(outPath, html, 'utf8');

const rootIndex = 'C:/Users/grani/OneDrive/Desktop/Swasthya-setu/index.html';
fs.writeFileSync(rootIndex, html, 'utf8');

console.log('✓ Successfully created 100% standalone single HTML file at:', outPath);
console.log('✓ Successfully synced root index.html for GitHub Pages / Cloud Hosting');
console.log('File size:', (html.length / 1024).toFixed(1), 'KB');
