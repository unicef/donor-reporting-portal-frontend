/**
 * One-off codemod: migrate Material UI v4 imports to Material UI v9.
 *
 * - `@material-ui/core*`        -> `@mui/material*`
 * - `@material-ui/icons*`       -> `@mui/icons-material*`
 * - `@material-ui/lab`          -> `@mui/material` (Autocomplete moved in v5)
 * - `@material-ui/styles`       -> `@mui/material/styles`
 * - `makeStyles` / `createStyles` are re-pointed at the local Emotion powered
 *   replacement in `src/styles/makeStyles.js`
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const LOCAL_MAKE_STYLES = "import { makeStyles } from 'styles/makeStyles';";

const MODULE_REWRITES = [
  ["'@material-ui/core/colors/", "'@mui/material/colors/"],
  ["'@material-ui/core/colors'", "'@mui/material/colors'"],
  ["'@material-ui/core/styles'", "'@mui/material/styles'"],
  ["'@material-ui/core/", "'@mui/material/"],
  ["'@material-ui/core'", "'@mui/material'"],
  ["'@material-ui/icons/", "'@mui/icons-material/"],
  ["'@material-ui/icons'", "'@mui/icons-material'"],
  ["'@material-ui/lab'", "'@mui/material'"],
  ["'@material-ui/styles'", "'@mui/material/styles'"]
];

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(js|jsx)$/.test(entry.name) ? [full] : [];
  });

let touched = 0;

walk(SRC).forEach(file => {
  const original = fs.readFileSync(file, 'utf8');
  let source = original;

  MODULE_REWRITES.forEach(([from, to]) => {
    source = source.split(from).join(to);
  });

  // `makeStyles` / `createStyles` no longer exist in the Material UI barrels.
  // Extract them and point `makeStyles` at the local Emotion based replacement.
  const barrel = /import\s*\{([^}]*)\}\s*from\s*('(@mui\/material(?:\/styles)?)');\n?/g;
  source = source.replace(barrel, (match, names, moduleName) => {
    const list = names
      .split(',')
      .map(name => name.trim())
      .filter(Boolean);
    const usesMakeStyles = list.includes('makeStyles');
    const kept = list.filter(name => name !== 'makeStyles' && name !== 'createStyles');

    if (!usesMakeStyles) {
      if (!list.includes('createStyles')) return match;
      return kept.length ? `import { ${kept.join(', ')} } from ${moduleName};\n` : '';
    }

    const replacement = kept.length ? `import { ${kept.join(', ')} } from ${moduleName};\n` : '';
    return `${LOCAL_MAKE_STYLES}\n${replacement}`;
  });

  if (source !== original) {
    fs.writeFileSync(file, source);
    touched += 1;
  }
});

console.log(`rewrote ${touched} files`);
