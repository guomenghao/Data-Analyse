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
                            <li><i>1</i><a  style='color:#fff' href="https://www.sosobtc.com/article/21184.html">2017共识大会：数字货币的跌宕起伏</a></li>
                            <li><i>2</i><a style='color:#fff' href="https://www.sosobtc.com/article/21183.html">炒比特币的多数是年轻人？中国大妈更疯狂</a></li>
                            <li><i>3</i><a style='color:#fff' href="https://www.sosobtc.com/article/21182.html">比特币带全体加密货币一起飞，多数创下新高</a></li>
                            <li><i>4</i><a style='color:#fff' href="https://www.sosobtc.com/article/21181.html">比特币禁止不是好出路，排斥不如纳入监管</a></li>
                            <li><i>5</i><a style='color:#fff' href="https://www.sosobtc.com/article/21180.html">多方亢奋难平复 短期风险或加大</a></li>
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
                            <div class="b4T">人民网</div>
                            <p class="b4C">
                                贵阳·区块链体验交流中心即将开放 邀您走进区块链的世界
                            </p>
                        </li>
                        <li>
                            <div class="b4T">金十数据</div>
                            <p class="b4C">
                                “新债王”冈拉克：比特币暴涨100% 上证暴跌10%——这不是巧合 周二冈拉克发表推特称，过去2个月比特币上涨100%，同时上证暴跌了10%，这可能不是一个巧合。其实宏观来看，比特币之所以暴涨，与中国股市和楼市的行情有莫大关联。
                            </p>
                        </li>
                        <li>
                            <div class="b4T">财联社</div>
                            <p class="b4C">
                                财联社24日讯，据美国媒体报道，过去几个月花旗集团一直与纳斯达克集团合作，将花旗的支付服务链接到纳斯达克的区块链平台。目前合作尚处于初级阶段。内人士将花旗与纳斯达克的此番合作视为区块链在银行业发展的重要里程碑，两家公司都是区块链技术初创企业Chain的投资者。（中国证券报）
                            </p>
                        </li>
                        <li>
                            <div class="b4T">李笑来</div>
                            <p class="b4C">
                                云币网（yunbi.com）发布风险警示：由于近期区块链资产交易市场异常火爆，请您务必了解市场风险，谨慎参与。云币网将严格遵循《中华人民共和国反洗钱法》、《中华人民共和国中国人民银行法》、《中华人民共和国商业银行法》等相关法律法规，严格进行平台用户的身份验证，防范可能存在的金融风险。
                            </p>
                        </li>
                    </ul>
                </div>
            </div>      
        </div>
        
	<script type="text/javascript" src="${ctx}/js/main.js"></script>
        
    </body>  
</html>