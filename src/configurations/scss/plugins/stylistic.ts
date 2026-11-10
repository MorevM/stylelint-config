import stylisticPlugin from '@stylistic/stylelint-plugin';
import cssStylistic from '~configurations/css/plugins/stylistic';

const rules: Record<string, unknown> = {};

for (const [name, value] of Object.entries(cssStylistic.rules)) {
	rules[name] = null;
	rules[name.replace('@stylistic/', '@stylistic/scss/')] = value;
}

export default {
	plugins: stylisticPlugin.filter((plugin) =>
		'ruleName' in plugin && plugin.ruleName.startsWith('@stylistic/scss/')),
	rules,
} as const;
