const { processExports } = require('../../utils/helpers.js');
const { parts, base } = require('./_settings.js');

module.exports = (autofixable) => processExports({ autofixable, parts, base });
