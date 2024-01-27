import propertiesOrder from '../../../shared/properties-order.js';
import rulesOrder from '../../../shared/rules-order.js';
import { WARNING } from '../../../utils/constants.js';

export default {
	plugins: ['stylelint-order'],
	rules: {
		'+order/properties-alphabetical-order': null,
		'+order/properties-order': [propertiesOrder, { severity: WARNING }],
		'+order/order': [rulesOrder, { severity: WARNING }],
	},
};
