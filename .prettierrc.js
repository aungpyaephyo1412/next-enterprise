module.exports = {
    singleQuote: true,
    endOfLine: 'auto',
    plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss',
    ],
    tailwindFunctions: ['clsx', 'cn', 'twMerge'],
};