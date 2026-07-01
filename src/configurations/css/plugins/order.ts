import { WARNING } from '#constants';
import { PROPERTIES_ORDER, RULES_ORDER } from '#shared';

export default {
	plugins: ['stylelint-order'],
	rules: {
		'order/custom-properties-alphabetical-order': [null, { severity: WARNING }],
		'order/properties-alphabetical-order': [null, { severity: WARNING }],
		'order/properties-order': [PROPERTIES_ORDER, { severity: WARNING }],
		'order/order': [RULES_ORDER, { severity: WARNING }],
	},
};
