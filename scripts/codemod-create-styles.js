/**
 * One-off codemod: `createStyles` was removed from Material UI v5. It used to
 * be a type helper that returned its argument unchanged, so the call is
 * unwrapped into a plain object literal (wrapped in parentheses so that it
 * stays an expression when used as an arrow function body).
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(js|jsx)$/.test(entry.name) ? [full] : [];
  });

const findMatching = (source, openIndex) => {
  let depth = 0;
  for (let i = openIndex; i < source.length; i += 1) {
    const char = source[i];
    if (char === '(') depth += 1;
    else if (char === ')') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
};

let touched = 0;

walk(SRC).forEach(file => {
  const original = fs.readFileSync(file, 'utf8');
  let source = original;
  let index = source.indexOf('createStyles(');

  while (index !== -1) {
    const openIndex = source.indexOf('(', index);
    const closeIndex = findMatching(source, openIndex);

    if (closeIndex === -1) break;

    const argument = source.slice(openIndex + 1, closeIndex);
    source = `${source.slice(0, index)}(${argument})${source.slice(closeIndex + 1)}`;
    index = source.indexOf('createStyles(');
  }

  if (source !== original) {
    fs.writeFileSync(file, source);
    touched += 1;
  }
});

console.log(`rewrote ${touched} files`);
