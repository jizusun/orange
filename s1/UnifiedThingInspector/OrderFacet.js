var oOrderSearchField = new sap.m.SearchField({
	placeholder: "输入订单号",
	search: function(event){
		var str = event.getParameter("query");
		if('' == str){
			oOrderInfoContainer.setVisible(false);
		}
		else if(str == parseInt(str)){
			oOrderNumber.setText(str);
			var index = Math.floor((Math.random() * 10))%3;
			oOrderStatus.setText(orderInfoData[index].status);
			oOrderCurPlace.setText(orderInfoData[index].place);
			oOrderPreDeliverDate.setText(orderInfoData[index].date);
			
			oOrderInfoContainer.setVisible(true);
		}
		else{
			sap.m.MessageToast.show("请输入正确的订单编号");
		}
	}
}).addStyleClass("sapUtiSearchFieldPadding");

var oOrderNumber = new sap.m.Text();
var oOrderStatus = new sap.m.Text();
var oOrderCurPlace = new sap.m.Text();
var oOrderPreDeliverDate = new sap.m.Text();
var orderInfoData = [{status: "未发货", place: "广州仓库", date: "2014-12-24"},
                     {status: "已发货", place: "北京中转站", date: "2014-12-12"},
					 {status: "已签收", place: "上海闸北区", date: "2014-08-08"}];

var oOrderInfo = new sap.ui.layout.Grid("grid_order_info_summary", {
    defaultSpan: "L6 M6 S6",
    vSpacing: 0.5,
    //position: "Center",
    content: [
              new sap.m.HBox({
                  items: [
                      new sap.m.Label({text: "订单号: "}),
                      oOrderNumber
                  ]
              }),
              new sap.m.HBox({
                  items: [
                      new sap.m.Label({text: "状态: "}),
                      oOrderStatus
                  ]
              }),
              new sap.m.HBox({
                  items: [
                      new sap.m.Label({text: "目前所在地: "}),
                      oOrderCurPlace
                  ],
                  //layoutData: new sap.ui.layout.GridData({visibleOnSmall: false})
              }),
              new sap.m.HBox({
                  items: [
                      new sap.m.Label({text: "预计到达时间: "}),
                      oOrderPreDeliverDate
                  ],
                  //layoutData: new sap.ui.layout.GridData({visibleOnSmall: false})
              })
              ]
}).addStyleClass("sapUtiFacetOverviewContentMargin");

if (isPhone) {
	oOrderInfo.setDefaultSpan("L12 M12 S12");
}

var oOrderInfoContainer = new sap.m.VBox({
	//justifyContent: sap.m.FlexJustifyContent.Center, 
	//alignItems: sap.m.FlexAlignItems.Center,
	visible: false,
	items: [oOrderInfo]
});

var oOrderSearch = new sap.m.VBox({
	items: [ 
	         oOrderSearchField,
	         oOrderInfoContainer
	       ]
});

/*sap.suite.ui.commons.FacetOverview.extend("sap.suite.ui.commons.FacetOverviewXc", {
		onclick: function(){},
		onkeydown: function(){},
		
		renderer: "sap.suite.ui.commons.FacetOverviewRenderer"
});*/

var oOrderFacet = new sap.suite.ui.commons.FacetOverview("facet_order", {
	title : "订单查询",
	heightType : isPhone ? "Auto" : "M",
	content: oOrderSearch,
	/*press: function(event) {
        //setFacetContent("order");
		oOrderSearchField.focus();
		//var oo = document.getElementById("__field0-I");
		/*document.getElementById("__field0-I").focus();
		document.getElementById("__field0-I").select();*/
   // }
}).attachBrowserEvent("onselect", function(event){
	/*event.preventDefault();
	var oo = document.getElementById("__field0-I");
	document.getElementById("__field0-I").focus();
	document.getElementById("__field0-I").select();*/
	oOrderSearchField.focus();
});

oOrderFacet.attachBrowserEvent("onclick", function(event){ oOrderSearchField.focus(); });
oOrderFacet.attachBrowserEvent("onfocus", function(event){ oOrderSearchField.focus(); });
oOrderFacet.attachBrowserEvent("onkeydown", function(event){ oOrderSearchField.focus(); });

/*var oOrderFacetGroup = new sap.suite.ui.commons.UnifiedThingGroup("group_order", {
    title: "订单查询",
    //description: "",
    //content: oSalesQuotationGrid,
    design: sap.suite.ui.commons.ThingGroupDesign.ZeroIndent
});*/
