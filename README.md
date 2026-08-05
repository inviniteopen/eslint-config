# @invinite/eslint-config

Unified ESLint configuration for Node, React and Svelte TypeScript projects. Flat config format with Prettier, import sorting, and unused import detection included.

## Install

```bash
npm install -D @invinite/eslint-config eslint typescript
```

## Usage

### Node projects

```js
// eslint.config.js
import config from "@invinite/eslint-config/node";

export default config;
```

### React projects

```js
// eslint.config.js
import config from "@invinite/eslint-config/react";

export default config;
```

### Svelte projects

```js
// eslint.config.js
import config from "@invinite/eslint-config/svelte";

export default config;
```

For SvelteKit projects, pass your `svelte.config.js` so rules understand kit-specific files:

```js
import config from "@invinite/eslint-config/svelte";

import svelteConfig from "./svelte.config.js";

export default [
  ...config,
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parserOptions: {
        svelteConfig,
      },
    },
  },
];
```

### Extending

```js
import config from "@invinite/eslint-config/node";

export default [
  ...config,
  {
    rules: {
      // Your custom rules
    },
  },
];
```

## TypeScript 7

typescript-eslint does not yet support TypeScript 7 (the Go-native compiler) — it is blocked on the stable programmatic API targeted for TypeScript 7.1. Until then, projects on TypeScript 7 can keep linting by aliasing the `typescript` package that lint tooling resolves to Microsoft's compatibility package:

```bash
npm install -D typescript@npm:@typescript/typescript6
```

This lets `tsc` run on TypeScript 7 while typescript-eslint continues to use the TypeScript 6.0 API.

## License

MIT
