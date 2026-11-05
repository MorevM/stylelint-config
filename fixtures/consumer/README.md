# Consumer fixture

This standalone package installs the published tarball layout and checks its
public exports, Stylelint configuration loading, CSS/SCSS/BEM rules, and TypeScript
consumers using both NodeNext and Bundler resolution.

Runtime checks load `stylelint.config.ts`, which is also checked by both TypeScript
configs. It overrides the package's `long` hex notation default with `short` to
verify `setPrimary(callback)`, so the `#ffffff` sample must produce a warning.
Expected type errors live separately in `typechecks.ts` and are never loaded by Stylelint.

Run `pnpm test:package` from the repository root to build and pack the library,
copy this project to a temporary directory, install its dependencies, and run its
own `pnpm test` command. The temporary project is removed after the check.

To work on the consumer in your editor, prepare it from the repository root:

```sh
pnpm prepare:consumer
pnpm --dir fixtures/consumer test
```

The preparation command keeps the tarball and dependencies in the local fixture
so the editor can resolve its imports. Run it again after library changes to
refresh the installed package. Generated files remain ignored by Git.
