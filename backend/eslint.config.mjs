import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    {
        files: ['**/*.js'],
        languageOptions: { sourceType: 'commonjs' },
        ignores: ['**/coverage/'],
    },
    { languageOptions: { globals: globals.browser } },
    eslintConfigPrettier,
];
