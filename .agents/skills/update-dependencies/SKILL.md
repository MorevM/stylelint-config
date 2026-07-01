---
name: update-dependencies
description: |
  Use when updating dependencies in a shared config package, including dependencies, devDependencies,
  peerDependencies, Stylelint rule providers, runtime helpers, parser/syntax packages, toolchain packages, package
  manager lockfiles, release-note review, and dependency-specific commit bodies.
---

# Update Dependencies

Read the project `AGENTS.md` first for repository layout, local validation commands, and project-specific checks.
Use `.agents/skills/commit-messages/SKILL.md` for general commit-message rules.

## Workflow

1. Identify the package's role: runtime dependency, peer dependency, rule provider, parser/syntax package, or dev tool.
1. Check the installed version in `package.json`.
1. Check the target version from the package registry when the task asks for latest/current updates.
1. Read upstream release notes from oldest to newest release in the update range.
1. Install/update exactly one direct package when the lockfile needs to change.
1. Inspect the installed package when behavior, exports, rules, options, peer ranges, or engines may have changed.
1. Adjust configuration, tests, docs, or package metadata only when the update requires it.
1. Run validation that matches the package role and the files touched.
1. For multi-package tasks, finish inspection, validation, and the dependency-only commit for one direct package before
   updating the next direct package.

Do not update multiple direct packages in one install/update command. Sequential updates make lockfile and transitive
changes attributable to a specific direct package.

## Dependency Roles

- **Rule providers**: inspect new, changed, renamed, deprecated, and removed rules.
  Account for each exposed rule through config, tests, or a deliberate known-unused decision.
- **Runtime helpers**: inspect changed exports, ESM/CJS shape, Node engine changes, and behavior used by source files.
- **Parser or syntax packages**: verify syntax compatibility and any config shape changes.
- **Peer dependencies**: verify supported ranges and whether consumer requirements need a breaking-change note.
- **Dev dependencies**: verify the affected tool entrypoints, config compatibility, and generated output expectations.
- **Transitive-only lockfile updates**: keep the change lockfile-scoped unless release notes reveal a direct action.

## Release Research

- Prefer primary sources:
  - npm metadata for latest version, peer dependencies, engines, and package type;
  - GitHub release API or raw changelog files for complete release notes;
  - upstream docs, package source, or runtime exports for exact behavior.
- Track changes that affect shared configs:
  - rule additions, removals, renames, deprecations, option changes, and default changes;
  - parser, syntax, or platform support changes;
  - package export changes;
  - peer dependency, Node engine, and package manager requirement changes;
  - CLI/config changes for dev tools.

## Rule-Provider Updates

- For every new or changed rule, inspect the installed package after the dependency bump.
- Check the rule name, namespace, docs URL, options, defaults, deprecation metadata, replacement rule, and fix behavior.
- Configure every new active rule or deliberately account for it as unused.
- Treat new blocking errors as consumer-facing breaking changes.
- Disable rules that are too opinionated, too noisy, redundant, project-specific, or unsafe for a shared config.
- For renamed rules, update the rule id and documentation link together.
- For removed and deprecated rules, remove the obsolete rule and add a replacement separately unless upstream documents a direct rename.

## Commit And Verification Notes

- Keep each direct package bump in its own dependency-only commit.
- Keep dependency-only bumps separate from behavior/configuration changes.
- Keep each follow-up config, test, docs, or known-unused decision focused.
- Expect a dependency-only intermediate commit to fail rule coverage when the bumped package exposes new rules.
- For dependency-only commits, write the body with the summary first and the release notes link after it. Start with a
  concise summary of upstream changes that affect this config or its consumers; if none are relevant, say so first.
- The final state for the processed update must pass focused checks for the changed dependency role.
