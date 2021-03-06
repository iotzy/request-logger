const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'logger.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: "development",
    // mode: "production",
    module: {
        rules: [

        ]
    },
    resolve: {
        extensions: ['.js']
    },
    target: 'node'
}
