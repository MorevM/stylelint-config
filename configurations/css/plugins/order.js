const propertiesOrder = require('../../../shared/properties-order');
const rulesOrder = require('../../../shared/rules-order');
const { WARN } = require('../../../utils/constants');

module.exports = {
	plugins: ['stylelint-order'],
	rules: {
		'+order/properties-order': [propertiesOrder, { severity: WARN }],
		'+order/order': [rulesOrder, { severity: WARN }],
	},
};
