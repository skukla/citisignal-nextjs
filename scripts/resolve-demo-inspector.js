/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Demo Inspector Resolution Script
 *
 * Generates tsconfig.json from tsconfig.base.json with the correct
 * @/demo-inspector path based on whether the universal inspector
 * submodule is initialized.
 *
 * - If src/demo-inspector-universal/dist/demo-inspector.js exists → use adapter
 * - Otherwise → use stub module (no-op)
 *
 * When the adapter is active, it also copies the inspector's built JS
 * to public/demo-inspector/ so Next.js can serve it as a static asset.
 *
 * Runs automatically via npm hooks: postinstall, predev, prebuild
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const baseConfigPath = path.join(rootDir, 'tsconfig.base.json');
const outputConfigPath = path.join(rootDir, 'tsconfig.json');

// Check for the universal inspector submodule
const universalDistPath = path.join(rootDir, 'src/demo-inspector-universal/dist/demo-inspector.js');
const hasUniversalModule = fs.existsSync(universalDistPath);

// Point @/demo-inspector to adapter (real) or stub (fallback)
const modulePath = hasUniversalModule
  ? './src/demo-inspector-adapter'
  : './src/demo-inspector-stub';

// Read base config
const baseConfig = JSON.parse(fs.readFileSync(baseConfigPath, 'utf8'));

// Inject the correct @/demo-inspector paths
baseConfig.compilerOptions.paths = {
  '@/demo-inspector': [modulePath],
  '@/demo-inspector/*': [`${modulePath}/*`],
  '@/*': ['./src/*'],
};

// Write generated config
fs.writeFileSync(outputConfigPath, JSON.stringify(baseConfig, null, 2) + '\n');

// Copy inspector JS to public/ for static serving
if (hasUniversalModule) {
  const publicDir = path.join(rootDir, 'public/demo-inspector');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.copyFileSync(universalDistPath, path.join(publicDir, 'demo-inspector.js'));
}

// Log result
const icon = hasUniversalModule ? '\u2705' : '\u{1F4E6}';
const moduleType = hasUniversalModule ? 'universal module (adapter)' : 'stub module';

console.log(`${icon} Demo Inspector: Using ${moduleType}`);
