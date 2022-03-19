const { processExports } = require('../../utils/helpers.js');
const { parts } = require('./_settings.js');

module.exports = (mode) => processExports({ mode, parts });
