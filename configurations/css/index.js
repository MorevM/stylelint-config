const { processExports } = require('../../utils/helpers.js');
const { parts } = require('./_settings.js');

module.exports = (autofixable) => processExports({ autofixable, parts });
