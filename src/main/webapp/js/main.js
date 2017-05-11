
            function createEl(){
                var titleEl=document.createElement('div');
                titleEl.className='fontBg';
                titleEl.innerText="四川新闻";
                return titleEl;

            }
            function getStyle(obj,attr){
                if(obj.currentStyle){
                    return obj.currentStyle[attr];
                }else{
                    // console.log(getComputedStyle(obj,false)[attr]);
                    return getComputedStyle(obj,false)[attr];
                }
            }
            // function onBlur(ob) {
            // if(!ob.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))ob.value=ob.o_value;else{if(ob.value.match(/^\.\d+$/))ob.value=0+ob.value;if(ob.value.match(/^\.$/))ob.value=0;ob.o_value=ob.value};
            // }
            function startMove1(obj,json,fn){
                clearInterval(obj.timer);
                obj.timer=setInterval(function(){
                    var bStop=true;

                    for(var attr in json){
                        var iCur=0;
                        if(attr=='opacity'){
                            iCur=parseInt(parseFloat(getStyle(obj,attr))*100);
                        }else{
                            iCur=parseInt(getStyle(obj,attr));
                        }
                        var iSpeed=(json[attr]-iCur)/4;
                        iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
                        if(iCur!=json[attr]){
                            bStop=false;
                        }
                        if(attr=='opacity'){
                                obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                                obj.style.opacity=(iCur+iSpeed)/100;
                            }else{
                                obj.style[attr]=iCur+iSpeed+'px';
                            }
                    }
                    if(bStop){
                        clearInterval(obj.timer);
                        if(fn){
                            fn();
                        }
                        
                    }
                    },30)
                }
                var io=true;
                var tabTitle=document.getElementsByClassName('tabTitle')[0];
                var tabTitleSpan=document.getElementsByClassName('tabTitle')[0].getElementsByTagName('span');
                var tabTitleBg=document.getElementsByClassName('tabTitle')[0].getElementsByTagName('i')[0];
                var bottom2=document.getElementsByClassName('bottom2')[0];
                var bottom2P=document.getElementsByClassName('bottom2')[0].getElementsByTagName('p');
                var bottom2Bg=document.getElementsByClassName('bottom2')[0].getElementsByTagName('i')[0];


                var tabContent=document.getElementsByClassName('tabContent')[0];
                var topM=document.getElementsByClassName('topM')[0];
                var topRT=document.getElementsByClassName('topRT')[0];
                var topRB=document.getElementsByClassName('topRB')[0];
                var bottom1=document.getElementsByClassName('bottom1')[0];
                var bottom3=document.getElementsByClassName('bottom3')[0];
                var bottom4=document.getElementsByClassName('bottom4')[0];
                var bottom2Content=document.getElementsByClassName('bottom2Content')[0];

                 var tab = echarts.init(tabContent);
                 var chinaMap = echarts.init(topM);
                 var axis = echarts.init(topRT);
                 var worldcloud = echarts.init(topRB);
                 var barX = echarts.init(bottom1);
                 var barY = echarts.init(bottom3);
                 var b4Li=bottom4.getElementsByTagName('li');
                 var b4Ul=bottom4.getElementsByTagName('ul')[0];
                 for(var i=0;i<b4Li.length;i++){
                    b4Li[i].style.width=Math.floor(bottom4.offsetWidth/3)-10+'px';
                    b4Li[i].style.marginLeft=Math.floor((bottom4.offsetWidth/3)*0.08)+'px';
                    b4Li[i].style.opacity='1';

                 }
                for(var i=0;i<tabTitleSpan.length;i++){
                    tabTitleSpan[i].onclick=function(){
                        // chinaMap.clear();
                        tab.clear();
                        axis.clear();
                        worldcloud.clear();
                        barX.clear();
                        barY.clear();
                        var a=1;
                        var Arr = ["1","2","3","4"];  
                        var n = Math.floor(Math.random() * Arr.length + 1)-1;  
                        if(io){
                            a=-1;
                        }else{
                            a=1;
                        }
                        startMove1(bottom2Bg,{top:Math.ceil(20*n)},function(){
                           
                            tab.setOption(tabOption);
                        });
                        startMove1(bottom2Content,{opacity:0},function(){
                            bottom2Content.style.opacity='1';
                        });
                        startMove1(b4Ul,{left:b4Ul.offsetLeft+(a*(Math.floor(bottom4.offsetWidth/3)-8+Math.floor((bottom4.offsetWidth/3)*0.08)))},function(){
                            if(io){
                                io=false;
                            }else{
                                io=true;
                            }
                        });
                        startMove1(tabTitleBg,{left:Math.ceil((this.offsetWidth+6)*(this.getAttribute('data-indx')))},function(){
                            tabOption.series[0].data[0].value+=10;
                            tabOption.series[0].data[1].value+=20;
                            tabOption.series[1].data[0].value+=10;
                            tabOption.series[1].data[1].value+=20;
                            // mapOption.series[0].data=convertData(data1);
                            tab.setOption(tabOption);
                            // chinaMap.setOption(mapOption);
                            axis.setOption(axisOption);
                            worldcloud.setOption(wordCloudOption);
                            barX.setOption(barXOption);
                            barY.setOption(barYOption);
                                
                        });
                    }
                }
                for(var i=0;i<bottom2P.length;i++){
                    bottom2P[i].onclick=function(){
                        startMove1(bottom2Bg,{top:Math.ceil(20*(this.getAttribute('data-index')))},function(){
                           
                            tab.setOption(tabOption);
                        });
                    }
                }
                // app.title = '环形图';

                tabOption = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: [{
                                            orient: 'vertical',
                                            x: 'left',
                                            y:'bottom',
                                            data:['直接访问','邮件营销','联盟广告','视频广告'],
                                            textStyle:{
                                                color:"#fff",
                                                fontSize:'6'
                    
                                            },
                                            itemHeight:5,
                                            itemWidth:5,
                                            itemGap:7
                                        }],
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['40%', '50%'],
                            center:['40%','50%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '8',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'}
                            ]
                        },
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['40%', '50%'],
                            center:['75%','50%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '10',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'}
                            ]
                        }
                    ]
                };
               
                
function createRandomItemStyle() {
    return {
        normal: {
            color: 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
            ].join(',') + ')'
        }
    };
}

var convertData = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value)
                            });
                        }
                    }
                    return res;
                };
    // chinaMap.showLoading();
    chinaMap.setOption(option = {
        title: {
            text: 'NPM Dependencies'
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
            {
                type: 'graph',
                layout: 'none',
                // progressiveThreshold: 700,
                // itemStyle:{
                    
                // },
                width:"80%",
                // height:'80%',
                data: data.nodes.map(function (node) {
                    return {
                        x: node.x,
                        y: node.y,
                        id: node.id,
                        name: node.label,
                        symbolSize: node.size,
                        itemStyle: {
                            normal: {

                                color: node.color,
                                shadowColor:node.color,
                                shadowBlur: 20
                                // borderColor:node.color
                                // borderWidth :'1'
                            },
                            emphasis:{
                                color:node.color
                            }
                        }
                    };
                }),
                edges: data.edges.map(function (edge) {
                    return {
                        source: edge.sourceID,
                        target: edge.targetID
                    };
                }),
                
                label: {
                    emphasis: {
                        position: 'right',
                        show: true
                    }
                },
                roam: true,
                focusNodeAdjacency: true,
                lineStyle: {
                    normal: {
                        width: 0.4,
                        curveness: 0.3,
                        opacity:.7,
                        color:'#0afed2'
                    }
                }
            }
        ]
    }, true);
// mapOption = {
//                     tooltip: {
//                         trigger: 'item',
//                         formatter: '{b}'
//                     },
//                     aspectScale:1,
//                     layoutCenter: ['50%', '50%'],
//                      layoutSize: 650,
//                     geo: {
//                         map: 'china',
//                         label: {
//                             emphasis: {
//                                 show: false
//                             }
//                         },
//                         roam: true,
//                         itemStyle: {
//                             normal: {
//                                 areaColor: '#333',
//                                 borderColor: '#0afed2',
//                                 borderWidth:".2"
//                             },
//                             emphasis: {
//                                 areaColor: '#2a333d'
//                             }
//                         }
//                     },
//                     series: [
//                         {
//                             name: '中国',
//                             type: 'scatter',
//                             mapType: 'china',
//                             selectedMode : 'multiple',
//                             coordinateSystem: 'geo',
//                             data: convertData(data),
//                             symbolSize: function (val) {
//                                 return val[2] / 10;
//                             },
//                             label: {
//                                 normal: {
//                                     show: false
//                                 },
//                                 emphasis: {
//                                     show: false
//                                 }
//                             },
//                             itemStyle: {
//                                 normal: {
//                                     color: 'red'
//                                 }
//                             }
//                         },{
//                             name: 'Top 5',
//                             type: 'effectScatter',
//                             coordinateSystem: 'geo',
//                             data: convertData(data.sort(function (a, b) {
//                                 return b.value - a.value;
//                             }).slice(0, 6)),
//                             symbolSize: function (val) {
//                                 return val[2] / 30;
//                             },
//                             showEffectOn: 'render',
//                             rippleEffect: {
//                                 brushType: 'fill',
//                                 scale:10,
//                                 period:4
//                             },
//                             hoverAnimation: true,
//                             label: {
//                                 normal: {
//                                     formatter: '{b}',
//                                     position: 'right',
//                                     show: true
//                                 }
//                             },
//                             itemStyle: {
//                                 normal: {
//                                     color: 'red',
//                                     shadowBlur: 10,
//                                     shadowColor: '#333'
//                                 }
//                             },
//                             zlevel: 1
//                         }
//                     ]
//                 };
                axisOption = {
                    // title: {
                    //     text: '未来一周气温变化',
                    //     subtext: '纯属虚构'
                    // },
                    tooltip: {
                        trigger: 'axis'
                    },
                    // legend: {
                    //     data:['最高气温','最低气温']
                    // },
                    toolbox: {
                        show: false,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一','周二','周三','周四','周五','周六','周日'],
                        // axisLine:{
                        //     lineStyle:{
                        //         color:"#fff"
                        //     }
                        // },
                        axisLabel :{
                            textStyle:{
                                color:"#fff"
                            }
                        },
                        splitLine:{
                            show:false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} °C'
                        },
                        axisLabel :{
                            textStyle:{
                                color:"#fff"
                            }
                        },
                        // axisLine:{
                        //     lineStyle:{
                        //         color:"#fff"
                        //     }
                        // },
                        splitLine:{
                            show:false
                        }
                    },
                    series: [
                        {
                            name:'最高气温',
                            type:'line',
                            data:[2, 5, 7, 13, 8, 4, 1],
                            smooth:true,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            itemStyle : {  
                                normal : {  
                                    lineStyle:{  
                                        color:'#03cda8'  
                                    }  
                                }  
                            }, 
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },

                        
                    ]
                };
                
wordCloudOption = {
    // title: {
    //     text: 'Google Trends',
    //     link: 'http://www.google.com/trends/hottrends'
    // },
    tooltip: {
        show: true
    },
    series: [{
        name: 'Google Trends',
        type: 'wordCloud',
        size: ['80%', '80%'],
        textRotation : [0, 45, 90, -45],
        textPadding: 0,
        autoSize: {
            enable: true,
            minSize: 14
        },
        data: [
            {
                name: "Sam S Club",
                value: 10000,
                itemStyle: {
                    normal: {
                        color: 'black'
                    }
                }
            },
            {
                name: "Macys",
                value: 6181,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Amy Schumer",
                value: 4386,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Jurassic World",
                value: 4055,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Charter Communications",
                value: 2467,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Chick Fil A",
                value: 2244,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Planet Fitness",
                value: 1898,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Pitch Perfect",
                value: 1484,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Express",
                value: 1112,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Home",
                value: 965,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Johnny Depp",
                value: 847,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Lena Dunham",
                value: 582,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Lewis Hamilton",
                value: 555,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "KXAN",
                value: 550,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Mary Ellen Mark",
                value: 462,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Farrah Abraham",
                value: 366,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Rita Ora",
                value: 360,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Serena Williams",
                value: 282,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "NCAA baseball tournament",
                value: 273,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "Point Break",
                value: 265,
                itemStyle: createRandomItemStyle()
            }
        ]
    }]
};

                barXOption = {
                    // title: {
                    //     text: '世界人口总量',
                    //     subtext: '数据来自网络'
                    // },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    // legend: {
                    //     data: [ '2012年']
                    // },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 1],
                        splitLine:{
                            show:false
                        },
                        axisLabel :{
                            textStyle:{
                                color:"#fff",
                                fontSize:6
                            }
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: ['巴西','印尼','美国','印度','中国','世界人口(万)'],
                        splitLine:{
                            show:false
                        },
                        axisLabel :{
                            textStyle:{
                                color:"#fff",
                                fontSize:6
                            }
                        }
                    },
                    series: [
                        
                        {
                            name: '2012年',
                            type: 'bar',
                            data: [12, 21, 21, 3, 32, 44],
                            itemStyle:{
                                normal:{
                                    color:"#03fed1",
                                    fontSize:6
                                }
                            },
                            barWidth:6
                        }
                    ]
                };
                barYOption = {
                    // title: {
                    //     text: '世界人口总量',
                    //     subtext: '数据来自网络'
                    // },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    // legend: {
                    //     data: [ '2012年']
                    // },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: ['巴西','印尼','美国','印度','中国','世界人口(万)'],
                        splitLine:{
                            show:false
                        },
                        axisLabel :{
                            textStyle:{
                                color:"#fff"
                            }
                        }
                    },
                    yAxis: {
                        boundaryGap: [0, 1],
                        type: 'value',
                        splitLine:{
                            show:false
                        },
                        axisLabel :{
                            textStyle:{
                                color:"#fff"
                            }
                        }
                    },
                    series: [
                        
                        {
                            name: '2012年',
                            type: 'bar',
                            data: [12, 21, 21, 3, 32, 44],
                            itemStyle:{
                                normal:{
                                    color:"#03fed1"
                                }
                            },
                            barWidth : 8,
                        }
                    ]
                };
                tab.setOption(tabOption);
                // chinaMap.setOption(mapOption);
                axis.setOption(axisOption);
                worldcloud.setOption(wordCloudOption);
                barX.setOption(barXOption);
                barY.setOption(barYOption);
                setTimeout(function(){
                    topM.appendChild(createEl());
                    topRT.appendChild(createEl());
                    bottom3.appendChild(createEl());
                    bottom1.appendChild(createEl());
                    topRB.appendChild(createEl());
                },500);
                // axisOption