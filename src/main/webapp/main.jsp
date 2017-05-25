<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html lang="en">  
    <head>  
         <meta charset="UTF-8">  
        <title>演示页面</title>  
        <%@include file="common/common-nologin.jsp" %>
        <link rel="stylesheet" href="${ctx}/css/main.css">
        <script type="text/javascript" src="http://zeptojs.com/zepto.js"></script>
        <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/echarts-all-3.js"></script>
        <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/extension/dataTool.min.js"></script>
        <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/china.js"></script>
        <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/world.js"></script>
        <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ZUONbpqGBsYGXNIYHicvbAbM"></script>
        <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/extension/bmap.min.js"></script>
        <script type="text/javascript" src="${ctx}/js/worldcloud.js"></script>
        <script type="text/javascript" src="${ctx}/js/datajson.js"></script>
        
        
    </head>  
    <body>  
        <div class="content">
            <div class="top">
                <div class="topL">
                    <div class="topLT">
                        <!-- <img src="logo.png" alt=""> -->
                    </div>
                    <div class="topLM fontBg">
                        四川舆情
                    </div>
                    <div class="topLB">
                        <div class="tabTitle">
                            <i></i>
                            <span data-indx='0'>全部</span>
                            <span data-indx='1' data-type='china'>股市行情</span>
                            <span data-indx='2'>期货行情</span>
                            <span data-indx='3' data-type='china'>区块链</span>
                            <span data-indx='4'>数字币</span>
                        </div>
                        <div class="tabContent">
                            
                        </div>
                    </div>
                </div>
                <div class="topM">
                    
                </div>
                <div class="topR">
                    <div class="topRT"></div>
                    <div class="topRB"></div>
                </div>
            </div>      
            <div class="bottom">
                <div class="bottom1"></div>
                <div class="bottom2">
                    <div class=" fontBg">
                        全国舆情热点
                    </div>
                    <div class="point">
                        <i></i>
                        <p data-index=0></p>
                        <p data-index=1></p>
                        <p data-index=2></p>
                        <p data-index=3></p>
                    </div>
                    <div class="bottom2Content">
                        <ul>
                            <li><i>1</i><a href="https://www.sosobtc.com/article/21184.html">2017共识大会：数字货币的跌宕起伏</a></li>
                            <li><i>2</i><a href="https://www.sosobtc.com/article/21183.html">炒比特币的多数是年轻人？中国大妈更疯狂</a></li>
                            <li><i>3</i><a href="https://www.sosobtc.com/article/21182.html">比特币带全体加密货币一起飞，多数创下新高</a></li>
                            <li><i>4</i><a href="https://www.sosobtc.com/article/21181.html">比特币禁止不是好出路，排斥不如纳入监管</a></li>
                            <li><i>5</i><a href="https://www.sosobtc.com/article/21180.html">多方亢奋难平复 短期风险或加大</a></li>
                        </ul>
                    </div>  
                </div>
                <div class="bottom3"></div>
                <div class="bottom4">
                    <div class=" fontBg">
                        专家热评
                    </div>
                    <ul>
                        <li>
                            <div class="b4T"></div>
                            <p class="b4C">
                                dsadasdsadwadwaddsadasdsadwadwaddsadsadasdsadwadwaddsad
                            </p>
                        </li>
                        <li>
                            <div class="b4T"></div>
                            <p class="b4C">
                                dsadasdsadwadwaddsadasdsadwadwaddsadsadasdsadwadwaddsadasdsadwadwaddsad
                            </p>
                        </li>
                        <li>
                            <div class="b4T"></div>
                            <p class="b4C">
                                dsadasdsadwadwaddsadasdsadwadwaddsadsadasdsadwadwaddsadasdsadwadwaddsad
                            </p>
                        </li>
                        <li>
                            <div class="b4T"></div>
                            <p class="b4C">
                                dsadasdsadwadwaddsadasdsadwadwaddsadsadasdsadwadwaddsadasdsadwadwaddsad
                            </p>
                        </li>
                    </ul>
                </div>
            </div>      
        </div>
        
	<script type="text/javascript" src="${ctx}/js/main.js"></script>
        
    </body>  
</html>