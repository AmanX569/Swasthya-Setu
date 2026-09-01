const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/grani/OneDrive/Desktop/Swasthya-setu/frontend';
const projectRoot = 'C:/Users/grani/OneDrive/Desktop/Swasthya-setu';
let html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

// Copy assets
const srcLogo = path.join(baseDir, 'assets', 'logo.png');
const rootLogo = path.join(projectRoot, 'assets', 'logo.png');
if (!fs.existsSync(path.join(projectRoot, 'assets'))) {
  fs.mkdirSync(path.join(projectRoot, 'assets'), { recursive: true });
}
if (fs.existsSync(srcLogo)) {
  fs.copyFileSync(srcLogo, rootLogo);
}

// Convert logo to Base64 for inline reliability
let logoBase64 = 'assets/logo.png';
if (fs.existsSync(srcLogo)) {
  const buf = fs.readFileSync(srcLogo);
  logoBase64 = 'data:image/png;base64,' + buf.toString('base64');
  html = html.replace(/src="assets\/logo\.png"/g, 'src="' + logoBase64 + '"');
}

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
const jsFiles = ['supabase-config.js', 'supabase-service.js', 'store.js', 'i18n.js', 'gps-tracker.js', 'video-call.js', 'patient.js', 'doctor.js', 'worker.js', 'admin.js'];
let inlinedJs = '';
for (const f of jsFiles) {
  const jsPath = path.join(baseDir, f);
  if (fs.existsSync(jsPath)) {
    let jsContent = fs.readFileSync(jsPath, 'utf8');
    if (logoBase64.startsWith('data:')) {
      jsContent = jsContent.replace(/assets\/logo\.png/g, logoBase64);
    }
    inlinedJs += '\n/* ==================== ' + f + ' ==================== */\n' + jsContent + '\n';
    html = html.replace('<script src="' + f + '"></script>', '');
  }
}

// Replace the script loader comment or place directly before the inline controller script
html = html.replace('<!-- APP SCRIPTS -->', '<script>\n' + inlinedJs + '\n</script>');

const outPath = path.join(projectRoot, 'swasthya-setu-standalone.html');
fs.writeFileSync(outPath, html, 'utf8');

const rootIndex = path.join(projectRoot, 'index.html');
fs.writeFileSync(rootIndex, html, 'utf8');

console.log('✓ Successfully created 100% standalone single HTML file with embedded official logo at:', outPath);
console.log('✓ Successfully synced root index.html for GitHub Pages / Cloud Hosting');
console.log('File size:', (html.length / 1024).toFixed(1), 'KB');
