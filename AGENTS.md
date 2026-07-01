# AGENTS.md

## Repository Notes

- Project-local skills live in `.agents/skills/*`.
- Use `.agents/skills/update-dependencies/SKILL.md` for dependency updates.
- Use `.agents/skills/commit-messages/SKILL.md` when proposing, splitting, or creating Git commits.
- Source configs live under `src/configurations`: CSS in `css`, SCSS in `scss`.
- Core Stylelint rules live in `src/configurations/css/rules`.
- CSS plugin configs live in `src/configurations/css/plugins`; SCSS/Sass plugin configs live in `src/configurations/scss/plugins`.
- The SCSS config extends the CSS config and uses `postcss-scss`; keep SCSS syntax adaptations in the SCSS config.
- Built public entrypoints are emitted to `dist`; API-contract tests should prefer built public entrypoints over source aliases.
