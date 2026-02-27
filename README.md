# @invinite/eslint-config

Unified ESLint configuration for Node and React TypeScript projects. Flat config format with Prettier, import sorting, and unused import detection included.

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

## License

MIT
