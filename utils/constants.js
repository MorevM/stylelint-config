/* eslint-disable unicorn/no-unsafe-regex */
export const WARNING = 'warning';
export const ERROR = 'error';
export const KEBAB_CASE =  /^([a-z][\da-z]*)(-[\da-z]+)*$/;
export const KEBAB_CASE_ALLOW_FIRST_UNDERSCORE =  /^_*([a-z][\da-z]*)(-[\da-z]+)*$/;
export const KEBAB_CASE_ALLOW_DOUBLE = /^([a-z][\da-z]*)(-{1,2}[\da-z]+)*$/;
