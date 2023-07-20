module.exports = {
    arrowParens: 'avoid',
    bracketSpacing: false,
    endOfLine: 'auto',
    htmlWhitespaceSensitivity: 'css',
    jsxBracketSameLine: false,
    jsxSingleQuote: false,
    printWidth: 110,
    proseWrap: 'preserve',
    quoteProps: 'as-needed',
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false,
    vueIndentScriptAndStyle: true,
    parser: '',
    filepath: '',
    rangeStart: 0,
    rangeEnd: Infinity,
    requirePragma: false,
    insertPragma: false,
    overrides: [
        {
            files: '*.json',
            options: {
                printWidth: 200,
            },
        },
        {
            files: ['*.js', '*.ts', '*.jsx', '*.tsx', '*.css'],
            options: {
                editor: 'esbenp.prettier-vscode',
            },
        },
        {
            files: ['*.html'],
            options: {
                editor: 'vscode.html-language-features',
            },
        },
    ],
};
