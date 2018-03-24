var oNewsFacetContent = null;

if(!isPhone){
	var oHourAgo = new Date();
	oHourAgo.setHours(oHourAgo.getHours() - 1);
	var oArticleNews1 = new sap.suite.ui.commons.FeedItem({
		title: "清甜润燥的枇杷",
		image: "images/news1.jpg",
		//link: "http://",
		source: "十二月震撼上市", 
		publicationDate: oHourAgo		
	});	
	
	var oOneDaysAgo = new Date();
	oOneDaysAgo.setDate(oOneDaysAgo.getDate() - 1);
	var oArticleNews2 = new sap.suite.ui.commons.FeedItem({
		title: "酸甜适口、脆嫩多汁的草莓",
		image: "images/news2.jpg",
		//link: "http://",
		source: "浓浓的童年记忆", 
		publicationDate: oOneDaysAgo		
	});
	
	var oTwoDaysAgo = new Date();
	oTwoDaysAgo.setDate(oTwoDaysAgo.getDate() - 2);
	var oArticleNews3 = new sap.suite.ui.commons.FeedItem({
		title: "细腻甜脆、清香爽滑的蓝莓",
		image: "images/news3.jpg",
		//link: "http://",
		source: "富含花青素和食用纤维", 
		publicationDate: oTwoDaysAgo		
	});	

	var articles = new Array();
	articles.push(oArticleNews1);
	articles.push(oArticleNews2);
	articles.push(oArticleNews3);

	oNewsFacetContent = new sap.suite.ui.commons.FeedTile("feedtile_news", {
		items: articles,
		displayDuration: 3,
		/*press: function(event){
			event.getSource().rerender();
		}*/
	});
}
else{
	oNewsFacetContent = new sap.m.Carousel("carousel_news", {
		height: "8rem",
		loop: true,
		showPageIndicator: false,
		pages: [
		        new sap.m.Image({ src: "images/news1_small.jpg", width: "100%", height: "100%"}),
		        new sap.m.Image({ src: "images/news2_small.jpg", width: "100%", height: "100%"}),
		        new sap.m.Image({ src: "images/news3_small.jpg", width: "100%", height: "100%"})
		        ]
	}).addDelegate({
		onAfterRendering: function(event){
			setInterval(function(){
				oNewsFacetContent.next();
			}, 5000);
		}
	});
}

var oNewsFacet = new sap.suite.ui.commons.FacetOverview("facet_news", {
    title: "新鲜推荐",
    quantity: 3,
    content: oNewsFacetContent,
    //height: isPhone ? "8rem" : "10rem",
    heightType: isPhone ? "Auto" : "L",
    /*press: function() {
        setFacetContent("news");
    }*/
});

/**
 * Products Facet Group
 * */

/*var oNewsFacetGroup = new sap.suite.ui.commons.UnifiedThingGroup("group_news", {
    title: "News",
    description: "",
    content: oProductsFacetGroupContent,
    design: sap.suite.ui.commons.ThingGroupDesign.ZeroIndent
});*/