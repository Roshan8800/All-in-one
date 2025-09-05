const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");
const js = require("@eslint/js");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = [
    ...compat.extends("@react-native"),
];
