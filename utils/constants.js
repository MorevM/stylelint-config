/* eslint-disable unicorn/no-unsafe-regex */
const WARN = 'warning';
const ERROR = 'error';
const KEBAB_CASE =  /^([a-z][\da-z]*)(-[\da-z]+)*$/;
const KEBAB_CASE_ALLOW_FIRST_UNDERSCORE =  /^_*([a-z][\da-z]*)(-[\da-z]+)*$/;
const KEBAB_CASE_ALLOW_DOUBLE = /^([a-z][\da-z]*)(-{1,2}[\da-z]+)*$/;

module.exports = {
	WARN,
	ERROR,
	KEBAB_CASE,
	KEBAB_CASE_ALLOW_DOUBLE,
	KEBAB_CASE_ALLOW_FIRST_UNDERSCORE,
};
