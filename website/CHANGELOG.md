# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 0.1.0 - 2021-07-12

#### 🎉 Release

- Add new `@boost/decorators` package. ([55d3f41](https://github.com/milesj/boost/commit/55d3f41))

#### 🚀 Updates

- Add `Command#render` to render components continuously. (#136) ([999f20d](https://github.com/milesj/boost/commit/999f20d)), closes [#136](https://github.com/milesj/boost/issues/136)
- Add `Confirm` prompt component. (#122) ([e5ec1af](https://github.com/milesj/boost/commit/e5ec1af)), closes [#122](https://github.com/milesj/boost/issues/122)
- Add `deepMerge` helper. ([93659b8](https://github.com/milesj/boost/commit/93659b8))
- Add `HiddenInput` and `PasswordInput` prompt components. (#124) ([9f38dca](https://github.com/milesj/boost/commit/9f38dca)), closes [#124](https://github.com/milesj/boost/issues/124)
- Add `Input` prompt component. (#121) ([3ddda8a](https://github.com/milesj/boost/commit/3ddda8a)), closes [#121](https://github.com/milesj/boost/issues/121)
- Add `PackageGraph` class. (#117) ([6f2d344](https://github.com/milesj/boost/commit/6f2d344)), closes [#117](https://github.com/milesj/boost/issues/117)
- Add `requireTypedModule` helper for importing TypeScript files. (#140) ([b3b14aa](https://github.com/milesj/boost/commit/b3b14aa)), closes [#140](https://github.com/milesj/boost/issues/140)
- Add `Select` and `MultiSelect` prompt components. (#123) ([50540f6](https://github.com/milesj/boost/commit/50540f6)), closes [#123](https://github.com/milesj/boost/issues/123)
- Add `useProgram` hook. Improve error and exit handling. (#118) ([dbf95b1](https://github.com/milesj/boost/commit/dbf95b1)), closes [#118](https://github.com/milesj/boost/issues/118)
- Add boostrap argument to Program#run() and runAndExit(). ([c9bca9a](https://github.com/milesj/boost/commit/c9bca9a))
- Add isPlainObject helper. ([eec761c](https://github.com/milesj/boost/commit/eec761c))
- Add node requirement and package outdated middleware. ([891bfb3](https://github.com/milesj/boost/commit/891bfb3))
- Add support for `json5` file format. (#112) ([21f31d7](https://github.com/milesj/boost/commit/21f31d7)), closes [#112](https://github.com/milesj/boost/issues/112)
- Add support for `loose` mode. (#114) ([fc2210d](https://github.com/milesj/boost/commit/fc2210d)), closes [#114](https://github.com/milesj/boost/issues/114)
- Build packages with Rollup to support web and node targets. ([38cdad9](https://github.com/milesj/boost/commit/38cdad9))
- **[Registry]** Add resolver option to control module resolution. ([668e49a](https://github.com/milesj/boost/commit/668e49a))
- Return an unlistener from Event#listen. ([0f2a1f8](https://github.com/milesj/boost/commit/0f2a1f8))
- Support tuples (source and options) for plugin settings. (#143) ([4b15a8e](https://github.com/milesj/boost/commit/4b15a8e)), closes [#143](https://github.com/milesj/boost/issues/143)

#### 🐞 Fixes

- Handle default selected value. ([44edd86](https://github.com/milesj/boost/commit/44edd86))
- Migrate JS/CJS loader to use native require. ([84acc48](https://github.com/milesj/boost/commit/84acc48))
- Migrate TS loader to our new typed module loader. ([4cd80f4](https://github.com/milesj/boost/commit/4cd80f4))
- **[Select]** Add space bar selection handling. ([b443ee0](https://github.com/milesj/boost/commit/b443ee0))

#### ⚙️ Types

- Undo readonly name on abstract Plugin. ([a743b66](https://github.com/milesj/boost/commit/a743b66))

#### 📦 Dependencies

- Update doc dependencies. ([c070b96](https://github.com/milesj/boost/commit/c070b96))

#### 📘 Docs

- Add API sections for common classes. ([3be4a7b](https://github.com/milesj/boost/commit/3be4a7b))
- Add auto-deploy for Docusaurus. (#142) ([ea33828](https://github.com/milesj/boost/commit/ea33828)), closes [#142](https://github.com/milesj/boost/issues/142)
- Add CLIG link. ([842a9a8](https://github.com/milesj/boost/commit/842a9a8))
- Add configuration docs. (#111) ([ca3ade6](https://github.com/milesj/boost/commit/ca3ade6)), closes [#111](https://github.com/milesj/boost/issues/111)
- Add environment badges. ([771f752](https://github.com/milesj/boost/commit/771f752))
- Add image examples. ([42808b8](https://github.com/milesj/boost/commit/42808b8))
- Add props as separate sections. ([4ff4908](https://github.com/milesj/boost/commit/4ff4908))
- Change main color to purple. ([c6753cf](https://github.com/milesj/boost/commit/c6753cf))
- Enable algolia search. ([6f3e412](https://github.com/milesj/boost/commit/6f3e412))
- Migrate to Docusaurus. (#105) ([24196b8](https://github.com/milesj/boost/commit/24196b8)), closes [#105](https://github.com/milesj/boost/issues/105)
- Move file path comments to code block titles. ([73d1f6a](https://github.com/milesj/boost/commit/73d1f6a))
- Prepare website. ([82019fe](https://github.com/milesj/boost/commit/82019fe))
- Update header indents and reorganize. ([ce3b7ae](https://github.com/milesj/boost/commit/ce3b7ae))
- Update header indents and reorganize. ([ce40846](https://github.com/milesj/boost/commit/ce40846))
- Update versions to latest. ([dd96ad3](https://github.com/milesj/boost/commit/dd96ad3))
- Update versions. ([ee82c07](https://github.com/milesj/boost/commit/ee82c07))
- Use tabs for examples of the same type. ([4dc3cbc](https://github.com/milesj/boost/commit/4dc3cbc))

#### 🛠 Internals

- Add shorthand test utils exports. ([eb2d5dc](https://github.com/milesj/boost/commit/eb2d5dc))
- Make website a workspace. ([790404c](https://github.com/milesj/boost/commit/790404c))
- Migrate to Beemo tooling. (#154) ([0cd2a6f](https://github.com/milesj/boost/commit/0cd2a6f)), closes [#154](https://github.com/milesj/boost/issues/154)

**Note:** Version bump only for package website
