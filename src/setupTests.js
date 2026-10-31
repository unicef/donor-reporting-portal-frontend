const { TextDecoder, TextEncoder } = require('util');

// jsdom does not expose the TextEncoder/TextDecoder globals that
// react-router v7 relies on.
global.TextEncoder = global.TextEncoder || TextEncoder;
global.TextDecoder = global.TextDecoder || TextDecoder;
