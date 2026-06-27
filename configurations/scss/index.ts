import { processExports } from '../../utils/helpers.js';
import { base, parts } from './_settings.js';

export default {
	extends: ['./css.js'],
	...processExports({ parts, base }),
};
