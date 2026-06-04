const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const standaloneRoot = path.join(appRoot, '.next', 'standalone');
const staticSource = path.join(appRoot, '.next', 'static');
const publicSource = path.join(appRoot, 'public');

const candidates = [
  path.join(standaloneRoot, 'apps', 'web'),
  standaloneRoot,
];

const standaloneAppRoot = candidates.find((candidate) =>
  fs.existsSync(path.join(candidate, 'server.js')),
);

if (!standaloneAppRoot) {
  throw new Error('Standalone server.js was not found. Run next build first.');
}

function copyDirectory(source, destination) {
  if (!fs.existsSync(source)) {
    return;
  }

  fs.rmSync(destination, {recursive: true, force: true});
  fs.mkdirSync(destination, {recursive: true});
  fs.cpSync(source, destination, {recursive: true});
}

copyDirectory(staticSource, path.join(standaloneAppRoot, '.next', 'static'));
copyDirectory(publicSource, path.join(standaloneAppRoot, 'public'));

console.log(`cPanel standalone app prepared at: ${standaloneAppRoot}`);
