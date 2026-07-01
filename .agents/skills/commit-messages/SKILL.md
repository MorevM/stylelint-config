---
name: commit-messages
description: |
  Use when proposing, rewriting, splitting, or creating Git commits in this repository, including Conventional Commit
  subjects, scopes, bodies, breaking-change notes, and atomic commit boundaries for rule, config, dependency, tooling,
  documentation, and release work.
---

# Commit Messages

Read the project `AGENTS.md` first. If the task updates dependencies, also read
`.agents/skills/update-dependencies/SKILL.md`.

## Guardrails

- Use English Conventional Commits: `type(scope)!: Subject`.
- Keep subjects concise, sentence-case, imperative or result-oriented, and without a trailing period.
- Wrap package names, rule ids, config names, file names, and commands in backticks.
- Add a body only for useful context, risk, migration notes, dependency release notes, or breaking changes.

## Scopes

- Use `css` for CSS preset changes.
- Use `scss` for SCSS preset changes.
- Omit scope for repo-wide APIs, internal migrations, tooling, package-manager, release, or cross-config changes.

## Subject Patterns

- Use ``feat(scope): Add `<rule>` rule`` for newly enabled non-breaking rules.
- Use ``feat(scope)!: Add `<rule>` rule`` when a new or stricter rule can fail consumer linting.
- Use ``feat(scope): Take account of `<rule>` rule`` for disabled, known-unused, or otherwise accounted-for rules.
- Use ``fix(scope): Remove deprecated `<rule>` rule`` when removing a deprecated configured rule.
- Use ``fix(scope): Replace deprecated `<old-rule>` rule with `<new-rule>` rule`` when upstream provides a replacement.
- Use ``fix(scope): Drop `<rule>` rule`` when removing a dropped upstream rule.
- Use `fix(scope): ...` for false-positive fixes, compatibility allowances, rule option corrections, or order corrections.
- Use `fix(scope)!: ...` when a fix changes consumer-visible ordering or stricter behavior.
- Use `refactor: ...` for internal rewrites with no intended consumer behavior change, usually without scope.
- Use ``chore: Bump `<package>` from <old> to <new>`` for a single dependency-only update.
- Use ``chore!: Bump `<package>` from <old> to <new>`` when a dependency bump raises peer, engine, or consumer requirements.
- Use `nvm: ...` only for tiny maintenance that is not user-facing, such as playground, TODO, or housekeeping changes.
- Use `ci: ...` for GitHub Actions and CI workflow changes.

## Breaking Changes

- Mark a change as breaking only when it introduces a new error-severity rule, a warning with broad position/order
  recalculation impact, or a peer/Node requirement above the package's currently declared supported range.
- Do not mark an upstream Node support drop as breaking when the dropped version is already outside this package's `engines.node` range.
- For breaking changes, add `BREAKING CHANGE:` and describe consumer impact, not the implementation.

## Atomicity

- Keep dependency bumps separate from follow-up rule/config changes.
- Prefer one rule addition, rule removal, option change, or known-unused decision per commit.
- Prefer separate commits when an upstream release needs both a dependency bump and consumer-visible config migration.

## Dependency Commit Bodies

For dependency-only bump commits, start the body with a concise summary of upstream changes that affect this config or
its consumers. Put the release notes link after the summary. If no upstream changes affect this config or its consumers,
say that explicitly first.
