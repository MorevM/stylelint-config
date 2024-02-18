

## [5.1.0](https://github.com/MorevM/stylelint-config/compare/v5.0.1...v5.1.0) (2024-02-18)


### Features

* **css:** Enable `stylelint-selector-tag-no-without-class` plugin ([5d7c303](https://github.com/MorevM/stylelint-config/commit/5d7c3032ec7a1773ec55540c65ec800ce5d2459d))


### Chores

* Bump `stylelint-selector-tag-no-without-class` from 2.0.6 to 3.0.0 ([2f90a8b](https://github.com/MorevM/stylelint-config/commit/2f90a8bb486ff4f52a5e4b2b59c009b6ce0ce56d))

## [5.0.1](https://github.com/MorevM/stylelint-config/compare/v5.0.0...v5.0.1) (2024-02-07)


### Bug fixes

* Disable base `at-rule-no-unknown` using SCSS config ([c636501](https://github.com/MorevM/stylelint-config/commit/c636501f75f0646a13247e56c6a9e09a59244641))

## [5.0.0](https://github.com/MorevM/stylelint-config/compare/v4.0.0...v5.0.0) (2024-02-04)


### ⚠ BREAKING CHANGES

* **css:** Lost-related properties (https://lostgrid.org/) have been excluded from the whitelist of `property-no-unknown` since they are now useless with wide support for Flex and Grid.
Legacy code that relies on it will now flag these properties.
* **scss:** With new rule `scss/no-unused-private-members` SCSS preset becomes more strict
* The package now is defined as ESM and uses Stylelint v16, so it requires Node 18.12.0 or greater.
The options `quite`, `strict` are no longer available. Practice has shown that there are almost no use cases, so now there is only two exports: "/scss" (also considering a default export) and "/css" for CSS-only projects.

### Features

* **css:** Add `lightness-notation` rule ([5fe09f9](https://github.com/MorevM/stylelint-config/commit/5fe09f9ad49cf80a1e369c8bf9f940f30f51c4fd))
* **scss:** Add `scss/no-unused-private-members` rule ([0cff220](https://github.com/MorevM/stylelint-config/commit/0cff2202080471d22a3c4289f009e0f0a8dd7975))
* **scss:** Enable autofix for `scss/at-root-no-redundant` and `scss/at-use-no-redundant-alias` rules ([f798c48](https://github.com/MorevM/stylelint-config/commit/f798c48386327a497a9de4a6a855222f77c20d3f))
* Take account of `scss/block-no-redundant-nesting` rule ([c30a1de](https://github.com/MorevM/stylelint-config/commit/c30a1dee376610345eb55a33d066bafe1e49ed30))


### Bug fixes

* **css:** Disable plugin `stylelint-selector-tag-no-without-class` due to Stylelint v16 incompatibility ([73eda2f](https://github.com/MorevM/stylelint-config/commit/73eda2fba86db59567205089020674590a190493))
* **css:** Disable plugin `stylelint-use-nesting` due to Stylelint v16 incompatibility ([75c4252](https://github.com/MorevM/stylelint-config/commit/75c425259b544bd1e03baea81d8cdca1fd59539c))
* **css:** Do not combine `justify-items` and `align-items` to `place-items` ([c60dcdd](https://github.com/MorevM/stylelint-config/commit/c60dcdd1728cabc743059b0394e81df9a0252a96))
* **css:** Remove `lost-x` properties from whitelist of `property-no-unknown` ([e8ffb37](https://github.com/MorevM/stylelint-config/commit/e8ffb37940ed6218d36c470f27d54145aa665e1e))


### Refactoring

* **css:** Set explicit severity for some rules ([06c878c](https://github.com/MorevM/stylelint-config/commit/06c878c282876c1a866e4d26cbb59decd744f8ca))
* Rewriting to ESM and other significant changes ([9405b58](https://github.com/MorevM/stylelint-config/commit/9405b5854bc1d0a0f83ce3670737543eafce4121))
* Use `scss/load-no-partial-leading-underscore` instead of deprecated `at-import-no-partial-leading-underscore` ([f68fc1e](https://github.com/MorevM/stylelint-config/commit/f68fc1e400ae083e452ca098dc412fa04045dd9f))


### Documentation

* Add a `README.md` file ([4a2f34d](https://github.com/MorevM/stylelint-config/commit/4a2f34da211cdf12d0403b112b7af0f95079d1d1))


## [4.0.0](https://github.com/MorevM/stylelint-config/compare/v3.1.0...v4.0.0) (2023-09-24)


### ⚠ BREAKING CHANGES

* **scss:** With new rules `scss/at-root-no-redundant`, `scss/at-use-no-redundant-alias`, `scss/function-calculation-no-interpolation`, `scss/property-no-unknown` SCSS preset becomes more strict.

### Features

* **scss:** Add `scss/at-root-no-redundant` rule ([136d513](https://github.com/MorevM/stylelint-config/commit/136d513fc836b0d5552403ce66e87940700c7f5b))
* **scss:** Add `scss/at-use-no-redundant-alias` rule ([ad05c2a](https://github.com/MorevM/stylelint-config/commit/ad05c2ab3f592ceb6ab435c6f4312590227d883c))
* **scss:** Add `scss/function-calculation-no-interpolation` rule ([ac962e4](https://github.com/MorevM/stylelint-config/commit/ac962e4e8d21d82115e0887326414210b61dc45f))
* **scss:** Add `scss/property-no-unknown` rule ([abcef2a](https://github.com/MorevM/stylelint-config/commit/abcef2a656ac20f5b7a1ec43c4558b581bc921f9))

## [3.1.0](https://github.com/MorevM/stylelint-config/compare/v3.0.0...v3.1.0) (2023-08-12)


### Features

* **scss:** Take account of `scss/function-disallowed-list` rule ([2931b7c](https://github.com/MorevM/stylelint-config/commit/2931b7cb6d9311e258c93084a4d5a8d6f674d4d5))


### Bug fixes

* Mark `lefthook` as a devDep instead of direct ([76697b6](https://github.com/MorevM/stylelint-config/commit/76697b635e988d2fc2f931d327a5508e641a80c7))


### Chores

* Bump `stylelint-high-performance-animation` from 1.8.0 to 1.9.0 ([e89bffc](https://github.com/MorevM/stylelint-config/commit/e89bffcee2532a6aaed92e8cb22eccd5b8d51b5c))
* Bump `stylelint-scss` from 5.0.1 to 5.1.0 ([09fdfdf](https://github.com/MorevM/stylelint-config/commit/09fdfdfa6521a225d424529feffbaa06c1c7e57d))

## [3.0.0](https://github.com/MorevM/stylelint-config/compare/v2.2.1...v3.0.0) (2023-08-06)


### ⚠ BREAKING CHANGES

* **css:** With new rule `media-feature-name-value-no-unknown` CSS preset becomes more strict.
* **css:** With new rule `media-feature-name-value-no-unknown` CSS preset becomes more strict.
* **css:** With new option `consecutive-duplicates-with-different-syntaxes` in `declaration-block-no-duplicate-properties` rule CSS preset becomes more strict.
* **css:** With new rule `selector-anb-no-unmatchable` CSS preset becomes more strict.
* **css:** With new rule `declaration-property-value-no-unknown` CSS preset becomes more strict.

### Features

* **css:** Add `declaration-property-value-no-unknown` rule ([9df3035](https://github.com/MorevM/stylelint-config/commit/9df30359bbde2bca7a16347359864e6a1dab6328))
* **css:** Add `media-feature-name-value-no-unknown` rule ([0353e52](https://github.com/MorevM/stylelint-config/commit/0353e527191988e8aa46ef2382ff28b318e149ec))
* **css:** Add `media-query-no-invalid` rule ([2859e66](https://github.com/MorevM/stylelint-config/commit/2859e66b324a02a927de366f6a0cc7285105588b))
* **css:** Add `selector-anb-no-unmatchable` rule ([eff1b0a](https://github.com/MorevM/stylelint-config/commit/eff1b0aa7af1c0b718210ac753315a6809e4b744))
* **css:** Add an extra option to `declaration-block-no-duplicate-properties` rule ([ff980bd](https://github.com/MorevM/stylelint-config/commit/ff980bd5222ff773024b134f65cc8eb59c9ed79a))
* **css:** Take account of `media-feature-name-unit-allowed-list` rule ([e35117d](https://github.com/MorevM/stylelint-config/commit/e35117d62a4453e8add2f8f653738e90f486e390))
* **css:** Take account of `no-unknown-custom-properties` rule ([1bfa0ea](https://github.com/MorevM/stylelint-config/commit/1bfa0ea4dab2617cf6c28e9844c8214f1a8ab67a))
* **css:** Take account of `order/properties-alphabetical-order` rule ([8148dde](https://github.com/MorevM/stylelint-config/commit/8148ddecbfa8ba0237ba95f879a6323ac84e3bf0))
* **css:** Take account of autofix for `media-feature-range-notation` rule ([11b0131](https://github.com/MorevM/stylelint-config/commit/11b0131dc9c518ca0c68981d34e192b4cde36bb1))


### Refactoring

* Reorganize `stylelint` rules to fit its docs ([e95fd36](https://github.com/MorevM/stylelint-config/commit/e95fd366c6d70b45ceb219e487547ee1d099f352))
* Replace all standard stylistic rules with external package `stylelint-stylistic` ([6dc2681](https://github.com/MorevM/stylelint-config/commit/6dc2681db075bae0e8ad31e43ca08a197429dec6))


### Tests

* Add a simple test for unused/deprecated rules ([d594673](https://github.com/MorevM/stylelint-config/commit/d594673c5db3a9929a1300d249f2f750ad622d20))


### Bug fixes

* **scss:** Exclude new rules related only to CSS from SCSS config ([e262439](https://github.com/MorevM/stylelint-config/commit/e2624390ab38bc2389a9c6429941cb5956fde926))
* **scss:** Nest declarations correctly using SASS (disallow CSS `[@nest](https://github.com/nest)`) ([4259d7d](https://github.com/MorevM/stylelint-config/commit/4259d7d2b91932f0d8e0f15d0664b6597a0887f4))


### Chores

* Add `test` task to the release config ([4fa4b1d](https://github.com/MorevM/stylelint-config/commit/4fa4b1d02cef20eae025bde92107747b85794fcf))
* Bump `stylelint-scss` from 4.3.0 to 5.0.1 ([c40581b](https://github.com/MorevM/stylelint-config/commit/c40581b402dba35d892bc7054ac55d4b63683cc9))
* Bump `stylelint-use-nesting` from 4.0.0 to 4.1.0 ([a8e46ce](https://github.com/MorevM/stylelint-config/commit/a8e46ce37e7f8f6c08727c4045b3cc83303ec977))
* Bump `stylelint` from 14.16.1 to 15.10.2 ([d5c88e5](https://github.com/MorevM/stylelint-config/commit/d5c88e5b0cd844f15650e15a7e68d609dc594584))
* Bump dependencies that don't require any actions ([5e5c5fd](https://github.com/MorevM/stylelint-config/commit/5e5c5fdb6b479a130b6204ca52c24dad651e6cb3))
* Bump devDeps except `stylelint` itself ([4f334ac](https://github.com/MorevM/stylelint-config/commit/4f334ac6b07a71b78f3672b869c1e96463ec53d1))
* bump eslint from 8.32.0 to 8.34.0 ([#158](https://github.com/MorevM/stylelint-config/issues/158)) ([e8e525c](https://github.com/MorevM/stylelint-config/commit/e8e525caea540a91b1dfe6cd8c03b8767b034828))
 bump stylelint-order from 6.0.1 to 6.0.2 ([#159](https://github.com/MorevM/stylelint-config/issues/159)) ([fd8ce23](https://github.com/MorevM/stylelint-config/commit/fd8ce23eb1e02e8d99abe733ac01bb6d6dc74fe3))
* Enforce VSCode settings by default ([a2d6bb5](https://github.com/MorevM/stylelint-config/commit/a2d6bb56b7f1dc5a34e930ec9538f2c7e8dcb73d))
* Migrate from `.husky + lint-staged` to `lefthook` ([fd808bd](https://github.com/MorevM/stylelint-config/commit/fd808bd3594bc2ee8fcd85cc8d96dd9fe566281c))

### [2.2.1](https://github.com/MorevM/stylelint-config/compare/v2.2.0...v2.2.1) (2023-01-28)


### Bug fixes

* Allow to use `flex-wrap` and `flex-direction` separately ([a17aea0](https://github.com/MorevM/stylelint-config/commit/a17aea09ef9df569c764c0c99318b4697659679a))


### Chores

* Bump `stylelint-order` from 5.0.0 to 6.0.1 ([8936b71](https://github.com/MorevM/stylelint-config/commit/8936b7157425ae5b0414559a492f09c56d47989d))
* Upgrade devDeps ([7b4600e](https://github.com/MorevM/stylelint-config/commit/7b4600e1d578213a88c4caff4c6073cfea30044f))

## [2.2.0](https://github.com/MorevM/stylelint-config/compare/v2.1.0...v2.2.0) (2022-12-10)


### Features

* Take account of new `media-feature-range-notation` rule ([8ba3e2d](https://github.com/MorevM/stylelint-config/commit/8ba3e2d4d39c9a159ec46705ab46ee1f077bef86))


### Chores
* bump stylelint from 14.13.0 to 14.16.0 ([457ded2](https://github.com/MorevM/stylelint-config/commit/457ded2cb3187c3aaa3f214708afefeb0ed6d3da))
* bump stylelint-8-point-grid from 2.1.0 to 2.2.0 ([#110](https://github.com/MorevM/stylelint-config/issues/110)) ([7642b31](https://github.com/MorevM/stylelint-config/commit/7642b31b8733fa0a830cc0e9ea824481a9c54afa))
* bump stylelint-declaration-block-no-ignored-properties ([#120](https://github.com/MorevM/stylelint-config/issues/120)) ([f31ad12](https://github.com/MorevM/stylelint-config/commit/f31ad12c23a163a3a3b6ce0255c9b62d120484df))
* bump stylelint-high-performance-animation from 1.6.0 to 1.7.0 ([59d73e9](https://github.com/MorevM/stylelint-config/commit/59d73e916fda5fea1026ce4c44352eea4daab078))

## [2.1.0](https://github.com/MorevM/stylelint-config/compare/v2.0.0...v2.1.0) (2022-10-03)


### Features

* Add autofix for `font-weight-notation` rule ([bbf83a8](https://github.com/MorevM/stylelint-config/commit/bbf83a89ecbeb7b03b9bdc1c4cc1f1550fb8b5ef))


### Chores

* bump @morev/eslint-config from 15.3.0 to 17.4.0 ([#107](https://github.com/MorevM/stylelint-config/issues/107)) ([e5a38ad](https://github.com/MorevM/stylelint-config/commit/e5a38ad13140176d4efa4f3e8886855a380a2add))
* bump @release-it/conventional-changelog from 5.0.0 to 5.1.0 ([#86](https://github.com/MorevM/stylelint-config/issues/86)) ([b33685d](https://github.com/MorevM/stylelint-config/commit/b33685d465515bdc38362614fd721fa169e39487))
* bump eslint from 8.21.0 to 8.24.0 ([#103](https://github.com/MorevM/stylelint-config/issues/103)) ([9e15a09](https://github.com/MorevM/stylelint-config/commit/9e15a09661c5c035e0d8d8d029252f85be5ed126))
* bump jest and @types/jest ([#105](https://github.com/MorevM/stylelint-config/issues/105)) ([43f2816](https://github.com/MorevM/stylelint-config/commit/43f2816c4fc6c8805cee55d0926f478300957a29))
* bump postcss from 8.4.16 to 8.4.17 ([#108](https://github.com/MorevM/stylelint-config/issues/108)) ([bce155c](https://github.com/MorevM/stylelint-config/commit/bce155cb2d2f485ce670dc1ab127ad2dfce7a182))
* bump postcss-scss from 4.0.4 to 4.0.5 ([#98](https://github.com/MorevM/stylelint-config/issues/98)) ([3de727a](https://github.com/MorevM/stylelint-config/commit/3de727a50b98b9d295ed171344d303cb8bb0aae3))
* bump release-it from 15.3.0 to 15.4.2 ([#100](https://github.com/MorevM/stylelint-config/issues/100)) ([85fcb38](https://github.com/MorevM/stylelint-config/commit/85fcb386ab2808f021eaf7566f20d9868cae6343))
* bump stylelint from 14.10.0 to 14.13.0 ([6953ed8](https://github.com/MorevM/stylelint-config/commit/6953ed898106d9027c66f525615c001c786e14ad))


### Refactoring

* Relint files after ESlint config update ([4cdcb13](https://github.com/MorevM/stylelint-config/commit/4cdcb139f3eaef7edb382ef295f8e19e48a0ab4d))

## [2.0.0](https://github.com/MorevM/stylelint-config/compare/v1.2.0...v2.0.0) (2022-08-13)


### ⚠ BREAKING CHANGES

* New `annotation-no-unknown` rule has the `error` severity, so it can break builds.

### Features

* Add `annotation-no-unknown` rule ([74f186e](https://github.com/MorevM/stylelint-config/commit/74f186e5d39523c890bf9620e4ff31e521f84304))
* Add `keyframe-selector-notation` rule ([160a955](https://github.com/MorevM/stylelint-config/commit/160a955503038c8ba32c161d27403e7976716f26))


### Chores

* Add `node 18` to `engines` field of `package.json` ([8c4f23a](https://github.com/MorevM/stylelint-config/commit/8c4f23a71f79faec08a524ab4b0ac5aaaa419b5f))
* bump @morev/eslint-config from 12.3.0 to 13.0.0 ([#68](https://github.com/MorevM/stylelint-config/issues/68)) ([775ca48](https://github.com/MorevM/stylelint-config/commit/775ca48e33d029ede302339836c58749d079ff09))
* bump @morev/eslint-config from 13.0.0 to 15.0.0 ([#70](https://github.com/MorevM/stylelint-config/issues/70)) ([2bb811b](https://github.com/MorevM/stylelint-config/commit/2bb811bbf4fd8941ba699bcc50a69d7f52789927))
* bump @morev/eslint-config from 15.0.0 to 15.1.0 ([#75](https://github.com/MorevM/stylelint-config/issues/75)) ([efeec13](https://github.com/MorevM/stylelint-config/commit/efeec1374d6e36a1acd9a190c3e052fd38364f6f))
* bump @morev/eslint-config from 15.1.0 to 15.2.0 ([#78](https://github.com/MorevM/stylelint-config/issues/78)) ([b83e385](https://github.com/MorevM/stylelint-config/commit/b83e385931b0ae20d11fc588bfe33bca80e2b371))
* bump @morev/eslint-config from 15.2.0 to 15.3.0 ([#83](https://github.com/MorevM/stylelint-config/issues/83)) ([20aa406](https://github.com/MorevM/stylelint-config/commit/20aa40600ee494285d6981bdb15c3e90a6d2f10e))
* bump eslint from 8.18.0 to 8.19.0 ([#64](https://github.com/MorevM/stylelint-config/issues/64)) ([740e5ae](https://github.com/MorevM/stylelint-config/commit/740e5ae2c18b0a1c207f234bc454f22978583c22))
* bump eslint from 8.19.0 to 8.20.0 ([#74](https://github.com/MorevM/stylelint-config/issues/74)) ([17893f2](https://github.com/MorevM/stylelint-config/commit/17893f25d1b5d667715895925ea6da5d29383f2e))
* bump eslint from 8.20.0 to 8.21.0 ([#79](https://github.com/MorevM/stylelint-config/issues/79)) ([4d80678](https://github.com/MorevM/stylelint-config/commit/4d806781a4c903d056f69fd74ca62e29fd56e0a0))
* bump jest and @types/jest ([#65](https://github.com/MorevM/stylelint-config/issues/65)) ([a3c2c52](https://github.com/MorevM/stylelint-config/commit/a3c2c52b31fac78092d31f3c8d57c91875a8741e))
* bump jest and @types/jest ([#72](https://github.com/MorevM/stylelint-config/issues/72)) ([ba1f9cb](https://github.com/MorevM/stylelint-config/commit/ba1f9cbcfddba5800e6405a7e47f2d8e2fe5e66a))
* bump lint-staged from 13.0.2 to 13.0.3 ([#63](https://github.com/MorevM/stylelint-config/issues/63)) ([a1af030](https://github.com/MorevM/stylelint-config/commit/a1af03040a5e19598ef5b4c74ddadc2a36001f40))
* bump postcss from 8.4.14 to 8.4.16 ([#81](https://github.com/MorevM/stylelint-config/issues/81)) ([6ae961c](https://github.com/MorevM/stylelint-config/commit/6ae961c97e2cd27fc2cc33d6d5e23faf326620b5))
* bump release-it from 15.1.0 to 15.1.1 ([#67](https://github.com/MorevM/stylelint-config/issues/67)) ([7871776](https://github.com/MorevM/stylelint-config/commit/787177652ef09b98b16553f80bb4b5f9a30640d5))
* bump release-it from 15.1.1 to 15.1.2 ([#71](https://github.com/MorevM/stylelint-config/issues/71)) ([685d869](https://github.com/MorevM/stylelint-config/commit/685d869e7fecb5bdfdac94a537229d96ce8ebcfe))
* bump release-it from 15.1.2 to 15.1.3 ([#73](https://github.com/MorevM/stylelint-config/issues/73)) ([03da2cb](https://github.com/MorevM/stylelint-config/commit/03da2cbcfbc3f0f0eb09895329c722cc3d6034fb))
* bump release-it from 15.1.3 to 15.2.0 ([#77](https://github.com/MorevM/stylelint-config/issues/77)) ([4980159](https://github.com/MorevM/stylelint-config/commit/4980159b66f5950106a90ab28abf3fb9f5bf6067))
* bump release-it from 15.2.0 to 15.3.0 ([#82](https://github.com/MorevM/stylelint-config/issues/82)) ([bf0b174](https://github.com/MorevM/stylelint-config/commit/bf0b174b5367e2d5e15987e3fcc8f1e7aa056513))
* bump stylelint from 14.9.1 to 14.10.0 ([#80](https://github.com/MorevM/stylelint-config/issues/80)) ([3bd6295](https://github.com/MorevM/stylelint-config/commit/3bd62951fc233d0a61bfb478bbffc6220c068502))
* bump stylelint-scss from 4.2.0 to 4.3.0 ([#69](https://github.com/MorevM/stylelint-config/issues/69)) ([6e65ac0](https://github.com/MorevM/stylelint-config/commit/6e65ac0e3b44ec4967d28e6b534e039948b2f71f))
* bump stylelint-use-nesting from 3.0.0 to 4.0.0 ([#76](https://github.com/MorevM/stylelint-config/issues/76)) ([79d9291](https://github.com/MorevM/stylelint-config/commit/79d9291824906b1522a9420075cb9bc72e320bb8))
* Set correct version of `stylelint` in `peerDependencies` ([0975b55](https://github.com/MorevM/stylelint-config/commit/0975b557a6ab46de0ba62c0616a67947a61721d4))


### Bug fixes

* Correct order of media queries ([a1b527f](https://github.com/MorevM/stylelint-config/commit/a1b527f075793beb33a81645a5cc2707c5fa3529))
* Ignore `font-family` property for `value-keyword-case` ([c00dfca](https://github.com/MorevM/stylelint-config/commit/c00dfca5f2006ef11e2b24086cca1b3db58a6fae))

## [1.2.0](https://github.com/MorevM/stylelint-config/compare/v1.1.0...v1.2.0) (2022-06-23)


### Features

* Add `import-notation` rule ([9cd795a](https://github.com/MorevM/stylelint-config/commit/9cd795ae1b34ba38d4199c19e7fc8de7d3a286a2))


### Chores

* bump @morev/eslint-config from 12.0.0 to 12.1.1 ([#54](https://github.com/MorevM/stylelint-config/issues/54)) ([2428a1f](https://github.com/MorevM/stylelint-config/commit/2428a1f7796d181e7fb8690166d9755f73eb70e9))
* bump @morev/eslint-config from 12.1.1 to 12.2.0 ([#55](https://github.com/MorevM/stylelint-config/issues/55)) ([c30e90a](https://github.com/MorevM/stylelint-config/commit/c30e90a7895463211f5607badacfe4a68220ae8f))
* bump @morev/eslint-config from 12.2.0 to 12.3.0 ([#60](https://github.com/MorevM/stylelint-config/issues/60)) ([77bc6ae](https://github.com/MorevM/stylelint-config/commit/77bc6ae48c0f3ce9f9f7c3b0956c5f37c89b4884))
* bump @types/jest from 27.5.1 to 28.1.0 ([#52](https://github.com/MorevM/stylelint-config/issues/52)) ([cdafd3f](https://github.com/MorevM/stylelint-config/commit/cdafd3f112197d9cdc242b7349dcba5bb4744f9a))
* bump eslint from 8.16.0 to 8.17.0 ([#51](https://github.com/MorevM/stylelint-config/issues/51)) ([6c2cd61](https://github.com/MorevM/stylelint-config/commit/6c2cd613495b93c272e99fc747c223761eb021e4))
* bump eslint from 8.17.0 to 8.18.0 ([#59](https://github.com/MorevM/stylelint-config/issues/59)) ([e3dc98a](https://github.com/MorevM/stylelint-config/commit/e3dc98a0b7c482cc256d7b5e820213eb4868e6c5))
* bump jest and @types/jest ([#57](https://github.com/MorevM/stylelint-config/issues/57)) ([75a5016](https://github.com/MorevM/stylelint-config/commit/75a5016d7596fe09ff50d92a0c2523e49ecc3840))
* bump lint-staged from 12.4.2 to 13.0.0 ([#53](https://github.com/MorevM/stylelint-config/issues/53)) ([4f2cef5](https://github.com/MorevM/stylelint-config/commit/4f2cef51da9a89abb23db0cd2046e3ebf07499f1))
* bump lint-staged from 13.0.0 to 13.0.2 ([#61](https://github.com/MorevM/stylelint-config/issues/61)) ([47b4e62](https://github.com/MorevM/stylelint-config/commit/47b4e62cff52165d709ab5f556cba11e37be2c72))
* Deps update ([8eec568](https://github.com/MorevM/stylelint-config/commit/8eec5685e41a685e71954c7fc18f2f8d208dc038))


### Bug fixes

* Ignore prefixed `-ms-input-placeholder` ([671bdf0](https://github.com/MorevM/stylelint-config/commit/671bdf0929b068b360bbf50debc4b5a3a07330dd))

## [1.1.0](https://github.com/MorevM/stylelint-config/compare/v1.0.3...v1.1.0) (2022-05-29)


### Features

* Add `keyframe-block-no-duplicate-selectors` rule ([c7d6b02](https://github.com/MorevM/stylelint-config/commit/c7d6b02bd01485a6fa005d7ecf266a056e3280b3))
* Add `selector-not-notation` rule ([f96e077](https://github.com/MorevM/stylelint-config/commit/f96e0776be328f275155e84ff097905a40efeaa2))


### Chores

* bump @morev/commitlint-config from 0.1.0 to 0.1.1 ([#17](https://github.com/MorevM/stylelint-config/issues/17)) ([8921aad](https://github.com/MorevM/stylelint-config/commit/8921aad5aca227f0bd6d106dcce2f381aee80cb3))
* bump @morev/eslint-config from 10.0.3 to 11.0.0 ([#19](https://github.com/MorevM/stylelint-config/issues/19)) ([d36a522](https://github.com/MorevM/stylelint-config/commit/d36a52263e80220386fad94ffadfaeabfd1f2707))
* bump @morev/eslint-config from 11.0.0 to 11.1.1 ([#23](https://github.com/MorevM/stylelint-config/issues/23)) ([403bb19](https://github.com/MorevM/stylelint-config/commit/403bb1935fce7b6cd4fe738be6944d4333d00938))
* bump @morev/eslint-config from 11.1.1 to 11.2.0 ([#29](https://github.com/MorevM/stylelint-config/issues/29)) ([cb84c69](https://github.com/MorevM/stylelint-config/commit/cb84c6935a3774949179e3ef647e1cc2a3aff3a3))
* bump @morev/eslint-config from 11.2.0 to 11.3.0 ([#36](https://github.com/MorevM/stylelint-config/issues/36)) ([0bfdf5a](https://github.com/MorevM/stylelint-config/commit/0bfdf5a01ce50c271cbb8dbe3658607ce4a4958d))
* bump @morev/eslint-config from 11.3.0 to 12.0.0 ([#46](https://github.com/MorevM/stylelint-config/issues/46)) ([a0fd018](https://github.com/MorevM/stylelint-config/commit/a0fd0189ce99ef875a1384039e45a1910e8bde1d))
* bump @release-it/conventional-changelog from 4.2.2 to 4.3.0 ([#24](https://github.com/MorevM/stylelint-config/issues/24)) ([b022044](https://github.com/MorevM/stylelint-config/commit/b022044e2867a55e8ad6d10b7205247c9200bdc0))
* bump @types/jest from 27.4.1 to 27.5.1 ([05fd444](https://github.com/MorevM/stylelint-config/commit/05fd444cdb75b16b9807054d0c04d4fd1622f130))
* bump eslint from 8.12.0 to 8.13.0 ([#20](https://github.com/MorevM/stylelint-config/issues/20)) ([bf3388f](https://github.com/MorevM/stylelint-config/commit/bf3388f546633873c912cc3cce0aeb7b88f506c9))
* bump eslint from 8.13.0 to 8.14.0 ([#28](https://github.com/MorevM/stylelint-config/issues/28)) ([1570198](https://github.com/MorevM/stylelint-config/commit/1570198995a7701030ec2b0f2b4db20da30dfd21))
* bump eslint from 8.14.0 to 8.16.0 ([#45](https://github.com/MorevM/stylelint-config/issues/45)) ([1a07ed4](https://github.com/MorevM/stylelint-config/commit/1a07ed42c4e632b45616f6e9841da277e08b4c44))
* bump husky from 7.0.4 to 8.0.1 ([#44](https://github.com/MorevM/stylelint-config/issues/44)) ([46c8860](https://github.com/MorevM/stylelint-config/commit/46c88606bfd037d8c24188010bdff1490a549225))
* bump jest from 27.5.1 to 28.0.3 ([#33](https://github.com/MorevM/stylelint-config/issues/33)) ([76c79c2](https://github.com/MorevM/stylelint-config/commit/76c79c2aa5a2612ff648ad8e0ecf874415543666))
* bump jest from 28.0.3 to 28.1.0 ([#43](https://github.com/MorevM/stylelint-config/issues/43)) ([a4d8acc](https://github.com/MorevM/stylelint-config/commit/a4d8accf46b52bff651abd6af2b77e52ff11dbb3))
* bump lint-staged from 12.3.7 to 12.3.8 ([#22](https://github.com/MorevM/stylelint-config/issues/22)) ([431c269](https://github.com/MorevM/stylelint-config/commit/431c26904022204982411b479da414a39d02db29))
* bump lint-staged from 12.3.8 to 12.4.0 ([#27](https://github.com/MorevM/stylelint-config/issues/27)) ([e743c70](https://github.com/MorevM/stylelint-config/commit/e743c70abaf55639e9a68ea8bb4a3bd3a50c4f6a))
* bump lint-staged from 12.4.0 to 12.4.1 ([#37](https://github.com/MorevM/stylelint-config/issues/37)) ([7abe530](https://github.com/MorevM/stylelint-config/commit/7abe530695ed2120556ec250807653e251632c3d))
* bump lint-staged from 12.4.1 to 12.4.2 ([#50](https://github.com/MorevM/stylelint-config/issues/50)) ([93ecbc5](https://github.com/MorevM/stylelint-config/commit/93ecbc58c2ce1b5391f9b0d5e907bb3e0ccc70e6))
* bump postcss from 8.4.12 to 8.4.13 ([#34](https://github.com/MorevM/stylelint-config/issues/34)) ([c34ac01](https://github.com/MorevM/stylelint-config/commit/c34ac01377ea8837a717d68fe84fafbf26503799))
* bump postcss from 8.4.13 to 8.4.14 ([#48](https://github.com/MorevM/stylelint-config/issues/48)) ([7e1c8ea](https://github.com/MorevM/stylelint-config/commit/7e1c8ea73498f83f6469c7e3c8a7abd16db8cb63))
* bump postcss-scss from 4.0.3 to 4.0.4 ([#32](https://github.com/MorevM/stylelint-config/issues/32)) ([69475fd](https://github.com/MorevM/stylelint-config/commit/69475fd30c002fae0e0967656f8086c8ad2bc661))
* bump release-it and @release-it/conventional-changelog ([#40](https://github.com/MorevM/stylelint-config/issues/40)) ([678b302](https://github.com/MorevM/stylelint-config/commit/678b3021cc47db6f64e707601467ae72aec54a40))
* bump release-it from 14.13.1 to 14.14.0 ([#18](https://github.com/MorevM/stylelint-config/issues/18)) ([cbad849](https://github.com/MorevM/stylelint-config/commit/cbad84965d5f81c4f4ff30d4fcac4c7e1fc277f1))
* bump release-it from 14.14.0 to 14.14.1 ([#21](https://github.com/MorevM/stylelint-config/issues/21)) ([0c24fdd](https://github.com/MorevM/stylelint-config/commit/0c24fddca99f3f3a3a5585480fbee5be67838607))
* bump release-it from 14.14.1 to 14.14.2 ([#25](https://github.com/MorevM/stylelint-config/issues/25)) ([4e84a9f](https://github.com/MorevM/stylelint-config/commit/4e84a9f9f16037c7947224cd676a3593ca481f20))
* bump release-it from 14.14.2 to 14.14.3 ([#31](https://github.com/MorevM/stylelint-config/issues/31)) ([f55c397](https://github.com/MorevM/stylelint-config/commit/f55c397f9cf60ea8b7d7d68f16aa99719466c308))
* bump stylelint from 14.6.1 to 14.8.5 ([e1fbaaf](https://github.com/MorevM/stylelint-config/commit/e1fbaaf5730fd3ec01cb286b2157a3c029ca3390))
* Regenerate lockfile after massive deps upgrade ([89c800f](https://github.com/MorevM/stylelint-config/commit/89c800fffb7cef31881b639bdf97e888563b3166))

### [1.0.3](https://github.com/MorevM/stylelint-config/compare/v1.0.2...v1.0.3) (2022-03-26)


### Chores

* bump @morev/eslint-config from 10.0.2 to 10.0.3 ([#16](https://github.com/MorevM/stylelint-config/issues/16)) ([c8e92f2](https://github.com/MorevM/stylelint-config/commit/c8e92f23f6d3ad5a7defca9d48a79a14ff910a5c))
* bump eslint from 8.11.0 to 8.12.0 ([#15](https://github.com/MorevM/stylelint-config/issues/15)) ([f53a9ba](https://github.com/MorevM/stylelint-config/commit/f53a9ba2ab168f844359656b89ade58f8aa2d05a))
* bump stylelint from 14.6.0 to 14.6.1 ([#14](https://github.com/MorevM/stylelint-config/issues/14)) ([a4ed3b8](https://github.com/MorevM/stylelint-config/commit/a4ed3b891cc78309a575258946e6f3b50c96fd1e))
* Update `dependabot` settings ([a46dcd1](https://github.com/MorevM/stylelint-config/commit/a46dcd12078a9addcdb0b5336daf771518c31b70))### [1.0.2](https://github.com/MorevM/stylelint-config/compare/v1.0.1...v1.0.2) (2022-03-23)


### Chores

* Update `stylelint-scss` entry in `package.json` ([6c79f90](https://github.com/MorevM/stylelint-config/commit/6c79f90d174a25f97a0c9d54c8ee759ffab9ac1e))### [1.0.1](https://github.com/MorevM/stylelint-config/compare/v1.0.0...v1.0.1) (2022-03-23)


### Chores

* Deps update ([f90ff6f](https://github.com/MorevM/stylelint-config/commit/f90ff6f630acd7abe3a98c3866893ae99ab0dc8c))## [1.0.0](https://github.com/MorevM/stylelint-config/compare/v0.1.3...v1.0.0) (2022-03-19)


### ⚠ BREAKING CHANGES

* Exports changed.

### Features

* Add `declaration-property-max-values` rule declaration ([03800fd](https://github.com/MorevM/stylelint-config/commit/03800fda23e64e375ef378de3b541c0acfc4e1e1))
* Add `function-no-unknown` rule ([e6977a9](https://github.com/MorevM/stylelint-config/commit/e6977a9f6e1f74f6dd70b9cdb6e79c011363b536))
* **scss:** Add `scss/function-no-unknown` rule ([a4861ff](https://github.com/MorevM/stylelint-config/commit/a4861ff35af677cf28cdb15195c310ad6e66df99))


### Refactoring

* Change configurations naming convention ([931e407](https://github.com/MorevM/stylelint-config/commit/931e40734fd4a16f22df2a0b2ef53520ebf26383))


### Chores

* bump lint-staged from 12.3.5 to 12.3.7 ([#12](https://github.com/MorevM/stylelint-config/issues/12)) ([ef7d896](https://github.com/MorevM/stylelint-config/commit/ef7d896164a8b47d025499088d8ff2d0c83dcf75))
* bump postcss from 8.4.8 to 8.4.12 ([#10](https://github.com/MorevM/stylelint-config/issues/10)) ([f04cc2a](https://github.com/MorevM/stylelint-config/commit/f04cc2ad29752afb11fdef1722129dd9bfb86374))
* bump stylelint from 14.5.3 to 14.6.0 ([#13](https://github.com/MorevM/stylelint-config/issues/13)) ([9158f4c](https://github.com/MorevM/stylelint-config/commit/9158f4c1eb6d26fd64fbb2366ed95f6a4ae6744c))
* bump stylelint-scss from 4.1.0 to 4.2.0 ([#11](https://github.com/MorevM/stylelint-config/issues/11)) ([7c47b80](https://github.com/MorevM/stylelint-config/commit/7c47b80da7001e576f28a5f87b65bb8cdc86c27c))
* Set correct perrDependency stylelint version ([5de96ed](https://github.com/MorevM/stylelint-config/commit/5de96ed3241a0ddf20aa9a04e18070976749cf83))
* Upgrade `release-it` ([3a48b03](https://github.com/MorevM/stylelint-config/commit/3a48b033bc572d34bf01ec5fdf62c0d71806d85a))### [0.1.3](https://github.com/MorevM/stylelint-config/compare/v0.1.2...v0.1.3) (2022-03-12)


### Chores

* bump @morev/eslint-config from 6.0.2 to 8.1.0 ([#6](https://github.com/MorevM/stylelint-config/issues/6)) ([d381411](https://github.com/MorevM/stylelint-config/commit/d38141156c5b37e01132ac997e107504ed66683b))
* bump @release-it/conventional-changelog from 4.1.0 to 4.2.0 ([#1](https://github.com/MorevM/stylelint-config/issues/1)) ([ff16d09](https://github.com/MorevM/stylelint-config/commit/ff16d0936caa45040a677b13e7965a8c4c818d62))
* bump eslint from 8.9.0 to 8.10.0 ([#3](https://github.com/MorevM/stylelint-config/issues/3)) ([0bcc41f](https://github.com/MorevM/stylelint-config/commit/0bcc41fbed408992ce5e9c8c3b14e50a418c0ce2))
* bump lint-staged from 12.3.4 to 12.3.5 ([#5](https://github.com/MorevM/stylelint-config/issues/5)) ([df5c0f3](https://github.com/MorevM/stylelint-config/commit/df5c0f35a9b61bc33621cbc3e5e07fa7f35d78f8))
* bump postcss from 8.4.6 to 8.4.7 ([#2](https://github.com/MorevM/stylelint-config/issues/2)) ([6e2ca60](https://github.com/MorevM/stylelint-config/commit/6e2ca605f523571c19fa426506edf1540cee8a14))
* Upgrade `release-it` configuration ([565eb73](https://github.com/MorevM/stylelint-config/commit/565eb732a87e6f0ad0de23ddf64d93682dbccaa9))
* Upgrade dependencies ([e6fe84e](https://github.com/MorevM/stylelint-config/commit/e6fe84e06937117c883289a20ee877115679f989))## [0.1.2](https://github.com/MorevM/stylelint-config/compare/v0.1.1...v0.1.2) (2022-02-23)


### Bug Fixes

* **order:** Separate block and blockess mixins ([4af8055](https://github.com/MorevM/stylelint-config/commit/4af80559e8923155ef1f59a9d1dbd4ac3ae02e65))

## [0.1.1](https://github.com/MorevM/stylelint-config/compare/v0.1.0...v0.1.1) (2022-02-22)


### Bug Fixes

* Interpret `text-shadow` as `paint property` ([5ad3143](https://github.com/MorevM/stylelint-config/commit/5ad314320739f86ddf8ff4daef22edec1c1e5437))

# [0.1.0](https://github.com/MorevM/stylelint-config/compare/v0.0.1...v0.1.0) (2022-02-08)


### Features

* **scss:** Allow variables to start with `_` or `-`, allow `--` in middle of variable ([ceb9f33](https://github.com/MorevM/stylelint-config/commit/ceb9f33fd23b55c30021544c8b4af1a7f96f04fa))

## 0.0.1 (2022-02-05)
