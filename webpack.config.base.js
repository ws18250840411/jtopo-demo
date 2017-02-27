var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: {
        "app": "./src/app.js"
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist",
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                use: [{
                    loader: "babel-loader"
                }],
                exclude: path.resolve(__dirname,'node_modules')
            },
            {
                test:/\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ],
                exclude: path.resolve(__dirname,'node_modules')
            },{
                test:/\.html$/,
                use:[
                    {
                        loader:"html-loader"
                    }
                ]
            }
        ]
    },
    plugins: []
}
