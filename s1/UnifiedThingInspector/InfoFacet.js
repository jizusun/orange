var oInfoIcon = new sap.ui.core.Icon({
    src: "sap-icon://globe",
    //color: "#0ff800",
    size: isPhone ? "3rem" : "4rem",
    visible: !isPhone,
}).addStyleClass("sapUtiImagePaddingRight");

var oInfoGrid = new sap.m.VBox({
    items: [
        new sap.m.HBox({
        	width: "100%",
            items: [
                new sap.m.Label({text: "支付配送"}).addStyleClass("sapUtiSalesOrgKeyLabel"),
                new sap.m.Label({text: ":"}).addStyleClass("sapUtiSalesOrgDelimiter"),
                //new sap.m.Link({text: "支付方式"}).addStyleClass("xcLinkItemMargin"),
                new sap.m.Link({text: "支付方式"}).addStyleClass("xcLinkItemMargin"),
                new sap.m.Link({text: "配送说明"}).addStyleClass("xcLinkItemMargin"),
                new sap.m.Link({text: "使用优惠券"}),
            ]
        }),
        new sap.m.HBox({
        	width: "100%",
            items: [
                new sap.m.Label({text: "售后服务"}).addStyleClass("sapUtiSalesOrgKeyLabel"),
                new sap.m.Label({text: ":"}).addStyleClass("sapUtiSalesOrgDelimiter"),
                new sap.m.Link({text: "退换货"}).addStyleClass("xcLinkItemMargin"),
                new sap.m.Link({text: "常见问题"}).addStyleClass("xcLinkItemMargin"),
                new sap.m.Link({text: "投诉与建议"}),
                //new sap.m.Link({text: "积分到达时间"})
            ]
        }),
        new sap.m.HBox({
        	width: "100%",
            items: [
                new sap.m.Label({text: "关于我们"}).addStyleClass("sapUtiSalesOrgKeyLabel"),
                new sap.m.Label({text: ":"}).addStyleClass("sapUtiSalesOrgDelimiter"),
                new sap.m.Link({text: "联系我们"}).addStyleClass("xcLinkItemMargin"),
                new sap.m.Link({text: "线下门店"}).addStyleClass("xcLinkItemMargin"),
                //new sap.m.Link({text: "媒体报道"}).addStyleClass("xcLinkItemMargin"),
                new sap.m.Link({text: "业务合作"})
            ],
            //layoutData: new sap.ui.layout.GridData({visibleOnSmall: false})
        })
    ]
}).addStyleClass("sapUtiSalesOrgFacet");

var oInfoContent = null;
if(isPhone)
	oInfoContent = new sap.m.ScrollContainer({
		content: [ oInfoGrid ]
	});
else
	oInfoContent = oInfoGrid;

if (sap.ui.getCore().getConfiguration().getRTL()) {
	oInfoIcon.addStyleClass("sapUtiRtl");
	oInfoGrid.addStyleClass("sapUtiRtl");
}

var oInfoFacetContent = new sap.m.FlexBox({
    items:[
        oInfoIcon,
        oInfoContent
    ]
});

var oInfoFacet = new sap.suite.ui.commons.FacetOverview("facet_info", {
	title: "关于",
	content: oInfoFacetContent,
	heightType : isPhone ? "Auto" : "M"
});