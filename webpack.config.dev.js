var webpack = require("webpack");
var webpackBase = require("./webpack.config.base.js");


var cfg = Object.assign(webpackBase, {
    devtool: "cheap-module-eval-source-map"
});

//entry
Object.getOwnPropertyNames((webpackBase.entry || {})).map(function (name) {
    cfg.entry[name] = []
    //添加HMR文件
        .concat("webpack/hot/dev-server")
        .concat("webpack-dev-server/client?http://localhost:3000")
        .concat(webpackBase.entry[name])
});

//plugins
cfg.plugins = (webpackBase.plugins || []).concat(
    new webpack.optimize.OccurrenceOrderPlugin(),
    //添加HMR插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
)

module.exports = cfg;