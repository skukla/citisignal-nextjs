/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Demo Inspector Resolution Script
 *
 * This script generates tsconfig.json from tsconfig.base.json with the correct
 * @/demo-inspector path based on whether the git submodule is initialized.
 *
 * - If src/demo-inspector/index.ts exists → use real module
 * - Otherwise → use stub module
 *
 * Runs automatically via npm hooks: postinstall, predev, prebuild
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const baseConfigPath = path.join(rootDir, 'tsconfig.base.json');
const outputConfigPath = path.join(rootDir, 'tsconfig.json');
const realModuleIndex = path.join(rootDir, 'src/demo-inspector/index.ts');

// Check if real module exists (submodule initialized)
const hasRealModule = fs.existsSync(realModuleIndex);
const modulePath = hasRealModule ? './src/demo-inspector' : './src/demo-inspector-stub';

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

// Log result
const icon = hasRealModule ? '\u2705' : '\u{1F4E6}';
const moduleType = hasRealModule ? 'real module' : 'stub module';

console.log(`${icon} Demo Inspector: Using ${moduleType}`);
