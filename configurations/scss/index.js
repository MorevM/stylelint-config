const { processExports } = require('../../utils/helpers.js');
const { parts, base } = require('./_settings.js');

module.exports = (mode) => processExports({ mode, parts, base });
