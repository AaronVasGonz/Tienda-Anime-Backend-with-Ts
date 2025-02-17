import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    rules: {
      'no-unused-vars': 'off', 
    },
  },
  {
    languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': 'off', 
      '@typescript-eslint/no-unused-vars': 'off', 
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];