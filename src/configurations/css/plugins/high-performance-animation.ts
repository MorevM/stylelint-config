import { WARNING } from '#constants';

export default {
	plugins: ['stylelint-high-performance-animation'],
	rules: {
		'plugin/no-low-performance-animation-properties': [true, {
			ignore: 'paint-properties',
			ignoreProperties: ['text-shadow'],
			severity: WARNING,
		}],
	},
};
