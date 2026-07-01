import postcssScss from 'postcss-scss';
import { processExports } from '#utils';
import {
	morevSass,
	pluginScss,
	pluginUseNesting,
} from './plugins';

export default processExports(
	{
		extends: ['@morev/stylelint-config/css'],
		customSyntax: postcssScss,
		rules: {
			'declaration-property-value-no-unknown': null,
			'media-query-no-invalid': null,
			'no-descending-specificity': null,
			'no-invalid-position-at-import-rule': null,
			'selector-no-invalid': null,
		},
	},
	morevSass,
	pluginScss,
	pluginUseNesting,
);
