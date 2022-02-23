const propertiesOrder = require('../../../shared/properties-order.js');
const rulesOrder = require('../../../shared/rules-order.js');
const { WARN } = require('../../../utils/constants.js');

module.exports = {
	plugins: ['stylelint-order'],
	rules: {
		'+order/properties-order': [propertiesOrder, { severity: WARN }],
		'+order/order': [rulesOrder, { severity: WARN }],
	},
};
