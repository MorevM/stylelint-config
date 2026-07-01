---
name: Bug report
about: Report incorrect Stylelint config behavior.

---

## What happened?

Describe the false positive, false negative, crash, or generated config issue.

## Minimal reproduction

```js
// stylelint.config.js / stylelint.config.ts
import { defineConfig } from '@morev/stylelint-config';

export default defineConfig();
```

```scss
/* CSS or SCSS that shows the issue */
```

## Expected result

What should Stylelint report or allow?

## Actual result

Paste the Stylelint output, stack trace, or rule message.

## Affected config

- Preset or entrypoint:
- Rule or plugin, if known:
- `@morev/stylelint-config` version:
- `stylelint` version:
- Node.js version:
