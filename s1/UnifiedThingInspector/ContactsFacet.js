var image1 = new sap.m.Image({
    src: "images/persons/img_contacts_01.png",
    width: "48px",
    height: "48px"
});
image1.addStyleClass("sapUtiContactsImage");
var image2 = new sap.m.Image({
    src: "images/persons/img_contacts_02.png",
    width: "48px",
    height: "48px"
});
image2.addStyleClass("sapUtiContactsImage");
var image3 = new sap.m.Image({
    src: "images/persons/img_contacts_03.png",
    width: "48px",
    height: "48px"
});
image3.addStyleClass("sapUtiContactsImage");
var image4 = new sap.m.Image({
    src: "images/persons/img_contacts_04.png",
    width: "48px",
    height: "48px"
});
image4.addStyleClass("sapUtiContactsImage");

var oContactsContent = new sap.ui.layout.Grid("form-contacts", {
    defaultSpan: "L6 M6 S6",
    content: [
        new sap.m.HBox({
            items: [
                image1,
                new sap.m.VBox({
                    items: [
                        new sap.m.Text({text: isPhone ? "梅根" : "梅根 米勒"}).addStyleClass("sapUtiTextName"),
                        new sap.m.Text({text: isPhone ? "首席执行" : "首席销售执行官"}).addStyleClass("sapUtiTextValue")
                    ]
                })
            ]
        }).addStyleClass("sapUtiContactsBox"),
        new sap.m.HBox({
            items: [
                image2,
                new sap.m.VBox({
                    items: [
                        new sap.m.Text({text: isPhone ? "皮特" : "皮特 麦克纳马拉"}).addStyleClass("sapUtiTextName"),
                        new sap.m.Text({text: "销售主管"}).addStyleClass("sapUtiTextValue")
                    ]
                })
            ]
        }).addStyleClass("sapUtiContactsBox"),
        new sap.m.HBox({
            items: [
                image3,
                new sap.m.VBox({
                    items: [
                        new sap.m.Text({text: isPhone ? "乔治" : "乔治 布鲁内克"}).addStyleClass("sapUtiTextName"),
                        new sap.m.Text({text: "销售代表"}).addStyleClass("sapUtiTextValue")
                    ]
                })
            ]
        }).addStyleClass("sapUtiContactsBox"),
        new sap.m.HBox({
            items: [
                image4,
                new sap.m.VBox({
                    items: [
                        new sap.m.Text({text: isPhone ? "莉莲" : "莉莲 欧文斯"}).addStyleClass("sapUtiTextName"),
                        new sap.m.Text({text: "销售代表"}).addStyleClass("sapUtiTextValue")
                    ]
                })
            ]
        }).addStyleClass("sapUtiContactsBox")    
    ]
}).addStyleClass("sapUtiContactsGrid");

/*if (isPhone) {
    oContactsContent.setDefaultSpan("L12 M12 S12");
}*/


var oContactsFacet = new sap.suite.ui.commons.FacetOverview("facet_contacts", {
    title: "销售团队",
    quantity: 5,
    content: oContactsContent,
    heightType : isPhone ? "Auto" : "L",
    press: function() {
        setFacetContent("contacts");
    }
});

/**
 * Facet Group
 * **/
var oContactsWithImagesData = {
	    navigation: [{
	        image: "images/persons/img_contacts_01.png",
	        name: "梅根 米勒",
	        title: "首席销售执行官",
	        phone: "+382832838238",
	        email: "megan.miller@xckj.com"
	    },
	    {
	        image: "images/persons/img_contacts_02.png",
	        name: "皮特 麦克纳马拉",
	        title: "销售主管",
	        phone: "1-800-1002030",
	        email: "peter.mcnamara@xckj.com"
	    },
	    {
	        image: "images/persons/img_contacts_03.png",
	        name: "乔治 布鲁内克",
	        title: "销售代表",
	        phone: "1(605)-1232-123-1",
	        email: "george.brunick@xckj.com"
	    },
	    {
	        image: "images/persons/img_contacts_04.png",
	        name: "莉莲 欧文斯",
	        title: "销售代表",
	        phone: "1(789)-1232-123-1",
	        email: "lilian.owens@xckj.com"
	    },
	    {
	        image: "images/persons/person_03.png",
	        name: "莎拉 康纳斯",
	        title: "销售代表",
	        phone: "1(789)-1232-123-1",
	        email: "sara.connors@xckj.com"
	    }]
	};

var oTemplateContactsWithImagesData = new sap.m.ColumnListItem({
    type: sap.m.Inactive,
    unread: false,
    cells: [
        new sap.m.Image({src: "{image}", width: "74px", height: "74px"}),
        new sap.m.Link({text: "{name}"}),
        new sap.m.Text({text: "{title}"}),
        new sap.m.Link({text: "{phone}"}),
        new sap.m.Link({text: "{email}"})
    ]
});

var oListContactsWithImagesForm = new sap.m.List({
    threshold: 2,
    inset : false,
    showUnread : true,
    scrollToLoad : true,
    columns : [
        new sap.m.Column({
            hAlign: sap.ui.core.TextAlign.Begin,
            header: new sap.m.Text({text: ""})
        }),
        new sap.m.Column({
        	hAlign : sap.ui.core.TextAlign.Begin,
        	header : new sap.m.Text({text : "姓名"})
        }), 
        new sap.m.Column({
            hAlign : sap.ui.core.TextAlign.Begin,
            header : new sap.m.Text({text : "职位"}),
            minScreenWidth : "Tablet",
            demandPopin : true,
            popinDisplay: sap.m.PopinDisplay.Inline
        }), 
        new sap.m.Column({
            hAlign : sap.ui.core.TextAlign.Begin,
            width : "30%",
            header : new sap.m.Text({text : "手机号码"}),
            minScreenWidth : "Tablet",
            demandPopin : true,
            popinDisplay: sap.m.PopinDisplay.Inline
        }),
        new sap.m.Column({
            hAlign : sap.ui.core.TextAlign.Begin,
            width : "30%",
            header : new sap.m.Text({text : "电子邮件"}),
            minScreenWidth : "Tablet",
            demandPopin : true,
            popinDisplay: sap.m.PopinDisplay.Inline
        })],
    items: {
        path : "/navigation",
        template : oTemplateContactsWithImagesData
    }
});

var oModelContactsWithImages = new sap.ui.model.json.JSONModel();
oModelContactsWithImages.setData(oContactsWithImagesData);
oListContactsWithImagesForm.setModel(oModelContactsWithImages);

var oContactsFacetGroup = new sap.suite.ui.commons.UnifiedThingGroup("group_contacts", {
    title: "销售团队",
    //description: "",
    content: oListContactsWithImagesForm,
    design: sap.suite.ui.commons.ThingGroupDesign.ZeroIndent
});
