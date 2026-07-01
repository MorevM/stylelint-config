declare module 'stylelint-find-new-rules' {
	type RuleDeclaration = {
		name: string;
		url?: string;
	};

	type StylelintFindNewRulesResult = {
		deprecated: RuleDeclaration[];
		invalid: RuleDeclaration[];
		unused: RuleDeclaration[];
	};

	const stylelintFindNewRules: (configFile: string) => Promise<StylelintFindNewRulesResult>;

	export default stylelintFindNewRules;
}
