/**
 * One-off codemod: migrate the Material UI v4 Grid to the v7+ Grid.
 *
 * - `item` is removed: every Grid is an item unless it is a `container`.
 * - The breakpoint props (`xs`, `sm`, `md`, `lg`, `xl`) are replaced by the
 *   single `size` prop.
 * - The legacy alignment props (`justify`, `align`, `alignItems`,
 *   `alignContent`) are no longer supported and move to `sx`.
 * - `zeroMinWidth` is gone: the new Grid always uses `min-width: 0`.
 * - `direction="column"` is not supported by the new Grid, the flex direction
 *   is set through `sx` instead.
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl'];

const JUSTIFY_VALUES = {
  center: 'center',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
  'flex-start': 'flex-start',
  'flex-end': 'flex-end'
};

const ALIGN_VALUES = {
  center: 'center',
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  baseline: 'baseline',
  stretch: 'stretch',
  inherit: 'inherit',
  'initial': 'initial'
};

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(js|jsx)$/.test(entry.name) ? [full] : [];
  });

/** Splits the attribute section of a JSX element into single attributes. */
const splitAttributes = source => {
  const attributes = [];
  let depth = 0;
  let current = '';
  let quote = null;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];

    if (quote) {
      current += char;
      if (char === quote && source[i - 1] !== '\\') quote = null;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      current += char;
      continue;
    }

    if ('{([<'.includes(char)) depth += 1;
    if ('})]>'.includes(char)) depth -= 1;

    if (char === ' ' && depth === 0) {
      if (current.trim()) attributes.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  if (current.trim()) attributes.push(current.trim());
  return attributes;
};

const readAttributeValue = attribute => {
  const match = attribute.match(/^([\w-]+)(?:\s*=\s*)?([\s\S]*)$/);
  if (!match) return null;
  const [, name, rawValue = ''] = match;
  return { name, value: rawValue.trim() };
};

const migrateGrid = source =>
  source.replace(/<Grid(\s[\s\S]*?)?(\/?>)/g, (match, attributes = '', closing) => {
    if (!attributes.trim()) return match;

    const parsed = splitAttributes(attributes).map(readAttributeValue).filter(Boolean);
    if (!parsed.length) return match;

    const kept = [];
    const size = {};
    const sx = {};
    let changed = false;

    parsed.forEach(({ name, value }) => {
      if (name === 'item' || name === 'zeroMinWidth') {
        changed = true;
        return;
      }

      if (BREAKPOINTS.includes(name)) {
        size[name] = value;
        changed = true;
        return;
      }

      if (name === 'justify') {
        const unquoted = value.replace(/^['"]|['"]$/g, '');
        sx.justifyContent = JUSTIFY_VALUES[unquoted] || unquoted;
        changed = true;
        return;
      }

      if (name === 'align' || name === 'alignItems') {
        const unquoted = value.replace(/^['"]|['"]$/g, '');
        sx.alignItems = ALIGN_VALUES[unquoted] || unquoted;
        changed = true;
        return;
      }

      if (name === 'alignContent') {
        const unquoted = value.replace(/^['"]|['"]$/g, '');
        sx.alignContent = unquoted;
        changed = true;
        return;
      }

      if (name === 'direction') {
        const unquoted = value.replace(/^['"]|['"]$/g, '');
        if (unquoted === 'column' || unquoted === 'column-reverse') {
          sx.flexDirection = unquoted;
          sx.flexWrap = 'nowrap';
          changed = true;
          return;
        }
        kept.push({ name, value });
        return;
      }

      kept.push({ name, value });
    });

    if (!changed) return match;

    if (Object.keys(size).length) {
      const entries = Object.entries(size).map(([key, val]) => {
        const unwrapped = val.replace(/^\{/, '').replace(/\}$/, '').trim();
        return `${key}: ${unwrapped}`;
      });
      kept.push({ name: 'size', value: `{{ ${entries.join(', ')} }}` });
    }

    if (Object.keys(sx).length) {
      const entries = Object.entries(sx).map(([key, val]) => `${key}: '${val}'`);
      kept.push({ name: 'sx', value: `{{ ${entries.join(', ')} }}` });
    }

    const rendered = kept
      .map(({ name, value }) => (value ? `${name}=${value}` : name))
      .join(' ');

    return `<Grid ${rendered}${closing}`;
  });

let touched = 0;

walk(SRC).forEach(file => {
  const original = fs.readFileSync(file, 'utf8');
  const source = migrateGrid(original);

  if (source !== original) {
    fs.writeFileSync(file, source);
    touched += 1;
  }
});

console.log(`rewrote ${touched} files`);
