import {
	BEM_CUSTOM_PROPERTY,
	ERROR,
	KEBAB_CASE,
	KEBAB_CASE_ALLOW_DOT,
	KEBAB_CASE_ALLOW_DOUBLE,
	KEBAB_CASE_ALLOW_FIRST_UNDERSCORE,
	WARNING,
} from '#constants';

describe('constants', () => {
	describe('Severity constants', () => {
		it('Expose Stylelint severity values', () => {
			expect(WARNING).toBe('warning');
			expect(ERROR).toBe('error');
		});
	});

	describe('KEBAB_CASE', () => {
		it('Allows only lowercase kebab-case names', () => {
			const validNames = [
				'component',
				'component-name',
				'component-name-2',
			];

			const invalidNames = [
				'Component',
				'component_name',
				'component--name',
				'component.',
			];

			expect(validNames.every((name) => KEBAB_CASE.test(name))).toBe(true);
			expect(invalidNames.some((name) => KEBAB_CASE.test(name))).toBe(false);
		});
	});

	describe('KEBAB_CASE_ALLOW_DOT', () => {
		it('Allows lowercase kebab-case names with dot-separated parts', () => {
			const validNames = [
				'component',
				'component-name',
				'component.name',
				'component-name.size-large',
			];

			const invalidNames = [
				'Component.name',
				'component_name',
				'component..name',
				'component.',
			];

			expect(validNames.every((name) => KEBAB_CASE_ALLOW_DOT.test(name))).toBe(true);
			expect(invalidNames.some((name) => KEBAB_CASE_ALLOW_DOT.test(name))).toBe(false);
		});
	});

	describe('KEBAB_CASE_ALLOW_FIRST_UNDERSCORE', () => {
		it('Allows lowercase kebab-case names prefixed with underscores', () => {
			const validNames = [
				'component',
				'_component',
				'__component-name',
			];

			const invalidNames = [
				'Component',
				'component_name',
				'component__name',
				'_component--name',
			];

			expect(validNames.every((name) => KEBAB_CASE_ALLOW_FIRST_UNDERSCORE.test(name))).toBe(true);
			expect(invalidNames.some((name) => KEBAB_CASE_ALLOW_FIRST_UNDERSCORE.test(name))).toBe(false);
		});
	});

	describe('KEBAB_CASE_ALLOW_DOUBLE', () => {
		it('Allows lowercase kebab-case names with single or double dash separators', () => {
			const validNames = [
				'component',
				'component-name',
				'component--modifier',
				'component--modifier-name',
			];

			const invalidNames = [
				'Component',
				'component_name',
				'component---modifier',
				'component--',
			];

			expect(validNames.every((name) => KEBAB_CASE_ALLOW_DOUBLE.test(name))).toBe(true);
			expect(invalidNames.some((name) => KEBAB_CASE_ALLOW_DOUBLE.test(name))).toBe(false);
		});
	});

	describe('BEM_CUSTOM_PROPERTY', () => {
		it('Allows kebab-case custom properties with one BEM element and many modifiers', () => {
			const validNames = [
				'component',
				'component-name',
				'component--inversed',
				'component__background',
				'component__background--inversed--size-large',
			];

			const invalidNames = [
				'Component__background',
				'component__background__icon',
				'component--inversed__background',
				'component__',
				'component--',
			];

			expect(validNames.every((name) => BEM_CUSTOM_PROPERTY.test(name))).toBe(true);
			expect(invalidNames.some((name) => BEM_CUSTOM_PROPERTY.test(name))).toBe(false);
		});
	});
});
