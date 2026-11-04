import { isString } from '@morev/utils';
import ts from 'typescript';
import type { Config } from 'stylelint';
import type { RuleOrderItem } from '#shared';

type PublicApi = typeof import('#index');

type IsAny<T> = 0 extends 1 & T ? true : false;

type RuntimeConfig = {
	rules?: Record<string, unknown>;
	overrides?: unknown[];
};

let publicApi: PublicApi | undefined;

const loadPublicApi = async () => {
	publicApi = await import('../../dist/index.js') as PublicApi;
};

const getPublicApi = () => {
	if (!publicApi) {
		throw new Error('Public API was requested before the defineConfig test setup finished.');
	}

	return publicApi;
};

const getOrderRule = (config: RuntimeConfig) => config.rules?.['order/order'] as [RuleOrderItem[], { severity: string }];

const getBemOverride = (config: RuntimeConfig) => config.overrides?.[0] as NonNullable<Config['overrides']>[number];

const getAtRules = (order: RuleOrderItem[], name: string, hasBlock?: boolean) =>
	order.filter((item) =>
		!isString(item)
		&& item.type === 'at-rule'
		&& item.name === name
		&& (hasBlock === undefined || item.hasBlock === hasBlock));

const createLanguageService = (source: string, fixtureName: string) => {
	const fileName = `${process.cwd()}/__tests__/define-config-${fixtureName}.fixture.ts`;
	const files = new Map([[fileName, source]]);
	const compilerOptions: ts.CompilerOptions = {
		allowSyntheticDefaultImports: true,
		module: ts.ModuleKind.ESNext,
		moduleResolution: ts.ModuleResolutionKind.Bundler,
		strict: true,
		target: ts.ScriptTarget.ES2022,
	};
	const host: ts.LanguageServiceHost = {
		fileExists: (path) => files.has(path) || ts.sys.fileExists(path),
		getCompilationSettings: () => compilerOptions,
		getCurrentDirectory: () => process.cwd(),
		getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options),
		getScriptFileNames: () => [fileName],
		getScriptSnapshot: (path) => {
			const content = files.get(path) ?? ts.sys.readFile(path);
			return content === undefined ? undefined : ts.ScriptSnapshot.fromString(content);
		},
		getScriptVersion: () => '0',
		readDirectory: ts.sys.readDirectory,
		readFile: (path) => files.get(path) ?? ts.sys.readFile(path),
	};

	return {
		fileName,
		service: ts.createLanguageService(host),
	};
};

const getQuickInfo = (source: string, marker: string) => {
	const { fileName, service } = createLanguageService(source, 'quick-info');
	const info = service.getQuickInfoAtPosition(fileName, source.indexOf(marker) + 1);

	return {
		documentation: ts.displayPartsToString(info?.documentation ?? []),
		display: ts.displayPartsToString(info?.displayParts ?? []),
		tags: info?.tags ?? [],
	};
};

const getCompletions = (source: string, marker: string) => {
	const { fileName, service } = createLanguageService(source, 'completions');
	const completions = service.getCompletionsAtPosition(
		fileName,
		source.indexOf(marker) + marker.length,
		{},
	);

	return completions?.entries.map((entry) => entry.name) ?? [];
};

const getSemanticDiagnosticMessages = (source: string) => {
	const { fileName, service } = createLanguageService(source, 'semantic-diagnostics');

	return service.getSemanticDiagnostics(fileName)
		.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
};

const getQuickInfoTagText = (info: ReturnType<typeof getQuickInfo>, tagName: string) =>
	info.tags.find((tag) => tag.name === tagName)?.text?.map((part) => part.text).join('') ?? '';

export {
	getAtRules,
	getBemOverride,
	getCompletions,
	getOrderRule,
	getPublicApi,
	getQuickInfo,
	getQuickInfoTagText,
	getSemanticDiagnosticMessages,
	loadPublicApi,
};

export type {
	IsAny,
};
