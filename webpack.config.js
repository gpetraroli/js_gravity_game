const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        main: './assets/js/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'public/build'),
    },
    mode: "development",

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "assets/style", to: "style" },
                { from: "assets/images", to: "images" },
            ],
        }),
    ]
};