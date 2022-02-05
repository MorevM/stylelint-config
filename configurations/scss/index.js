const { processExports } = require('../../utils/helpers');
const { parts, base } = require('./_settings');

module.exports = (autofixable) => processExports({ autofixable, parts, base });
