module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base', // Uses airbnb rules
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: [
    "@typescript-eslint"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "import/extensions": "off"
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js", ".ts"
        ],
        "moduleDirectory": [
          "node_modules", "src/"
        ]
      }
    }
  }
};
