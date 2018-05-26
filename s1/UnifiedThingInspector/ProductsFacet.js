var oProductsContent = new sap.m.HBox("products-box", {
    justifyContent: "SpaceBetween",
    items: [
             new sap.m.Image({
                 src: "images/p_strawberry.jpg",
                 width: "64px",
                 height: "64px"
             }).addStyleClass("sapUtiTileImagePadding"),
             new sap.m.Image({
                 src: "images/p_blueberry.jpg",
                 width: "64px",
                 height: "64px"
             }).addStyleClass("sapUtiTileImagePadding"),
             new sap.m.Image({
                 src: "images/p_kiwiberry.jpg",
                 width: "64px",
                 height: "64px"
             }).addStyleClass("sapUtiTileImagePadding")
    ]
});

if (!isPhone) {
    oProductsContent.addItem(new sap.m.Image({
        src: "images/p_pitaya.jpg",
        width: "64px",
        height: "64px"
    }).addStyleClass("sapUtiTileImagePadding"));
    
    oProductsContent.addItem(new sap.m.Image({
        src: "images/p_grape.jpg",
        width: "64px",
        height: "64px"
    }).addStyleClass("sapUtiTileImagePadding"));
    
    /*oProductsContent.addItem(new sap.m.Image({
        src: "images/p_orange.jpg",
        width: "64px",
        height: "64px"
    }).addStyleClass("sapUtiTileImagePadding"));*/
}

var oProductsFacet = new sap.suite.ui.commons.FacetOverview("facet_products", {
    title: "全部商品",
    quantity: 9,
    content: oProductsContent,
    //heightType: "Auto",
    height: isPhone ? "8rem" : "9rem",
    press: function() {
        setFacetContent("products");
    }
});

/**
 * Products Facet Group
 * */
var productsListData = [ 
                        {
                        	picSrc: "images/p_strawberry.jpg",
                        	name: "草莓",
                        	spec: "5 KG/箱",
                        	origin: "中国台湾",
                        	stock: "有货"
                        },
                        {
                        	picSrc: "images/p_blueberry.jpg",
                        	name: "蓝莓",
                        	spec: "3 KG/篮",
                        	origin: "美国加州",
                        	stock: "有货"
                        },
                        {
                        	picSrc: "images/p_kiwiberry.jpg",
                        	name: "猕猴桃",
                        	spec: "20 个/箱",
                        	origin: "新西兰",
                        	stock: "有货"
                        },
                        {
                        	picSrc: "images/p_pitaya.jpg",
                        	name: "火龙果",
                        	spec: "12 个/箱",
                        	origin: "越南",
                        	stock: "有货"
                        },
                        {
                        	picSrc: "images/p_grape.jpg",
                        	name: "提子",
                        	spec: "8 KG/篮",
                        	origin: "中国新疆",
                        	stock: "有货"
                        },
                        {
                        	picSrc: "images/p_orange.jpg",
                        	name: "脐橙",
                        	spec: "40 个/箱",
                        	origin: "中国江西",
                        	stock: "有货"
                        },
                        {
                        	picSrc: "images/p_cherry.jpg",
                        	name: "樱桃",
                        	spec: "10 KG/篮",
                        	origin: "智利",
                        	stock: "有货"
                        },
                        {
                        	picSrc: "images/p_grape2.jpg",
                        	name: "葡萄",
                        	spec: "6 KG/篮",
                        	origin: "法国",
                        	stock: "有货"
                        },
                        {
                        	picSrc: "images/p_ananas.jpg",
                        	name: "菠萝",
                        	spec: "8 个/箱",
                        	origin: "泰国",
                        	stock: "有货"
                        },
                        ];

var oProductsListModel = new sap.ui.model.json.JSONModel({ products: productsListData });

var oProductsFacetGroupContent = new sap.m.List("list_products", {
    //backgroundDesign: sap.m.BackgroundDesign.Transparent,
    //showSeparators: sap.m.ListSeparators.Inner,
    threshold: 2,
    inset : false,
    showUnread : true,
    scrollToLoad : true,
    columns : [
        new sap.m.Column({
            hAlign: sap.ui.core.TextAlign.Begin,
            vAlign: sap.ui.core.VerticalAlign.Middle,
            header: new sap.m.Text({text: ""})
        }),
        new sap.m.Column({
        	hAlign: sap.ui.core.TextAlign.Begin,
            vAlign: sap.ui.core.VerticalAlign.Middle,
        	header: new sap.m.Text({text : "商品"})
        }),
        new sap.m.Column({
        	hAlign: sap.ui.core.TextAlign.Begin,
            vAlign: sap.ui.core.VerticalAlign.Middle,
        	header: new sap.m.Text({text : "规格"}),
        	minScreenWidth: "Tablet",
            demandPopin: true,
            popinDisplay: sap.m.PopinDisplay.Inline
        }),
        new sap.m.Column({
        	hAlign: sap.ui.core.TextAlign.Begin,
            vAlign: sap.ui.core.VerticalAlign.Middle,
        	width: "30%",
        	header: new sap.m.Text({text : "产地"}),
        	minScreenWidth: "Tablet",
            demandPopin: true,
            popinDisplay: sap.m.PopinDisplay.Inline
        }),
        new sap.m.Column({
        	hAlign: sap.ui.core.TextAlign.Begin,
            vAlign: sap.ui.core.VerticalAlign.Middle,
        	width: "30%",
        	header: new sap.m.Text({text : "库存"})
        })
    ],
    items: {
    	path: "product>/products",
    	template: 
            new sap.m.ColumnListItem({
            	cells: [
            	        new sap.m.Image({ src: "{product>picSrc}", width: "74px", height: "74px"}),
            	        new sap.m.Text({ text: "{product>name}" }),
            	        new sap.m.Text({ text: "{product>spec}" }),
            	        new sap.m.Text({ text: "{product>origin}" }),
            	        new sap.m.Text({ text: "{product>stock}" })
            	       ]
            })
    }
});
oProductsFacetGroupContent.setModel(oProductsListModel, "product");

var oProductsFacetGroup = new sap.suite.ui.commons.UnifiedThingGroup("group_products", {
    title: "全部商品",
    description: "",
    content: oProductsFacetGroupContent,
    design: sap.suite.ui.commons.ThingGroupDesign.ZeroIndent
});
