jQuery.sap.require("sap.ui.core.format.DateFormat");

var oFeedListItem1 = new sap.m.FeedListItem({
	sender: "{/Author}",
	icon: "{/AuthorPicUrl}",
	//senderPress: onSenderPress,
	//iconPress: onIconPress,
	iconDensityAware: false,
	info: "{/Type}",
	timestamp: "{/Date}",
	text: "{/Text}",
}).addDelegate({
	onAfterRendering: function(event){
		var oItem = event.srcControl.getDomRef();
		oItem.firstChild.firstChild.style.paddingTop = isPhone ? "0rem":"0.5rem";
    	oItem.firstChild.firstChild.style.paddingBottom = isPhone ? "0.3rem":"0.5rem";
	}
});

var oFeedListItem2 = new sap.m.FeedListItem({
	sender: "{/Author}",
	icon: "{/AuthorPicUrl}",
	//senderPress: onSenderPress,
	//iconPress: onIconPress,
	iconDensityAware: false,
	info: "{/Type}",
	timestamp: "{/Date}",
	text: "{/Text}",
}).addDelegate({
	onAfterRendering: function(event){
		var oItem = event.srcControl.getDomRef();
		oItem.firstChild.firstChild.style.paddingTop = isPhone ? "0rem":"1rem";
		oItem.firstChild.firstChild.style.paddingBottom = isPhone ? "0rem":"0.5rem";
	}
});

var oListComplaintsFacet = new sap.m.List({
	showSeparators: isPhone ? "None":"Inner",
	backgroundDesign: sap.m.BackgroundDesign.Transparent,
	items: [ oFeedListItem1, oFeedListItem2 ]
});

var oComplaintsFacet = new sap.suite.ui.commons.FacetOverview("facet_complaints", {
    title: "意见箱",
    heightType: isPhone ? "Auto" : "L",
    content: oListComplaintsFacet,
    press: function() {
    	setFacetContent("complaints");
    }    		
});

/**
 * Complaints Facet Group 
 **/
var complaintsListData = [
	{
		Author : "亚历山大 琼斯",
		AuthorPicUrl : "images/persons/person_03.png",
		Type : "回复",
		Date : "2018年6月15日 上午9:02:17",
		Text : "尊敬的客户您好，感谢您对我们新产品的支持。蓝莓富含花青素，多吃多健康哦。"
	},
	{
		Author : "乔治 史密斯",
		AuthorPicUrl : "images/persons/person_01.png",
		Type : "客户留言",
		Date : "2018年6月15日 上午8:50:23",
		Text : "第一次买了蓝莓，还不错，东西很新鲜，物流也很快。"
	},
	{
		Author : "亚历山大 琼斯",
		AuthorPicUrl : "images/persons/person_03.png",
		Type : "回复",
		Date : "2018年5月19日 下午5:33:50",
		Text : "尊敬的客户您好，感谢您对我们商品和公司的支持。您的宝贵意见，我们会尽快反映给有关部门，我们也在不断努力做的更好。期待您一如既往的支持。"
	},
	{
		Author : "乔治 史密斯",
		AuthorPicUrl : "images/persons/person_01.png",
		Type : "客户留言",
		Date : "2018年5月19日 下午5:30:40",
		Text : "上个月进了十箱脐橙，卖的不错。橙子很甜，还特意留了一些给家人吃。贵公司的水果确实很新鲜，很好。希望能多增加一些水果品种。"
	}
];

var oComplaintModel1 = new sap.ui.model.json.JSONModel(complaintsListData[0]);
oFeedListItem1.setModel(oComplaintModel1);
var oComplaintModel2 = new sap.ui.model.json.JSONModel(complaintsListData[1]);
oFeedListItem2.setModel(oComplaintModel2);
var oComplaintsListModel = new sap.ui.model.json.JSONModel({ complaintCollection: complaintsListData });

var oFeedInputComplaint = new sap.m.FeedInput({
	icon: "images/persons/person_02.png",
	placeholder: "输入您的建议，投诉意见...",
	post: function(oEvent){
		var oFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({style: "medium"});
	    var oDate = new Date();
	    var sDate = oFormat.format(oDate);
	    // create new entry
	    var sValue = oEvent.getParameter("value");
	    var oEntry = {
	    	Author : "莎拉 康纳斯",
	    	AuthorPicUrl : "images/persons/person_02.png",
	    	Type : "客户留言",
	    	Date : "" + sDate,
	    	Text : sValue
	    };

	    // update model
	    var aEntries = oComplaintsListModel.getData().complaintCollection;
	    aEntries.unshift(oEntry);
	    oComplaintsListModel.setData({
	    	complaintCollection: aEntries
	    });
	    oComplaintModel1.setData(aEntries[0]);
	    oComplaintModel2.setData(aEntries[1]);
	}
}).addStyleClass("sapUiExploredFeedMargin");

var oListComplaints = new sap.m.List({
	showSeparators: "Inner",
	//backgroundDesign: sap.m.BackgroundDesign.Transparent,
	items: {
		path: "complaint>/complaintCollection",
		template: new sap.m.FeedListItem({
			sender: "{complaint>Author}",
			icon: "{complaint>AuthorPicUrl}",
			//senderPress: onSenderPress,
			//iconPress: onIconPress,
			iconDensityAware: false,
			info: "{complaint>Type}",
			timestamp: "{complaint>Date}",
			text: "{complaint>Text}",
		})
	}
});

oListComplaints.setModel(oComplaintsListModel, "complaint");

var oComplaintsFacetGroupContent = new sap.ui.layout.VerticalLayout({
	width: "100%",
	content: [ oFeedInputComplaint, oListComplaints ]
});

var oComplaintsFacetGroup = new sap.suite.ui.commons.UnifiedThingGroup("group_complaints", {
    title: "意见箱",
    //description: "",
    content: oComplaintsFacetGroupContent,
    design: sap.suite.ui.commons.ThingGroupDesign.ZeroIndent
});