import { defineConfig } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([ {
    extends: compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),

    plugins: {'@typescript-eslint': typescriptEslint},

    languageOptions: {
        globals: {
            ...globals.browser,
            ActiveXObject: false,
            CocoonJS: false,
            Phaser: true,
            PIXI: true,
            p2: true
        },

        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: 'script'
    },

    rules: {
        'accessor-pairs': 'error',
        'array-bracket-spacing': [ 'error', 'always' ],
        'block-spacing': [ 'error', 'always' ],

        'brace-style': [ 'error', 'allman', {allowSingleLine: true} ],

        camelcase: 'warn',
        'comma-dangle': [ 'error', 'never' ],
        'comma-style': [ 'error', 'last' ],
        'computed-property-spacing': [ 'error', 'never' ],
        'consistent-this': 'off',
        curly: 'error',
        'dot-notation': [ 'error' ],
        'eol-last': [ 'error' ],
        eqeqeq: [ 'warn', 'smart' ],
        'func-call-spacing': [ 'warn', 'never' ],

        indent: [ 'error', 4, {SwitchCase: 1} ],

        'key-spacing': [ 'error', {
            beforeColon: false,
            afterColon: true
        } ],

        'linebreak-style': [ 'off' ],

        'lines-around-comment': [ 'warn', {
            beforeBlockComment: true,
            afterBlockComment: false,
            beforeLineComment: true,
            afterLineComment: false,
            allowBlockStart: true,
            allowBlockEnd: false,
            allowObjectStart: true,
            allowArrayStart: true
        } ],

        'multiline-comment-style': [ 'warn', 'starred-block' ],
        'new-parens': 'error',
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-caller': 'error',
        'no-cond-assign': [ 'warn', 'except-parens' ],

        'no-console': [ 'warn', {allow: [ 'error', 'warn', 'log', 'group', 'groupEnd' ]} ],

        'no-constant-condition': 0,
        'no-duplicate-case': [ 'error' ],
        'no-empty': 'warn',
        'no-floating-decimal': 'error',
        'no-invalid-this': 'error',
        'no-lonely-if': 'off',
        'no-mixed-spaces-and-tabs': 'error',
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',

        'no-multiple-empty-lines': [ 'error', {
            max: 1,
            maxBOF: 0
        } ],

        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-plusplus': 'off',
        'no-prototype-builtins': 'off',
        'no-redeclare': 'off',
        'no-self-assign': 'error',
        'no-self-compare': 'error',

        'no-trailing-spaces': [ 'error', {
            skipBlankLines: true,
            ignoreComments: true
        } ],

        'no-underscore-dangle': 'off',
        'no-unused-vars': 'warn',
        'no-whitespace-before-property': 'error',

        'object-curly-newline': [ 'error', {
            multiline: true,
            minProperties: 0
        } ],

        'one-var-declaration-per-line': [ 'error', 'initializations' ],
        'padded-blocks': [ 'error', 'never' ],
        'quote-props': [ 'error', 'as-needed' ],
        quotes: [ 'error', 'single' ],
        semi: [ 'error', 'always' ],

        'semi-spacing': [ 'error', {
            before: false,
            after: true
        } ],

        'space-before-blocks': 'error',
        'space-before-function-paren': 'error',
        'space-in-parens': [ 'error', 'never' ],

        'space-infix-ops': [ 'error', {int32Hint: true} ],

        'spaced-comment': [ 'error', 'always', {
            block: {
                balanced: true,
                exceptions: [ '*', '!' ]
            }
        } ],

        'valid-jsdoc': 'off',
        'wrap-regex': 'error',
        yoda: [ 'error', 'never' ]
    }
} ]);
