const { processExports } = require('../../utils/helpers');
const { parts } = require('./_settings');

module.exports = (autofixable) => processExports({ autofixable, parts });
