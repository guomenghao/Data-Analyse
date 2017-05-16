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
                        <img src="logo.png" alt="">
                    </div>
                    <div class="topLM fontBg">
                        四川舆情
                    </div>
                    <div class="topLB">
                        <div class="tabTitle">
                            <i></i>
                            <span data-indx='0'>全部</span>
                            <span data-indx='1' data-type='china'>党政动态</span>
                            <span data-indx='2'>社会主义</span>
                            <span data-indx='3' data-type='china'>宣传动态</span>
                            <span data-indx='4'>城市建设</span>
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
                        四川舆情热点
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
                            <li><i>1</i>wq</li>
                            <li><i>2</i>wq</li>
                            <li><i>3</i>ww</li>
                            <li><i>4</i>sad</li>
                            <li><i>5</i>dsad</li>
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