![Promo image of @morev/stylelint-config package](./.github/images/banner.svg)

![Stability of "master" branch](https://img.shields.io/github/actions/workflow/status/MorevM/stylelint-config/build.yaml?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Last commit](https://img.shields.io/github/last-commit/morevm/stylelint-config)
![Release version](https://img.shields.io/github/v/release/morevm/stylelint-config?include_prereleases)
![GitHub Release Date](https://img.shields.io/github/release-date/morevm/stylelint-config)
![Keywords](https://img.shields.io/github/package-json/keywords/morevm/stylelint-config)

# @morev/stylelint-config

Strict shareable Stylelint configuration with reasonable defaults.

✔️ 200+ configured rules of Stylelint and its plugins; \
✔️ 70+ extra rules for SCSS; \
✔️ Consistent order of properties and rules according to BEM methodology.

---

## Installation

### Using `yarn`

```sh
yarn add stylelint @morev/stylelint-config --dev
```

### Using `npm`

```sh
npm install -D stylelint @morev/stylelint-config
```

### Using `pnpm`

```sh
pnpm add -d stylelint @morev/stylelint-config
```

## Usage

Create a [Stylelint configuration file](https://stylelint.io/user-guide/configure/)
(`stylelint.config.ts` for the following instruction) in the package root with the following content:

### SCSS repository (default)

```js
import { defineConfig } from '@morev/stylelint-config';

export default defineConfig();
```

SCSS preset is used by default. You can also choose it explicitly:

```js
import { defineConfig } from '@morev/stylelint-config';

export default defineConfig({ preset: 'scss' });
```

### CSS repository

```js
import { defineConfig } from '@morev/stylelint-config';

export default defineConfig({ preset: 'css' });
```

### Mixed repository

```js
import { defineConfig } from '@morev/stylelint-config';

export default {
  overrides: [
    { files: ['*.css'], ...defineConfig({ preset: 'css' }) },
    { files: ['*.scss'], ...defineConfig({ preset: 'scss' }) },
  ],
};
```

### Custom order

`defineConfig` accepts project-specific order overrides without redefining the whole
`order/order` value. The `order` option intentionally supports only configurable project
groups: `mixins`, `blockMixins`, `mediaQueries`, and `containerQueries`. Arrays replace
the default group, and callbacks receive a cloned typed copy of the default group values.
If the resulting custom group omits its broad matcher, `defineConfig` appends it so
unmatched at-rules still keep their position.

```js
import { defineConfig } from '@morev/stylelint-config';

export default defineConfig({
  preset: 'scss',
  order: {
    // Arrays replace the default values for the group.
    mixins: ['theme-dark'],
    blockMixins: ['responsive'],
    // The callback return value also replaces defaults; spread them to extend instead.
    mediaQueries: (mediaQueries) => [
      '--watch',
      ...mediaQueries,
      '--ultra-wide',
    ],
    containerQueries: [],
  },
}, {
  // Rest elements can extend the config in Stylelint format.
  rules: {
    'selector-max-id': null,
  },
});
```

### Exported order values

The raw default order values are also exported for advanced Stylelint configuration:

```js
import {
  PROPERTIES_ORDER,
  RULES_ORDER,
  defineConfig,
} from '@morev/stylelint-config';

export default defineConfig({}, {
  rules: {
    'order/order': [RULES_ORDER, { severity: 'warning' }],
    'order/properties-order': [PROPERTIES_ORDER, { severity: 'warning' }],
  },
});
```
