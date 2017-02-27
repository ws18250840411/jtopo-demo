/**
 * Created by wws on 2016/12/5.
 */
(function () {
    var drawJtopo = {
            /**
             * 获取节点json格式
             * @param scene
             * @param data
             * @param arrLinkNode
             */
            getNodeJson: function (scene,data,arrLinkNode) {
                var allNodesList = data;
                $.each(allNodesList, function (i,vals) {
                    var containVals = vals;
                    $.each(containVals, function (i,conVal) {
                        var groupRelationVals = conVal.groupRelationList;
                        if(groupRelationVals.length>0){
                            $.each(groupRelationVals, function (i,obj) {
                                var parentGroupVals = obj.middleNodesPosition;
                                var parentGroupId = obj.parentGroupId;
                                if(parentGroupVals){
                                    for(var i=0;i<arrLinkNode.length;i++){
                                        var startNodeId = conVal.groupId;
                                        var arrLinkNodeList = arrLinkNode[i].groupId;
                                        if((parentGroupId+'_line_'+startNodeId+'_0') == arrLinkNodeList){
                                            if(arrLinkNode[i].x == null){
                                                arrLinkNode[i].x = 0;
                                            }
                                            if(arrLinkNode[i].y == null){
                                                arrLinkNode[i].y = 0;
                                            }
                                            var x1 = arrLinkNode[i].x;
                                            var y1 = arrLinkNode[i].y;
                                        }
                                        if((parentGroupId+'_line_'+startNodeId+'_1') == arrLinkNodeList){
                                            if(arrLinkNode[i].x == null){
                                                arrLinkNode[i].x = 0;
                                            }
                                            if(arrLinkNode[i].y == null){
                                                arrLinkNode[i].y = 0;
                                            }
                                            var x2 = arrLinkNode[i].x;
                                            var y2 = arrLinkNode[i].y;
                                        }
                                        obj.middleNodesPosition = JSON.stringify([{x:x1,y:y1},{x:x2,y:y2}])
                                    }
                                } else {
                                    for(var i=0;i<arrLinkNode.length;i++){
                                        var startNodeId = conVal.groupId;
                                        var arrLinkNodeList = arrLinkNode[i].groupId;
                                        if((parentGroupId+'_line_'+startNodeId+'_0') == arrLinkNodeList){
                                            if(arrLinkNode[i].x == null){
                                                arrLinkNode[i].x = 0;
                                            }
                                            if(arrLinkNode[i].y == null){
                                                arrLinkNode[i].y = 0;
                                            }
                                            var x1 = arrLinkNode[i].x;
                                            var y1 = arrLinkNode[i].y;
                                        }
                                        if((parentGroupId+'_line_'+startNodeId+'_1') == arrLinkNodeList){
                                            if(arrLinkNode[i].x == null){
                                                arrLinkNode[i].x = 0;
                                            }
                                            if(arrLinkNode[i].y == null){
                                                arrLinkNode[i].y = 0;
                                            }
                                            var x2 = arrLinkNode[i].x;
                                            var y2 = arrLinkNode[i].y;
                                        }
                                        obj.middleNodesPosition = JSON.stringify([{x:x1,y:y1},{x:x2,y:y2}])
                                    }
                                }
                            })
                        }
                    })
                });
                return allNodesList;
            },
            /**
             * 保存节点json格式
             * @param data
             * @param callback
             */
            saveNodeJson: function (data, callback) {
                var url = wbkUrl.getUrl('saveBatchJobScreenData');
                var param = {
                    batchScreenData: JSON.stringify(data)
                };

                $.ajax({
                    type: "POST",
                    url: url,
                    data: param,
                    dataType: "JSON",
                    success: function (data) {
                        if (callback) {
                            callback();
                        }
                    }
                });
            },
            /**
             * 遍历所有的imgnode节点的高度到整个数据结构中
             * @param arrImgNodes
             * @param allNodesList
             */
            ergodicAllImgNode: function (arrImgNodes,allNodesList) {
                var newAllNodesList = allNodesList;
                var allObj = newAllNodesList.groupList;
                $.each(allObj, function (i,val) {
                    var ParentGroupId = val.groupId;
                    for(var i=0;i<arrImgNodes.length;i++){
                        var imgNode = arrImgNodes[i];
                        if(imgNode.groupId == ParentGroupId){
                            val.groupPosition = imgNode.y;
                        }
                    }
                });
                return newAllNodesList;
            },
            showScene: function (scene, data) {
                if (!data || $.trim(data) == '') {
                    return false;
                }
                var d = data = JSON.parse(data).scene;
                if (d) {
                    scene.translateX = d.translateX;
                    scene.translateY = d.translateY;
                }
            },
            /**
             * 显示tip
             * @param scene
             */
            showQtip: function (scene) {
                var nodes = drawJtopo.getAllElement(scene);
                for(var i=0;i<nodes.length;i++){
                    var ele = nodes[i];
                    var tipNode;
                    ele.mouseover(function () {
                        var nodex = this.x,
                            nodey = this.y,
                            nodeWidth = ele.getSize().width,
                            text = this.tips,//tip的内容
                            fontSize = "14px REEJI",//tip的字体
                            fontColor = "255,255,255",
                            backgroudColor = "8, 50, 117",//tip的背景颜色
                            borderWidth = 2,//tip的边框大小
                            tipAlpha = 0.5;//tip的透明度
                        if(nodey>160){
                            tipNode = drawJtopo.TipNodeUpward(text,fontSize,fontColor,backgroudColor,borderWidth,tipAlpha);
                            tipNode.setLocation(nodex+nodeWidth/2, nodey-74);
                            scene.add(tipNode);
                        } else {
                            tipNode = drawJtopo.TipNodeDown(text,fontSize,fontColor,backgroudColor,borderWidth,tipAlpha);
                            tipNode.setLocation(nodex+nodeWidth/2, nodey+116);
                            scene.add(tipNode);
                        }
                    });
                    ele.mouseout(function () {
                        scene.remove(tipNode);
                    });
                }
            },
            /**
             * TipNode生成箭头向下的tip节点
             * @param text
             * @param fontSize
             * @param backgroudColor
             * @param fontColor
             * @param borderWidth
             * @param tipAlpha
             */
            TipNodeDown: function (text,fontSize,fontColor,backgroudColor,borderWidth,tipAlpha) {
                var node = new JTopo.Node();
                node.setSize(0,0);
                node.fontColor = fontColor;
                node.alarm=text;
                node.paintAlarmText = function(a) {
                    if (null != this.alarm && "" != this.alarm) {
                        var b = this.alarmColor || backgroudColor,
                            c = this.alarmAlpha || tipAlpha;
                        a.beginPath();
                        a.font = this.alarmFont || fontSize;
                        var textArray = drawJtopo.stringStr(this.alarm);
                        var rowCnt = textArray.length;
                        var maxLength = 0,maxText = textArray[0];
                        for(var i=0;i<textArray.length;i++){
                            var nowText = textArray[i],textLength = nowText.length;
                            if(textLength >=maxLength){
                                maxLength = textLength;
                                maxText = nowText;
                            }
                        }
                        var maxWidth = a.measureText(maxText).width+40;
                        var lineHeight = a.measureText("节").width+6;
                        //算出alarm的最大的宽度
                        var d =((a.measureText(this.alarm).width/rowCnt +8)>maxWidth?(a.measureText(this.alarm).width/rowCnt +8):maxWidth);
                        var e = a.measureText("点").width ,
                            f = this.width / 2 - d / 2,
                            g = (-this.height / 2 - e*rowCnt ) -2;
                        e=(e)*rowCnt+60;
                        //绘制alarm的边框
                        a.strokeStyle = "rgba(" + b + ", " + c + ")",
                            a.fillStyle = "rgba(" + b + ", " + c + ")",
                            a.lineCap = "round",
                            a.borderRadius = 10,
                            a.lineTo(f + d / 2 + 8, g),
                            a.lineTo(f + d / 2, g- 8),
                            a.lineTo(f + d / 2 - 6, g),
                            a.moveTo(f, g),
                            a.lineTo(f + d, g),
                            a.lineTo(f + d, g + e),
                            a.lineTo(f, g + e),
                            a.lineTo(f, g),
                            a.fill(),
                            a.stroke(),
                            a.closePath(),
                            a.beginPath(),
                            a.strokeStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")",
                            a.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")",
                            (function(a,b,x,y,textArray){
                                for(var j= 0;j<textArray.length;j++){
                                    var words = textArray[j];
                                    a.fillText(words,x,y);
                                    y+= lineHeight;
                                }
                            })(a,this,f+20,g+28,textArray),
                            a.closePath()
                    }
                };
                node.height = 80;
                return node;
            },
            /**
             * TipNode生成箭头向上tip节点
             * @param text
             * @param fontSize
             * @param backgroudColor
             * @param fontColor
             * @param borderWidth
             * @param tipAlpha
             */
            TipNodeUpward: function (text,fontSize,fontColor,backgroudColor,borderWidth,tipAlpha) {
                var node = new JTopo.Node();
                node.setSize(0,0);
                node.fontColor = fontColor;
                node.alarm=text;
                node.paintAlarmText = function(a) {
                    if (null != this.alarm && "" != this.alarm) {
                        var b = this.alarmColor || backgroudColor,
                            c = this.alarmAlpha || tipAlpha;
                        a.beginPath();
                        a.font = this.alarmFont || fontSize;
                        var textArray = drawJtopo.stringStr(this.alarm);
                        var rowCnt = textArray.length;
                        var maxLength = 0,maxText = textArray[0];
                        for(var i=0;i<textArray.length;i++){
                            var nowText = textArray[i],textLength = nowText.length;
                            if(textLength >=maxLength){
                                maxLength = textLength;
                                maxText = nowText;
                            }
                        }
                        var maxWidth = a.measureText(maxText).width+40;//右边间距
                        var lineHeight = a.measureText("节").width+6;
                        //算出alarm的最大的宽度
                        var d =((a.measureText(this.alarm).width/rowCnt +8)>maxWidth?(a.measureText(this.alarm).width/rowCnt +8):maxWidth);
                        var e = a.measureText("点").width ,
                            f = this.width / 2 - d / 2,
                            g = (-this.height / 2 - e*rowCnt ) -2;
                        e=(e)*rowCnt+60;//改底部间距
                        //绘制alarm的边框
                        a.strokeStyle = "rgba(" + b + ", " + c + ")",
                            a.fillStyle = "rgba(" + b + ", " + c + ")",
                            a.lineCap = "round",
                            a.borderRadius = 10,
                            a.moveTo(f, g),
                            a.lineTo(f + d, g),
                            a.lineTo(f + d, g + e),
                            a.lineTo(f + d / 2 + 8, g + e),
                            a.lineTo(f + d / 2, g + e + 8),
                            a.lineTo(f + d / 2 - 6, g + e),
                            a.lineTo(f, g + e),
                            a.lineTo(f, g),
                            a.fill(),
                            a.stroke(),
                            a.closePath(),
                            a.beginPath(),
                            a.strokeStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")",
                            a.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")",
                            (function(a,b,x,y,textArray){
                                for(var j= 0;j<textArray.length;j++){
                                    var words = textArray[j];
                                    a.fillText(words,x,y);
                                    y+= lineHeight;
                                }
                            })(a,this,f+20,g+28,textArray),//改顶部间距 （f+14改左边间距）
                            a.closePath()
                    }
                };
                return node;
            },
            /**
             * 对tip的内容按字数进行分割
             * @param str
             */
            stringStr: function (str) {
                var arr = str.split(";");
                arr.splice(6,1);
                return arr;
            },
            /**
             * 获取所有的node节点
             * @param scene
             */
            getAllElement: function (scene) {
                var nodes = scene.childs;
                var ems = [];
                for(var i=0;i<nodes.length;i++){
                    var ele = nodes[i];
                    if(ele.elementType == "imgNode"){
                        ems.push(ele);
                    }
                }
                return ems;
            },
            /**
             * 当前节点imgNode的位置
             * @param e
             */
            locationDrag: function (e) {
                e.mousedown(function () {
                    var curNode = $(this)[0];
                    var location =  curNode.getBound();
                    var leftlocation = location.left;
                    var toplocation = location.top;
                    curNode.mousedrag(function () {
                        var location =  e.getBound();
                        var dragleft = location.left;
                        var dragtop = location.top;
                        if(leftlocation!==dragleft){
                            this.setLocation(leftlocation,dragtop);
                        }
                    });
                });
            },
            /**
             * 根据告警数，返回相应的颜色
             * @param criticalCount
             * @param warmCount
             * @param groupStatus
             */
            getColor : function(criticalCount, warmCount,groupStatus){
                var color = '';
                if( criticalCount > 0 ){
                    color = '255,63,63';
                } else {
                    if( warmCount > 0 ){
                        color = '255,255,0';
                    } else {
                        if(groupStatus == 0){
                            color = '219,230,248';
                        }
                        if(groupStatus == 1){
                            color = '78,247,255';
                        }
                        if(groupStatus == 2){
                            color = '36,97,193';
                        }
                        if(groupStatus == 3){
                            color = '255,63,63';
                        }
                    }
                }
                return color.toString();
            },
            /**
             * 根据状态，返回相应的状态
             * @param n
             */
            getStatus : function(n){
                var img = '';
                switch (n){
                    case 0:
                        img = 'Waiting_w.png';
                        break;
                    case 1:
                        img = 'Sandclock_Hvr.png';
                        break;
                    case 2:
                        img = 'Finished_Dft.png';
                        break;
                    case 3:
                        img = 'Sandclock_Hvr.png';
                        break;
                    case 4:
                        img = '';
                        break;
                }
                return img.toString();
            },
            /**
             *
             *  新增页面元素
             *
             */
            addScreen: function () {
                //alert($("#screenClose").text());
                //$("#screenClose").hide();
                $("#wbkHtml").find("#screenClose").hide();
                $(".runbat_screen_close").show();
                //$("#wbkHtml").addClass('bakColor');
                //$("#norMal").css({"display":"none"});
            },
            /**
             *
             *  根据路径跳转到新的iframe
             *
             */
            firstLoadPages: function (hostUrl,arr_url) {
                //var  url = hostUrl+arr_url;
                var wid = window.screen.availWidth;
                var heg = window.screen.height;
                var iframes = $('<iframe id="iframe_" src="'+arr_url +'" scrolling="no" frameborder="no" border="0" target="self"></iframe>');
                iframes.css({
                    width : wid,
                    height:heg
                });
                $('#runbatIframe').append(iframes);
                //window.location.reload();
            },
            /**
             *
             *  绑定事件
             *
             */
            bindEvent: function (o) {
                var actDom = o.find('[runbat-screen-click]');
                actDom.tooltip("destroy").tooltip();
                actDom.unbind('click');
                actDom.on('click', (function (_this) {
                    return function (e) {
                        var at, t;
                        e.preventDefault();
                        t = $(e.target).closest('[runbat-screen-click]');
                        at = t.attr('runbat-screen-click').split('|');
                        if ('undefined' != typeof (_this[at[0]])) {
                            return _this[at[0]](e, at, o);
                        } else {
                            console.log("none");
                        }
                    };
                })(this));
            }
        };
    module.exports = drawJtopo;
})();
