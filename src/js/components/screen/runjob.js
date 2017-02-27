/**
 * Created by wws on 2016/12/5.
 */
(function() {
    var $ = require('../jquery/jquery.min');
    require('./screens.css');                                                       // 引入screens.css样式表
    require('../jtopo/jtopo-tp');                                                        // 引入JTopo的插件
    var runjobTpl = require('./runjob.html');
    /**
     * 定义常规变量
     * @param params
     */
    var runjob, screensDom = $('screens'),// 画布dom
        minHeight = 500,// 最小高度
        canvsMinHeight = 1000,
        globalHeight = 800,// 公共变量,用来随时记录画布的高度和宽度
        globalWidth = 1000,
        stepWidth,
        timer = null,//计时器
        life = 60,
        clockNum = [21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],// 时钟的刻度
        containerHeightArr = [];//存所有的容器的高度

    runjob = {
        /**
         * 初始化
         * @param params
         */
        init: function (params) {
            //每次重绘时就刷新时间
            runjob.initDraw();
            runjob.resize();
            runjob.resetBackgroud();
        },

        /**
         * 执行窗口大小resize方法
         */
        resize: function () {
            // 当窗口改变大小的时候, 执行初始化绘图
            $(window).resize(function () {
                // $('#wbkRunjob').mCustomScrollbar("destroy");
                // 执行初始化绘图
                runjob.initDraw();
            });

        },
        /**
         * 重置页面背景颜色
         */
        resetBackgroud: function () {
            $("#wbkHtml body").css({
                "background":"#000"
            });
        },
        /**
         * 执行初始化绘图所执行的方法.
         */
        initDraw: function () {
            // 清空整个Dom,以便重新生成
            screensDom.empty();
            screensDom.append(runjobTpl);
            //每次重绘时就刷新时间
            //这些不用写到async里面去
            var hh = document.body.scrollHeight;
            globalHeight = hh > minHeight ? hh : minHeight;
            var height = globalHeight - 100;
            var width = globalWidth;
            runjob.draw(width, height);
        },
        /**
         * 画图形
         */
        draw: function (width, height) {

            var ch = height > canvsMinHeight ? height : canvsMinHeight;
            //创建canvas画布
            runjob.createCanvas(width, ch);
            var canvas = document.getElementById('canvas');
            var stage = new JTopo.Stage(canvas);

            var scene = new JTopo.Scene(stage);

            var from = runjob.newNode(100, 60, 30, 30,'',scene);
            var to = runjob.newNode(300, 60, 30, 30,'',scene);
            var link = runjob.newLink(from, to, 'Arrow', 5,scene);
            link.arrowsRadius = 4;

            //arrow的类型
            link.arrowType = 'flexionalLinks';
            //arrow的偏移量
            link.arrowsOffset = 0;


        },
        /**
         * 创建canvas画布
         * @param w
         * @param h
         */
        createCanvas: function (w, h) {
            var width = w;
            var height = h;
            var canvasHtml = '<canvas id="canvas" height="' + height + '" width="' + width + '" style="border: 1px solid red"></canvas>';
            var batDom = $('#wbkRunbat');
            batDom.empty();
            batDom.append(canvasHtml);
        },
        newNode: function (x, y, w, h, text,scene) {
            var node = new JTopo.Node(text);
            node.setLocation(x, y);
            node.setSize(w, h);
            scene.add(node);
            return node;
        },
        newLink:function (nodeA, nodeZ, text, dashedPattern,scene){
            var link = new JTopo.FlexionalLink(nodeA, nodeZ, text);
            link.lineWidth = 3; // 线宽
            link.lineEndPointOffset = 15; // 线的末尾端点到节点的距离
            link.lineStartPointOffset = -20; // 线的末尾端点到节点的距离
            // link.dashedPattern = dashedPattern; // 虚线
            link.bundleOffset = 60; // 折线拐角处的长度
            link.bundleGap = 20; // 线条之间的间隔
            link.textOffsetY = 3; // 文本偏移量（向下3个像素）
            link.strokeColor = '0,200,255';
            scene.add(link);
            return link;
        }

    };
    module.exports =  runjob;
})();