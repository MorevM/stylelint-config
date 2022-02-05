const { resolve, sep } = require('path');
const _mergeWith = require('lodash.mergewith');
const { mergeWithArrayComparer } = require('./helpers');

const CONFIGS_PATH = resolve(__dirname, '..', 'configurations');

const CONFIGURATION_DEFAULTS = { autofixable: 'warn' };

const makeConfig = (_configs) => {
	const configs = _configs.map(c => ({
		...CONFIGURATION_DEFAULTS,
		...c,
		name: c?.name.includes('/') ? c.name : `${c.name}${sep}index`,
	}));

	let result = {};

	configs.forEach(({ name, autofixable, overrides, extend }) => {
		const configFactory = require(resolve(CONFIGS_PATH, name));
		let processed = configFactory(autofixable);

		if (extend) {
			processed = {
				extends: [extend],
				...processed,
			};
		}

		result = _mergeWith(result, processed, mergeWithArrayComparer);
	});

	return result;
};

module.exports = { makeConfig };
