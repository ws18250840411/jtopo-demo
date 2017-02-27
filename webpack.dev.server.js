var path = require("path");
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackCfg = require("./webpack.config.dev.js");

var compiler = webpack(webpackCfg);

//init server
var app = new webpackDevServer(compiler, {
    //注意此处publicPath必填
    publicPath: webpackCfg.output.publicPath,
    //HMR配置
    hot:true
});

app.listen(3000, "localhost", function (err) {
    if (err) {
        console.log(err);
    }
});