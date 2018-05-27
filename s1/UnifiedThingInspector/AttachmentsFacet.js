jQuery.sap.require("sap.ui.core.format.DateFormat");
var oLocale = sap.ui.getCore().getConfiguration().getLocale();
var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({style: "short"}, oLocale);
var oListAttachments = new sap.m.List({
	items : [
		new sap.m.StandardListItem({
			title : "商品手册.pdf, 78KB",
			iconInset : false,
			icon : "sap-icon://pdf-attachment",
			info : oDateFormat.format(new Date()),
			type : sap.m.ListType.Active,
			press : function(oEvent) {

				if(isPhone || isTablet /*jQuery.device.is.tablet || jQuery.device.is.iphone || jQuery.device.is.phone*/) {
					window.open("images/manual_product.pdf", 'Download');
					oEvent.preventDefault();
					return;
				}
				
				var html1 = new sap.ui.core.HTML({
					content:
						"<object type='application/pdf' style='width:100%; height:100%; position: absolute;' data='images/manual_product.pdf?#scrollbar=1&toolbar=1&navpanes=1'>" +
						"</object>",
					preferDOM : false
				});

	        	var oPage = new sap.m.Page({
	        		title : "手册预览",
	        		showNavButton : true,
	        		content : [
						html1
	        		]
	        	});
	        	
	        	oUTI.navigateToPage(oPage, true);
	        	
			}
		}),
		new sap.m.StandardListItem({
			title : "加盟申请表.xlsx, 16KB",
			iconInset : false,
			icon : "sap-icon://excel-attachment",
			info : oDateFormat.format(new Date()),
			type : sap.m.ListType.Active,
			press : function(oEvent) {
				    window.open("images/join_apply.xlsx", 'Download');
					oEvent.preventDefault();
			}
		}),
	    new sap.m.StandardListItem({
			title : "供应商手册.docx, 15KB",
			iconInset : false,
			icon : "sap-icon://doc-attachment",
			info : oDateFormat.format(new Date()),
			type : sap.m.ListType.Active,
			press : function(oEvent) {
				window.open("images/manual_supplier.docx", 'Download');
					oEvent.preventDefault();
			}
		}),
	    new sap.m.StandardListItem({
			title : "果园图片.jpg, 39KB",
			iconInset : false,
			icon : "sap-icon://attachment-photo",
			info : oDateFormat.format(new Date()),
			type : sap.m.ListType.Active,
			press : function(oEvent) {
                var panel1 = new sap.m.Panel({
                    headerText: "我们的果园",
                    content: [
	                    new sap.m.Image({
	                    	width: "100%",
                            src: "images/fruit_ranch.jpg"
                        }),
                        new sap.m.Text({
                          text: "果园清新，无污染。让您吃上放心水果。"
                        })
                    ]
				});

	        	var oPage = new sap.m.Page({
	        		title : "图片预览",
	        		showNavButton : true,
	        		content : [
						panel1
	        		]
	        	});
	        	oUTI.navigateToPage(oPage, false);
			}
		})
	]
});

oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({style: "short"}, oLocale);
oDateFormat.format(new Date());

var oAttachmentContentFacet = new sap.ui.layout.Grid("attachment-grid", {
	defaultSpan: "L6 M6 S6"  //defaultSpan: "L6 M6 S12"
}).addStyleClass("sapUtiFacetOverviewContentMargin");

var genHBox = new sap.m.VBox({
    items: [
        new sap.m.Label({text:"商品手册.pdf"}),
        new sap.m.Text({text:oDateFormat.format(new Date())})
    ]
});
oAttachmentContentFacet.addContent(genHBox);

//if (!isPhone) {
    genHBox = new sap.m.VBox({
        items: [
            new sap.m.Label({text:"加盟申请表.xlsx"}),
            new sap.m.Text({text:oDateFormat.format(new Date())})
        ]
    });
    oAttachmentContentFacet.addContent(genHBox);
   
    genHBox = new sap.m.VBox({
        items: [
            new sap.m.Label({text:"供应商手册.docx"}),
            new sap.m.Text({text:oDateFormat.format(new Date())})
        ]
    });
    oAttachmentContentFacet.addContent(genHBox);
    
    genHBox = new sap.m.VBox({
        items: [
            new sap.m.Label({text:"果园图片.jpg"}),
            new sap.m.Text({text:oDateFormat.format(new Date())})
        ]
    });
     oAttachmentContentFacet.addContent(genHBox);
//}

var oAttachmentsFacetGroup = new sap.suite.ui.commons.UnifiedThingGroup("group_attacments", {
    title: "下载专区",
    //description: "",
    content: oListAttachments,
    design: sap.suite.ui.commons.ThingGroupDesign.ZeroIndent
});

var oAttachmentsFacet = new sap.suite.ui.commons.FacetOverview("facet_attachments", {
    title: "下载专区",
    quantity: 4,
    heightType: isPhone ? "Auto" : "M",
    content: oAttachmentContentFacet,
    press: function() {
    	setFacetContent("attachments");
    }
});