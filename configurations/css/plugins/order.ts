import propertiesOrder from '~shared/properties-order';
import rulesOrder from '~shared/rules-order';
import { WARNING } from '~utils/constants';

export default {
	plugins: ['stylelint-order'],
	rules: {
		'order/custom-properties-alphabetical-order': [null, { severity: WARNING }],
		'order/properties-alphabetical-order': [null, { severity: WARNING }],
		'order/properties-order': [propertiesOrder, { severity: WARNING }],
		'order/order': [rulesOrder, { severity: WARNING }],
	},
};
