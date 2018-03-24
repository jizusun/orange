var oIntroText = new sap.m.Text({
	maxLines: 2,
	text: "This is a longtext for the information. The information is very very very" + 
			" very very very  very very very very very very very very very very very very" +
			" very very very  very very very very very very very very very very very very" +
			" very very very  very very very very very very very very very very very very long",
});

var oIntroFacet = new sap.suite.ui.commons.FacetOverview("facet_intro", {
    title: "Intro",
    content: oIntroText,
    heightType: isPhone ? "Auto" : "S",
    press: function() {
        setFacetContent("intro");
    }
});

/**
 * Facet Group
 **/
//some business data 
var oModel = new sap.ui.model.json.JSONModel({
	businessData : [
		{ Year:"2009", revenue:1796991, profit:141.25, population:598997 },
		{ Year:"2010", revenue:5774556, profit:133.82, population:1924852 },
		{ Year:"2011", revenue:6872433, profit:348.76, population:2290811 },
		{ Year:"2012", revenue:7800327, profit:217.29, population:2900109 },
		{ Year:"2013", revenue:9203318, profit:117.00, population:3771106 },
		{ Year:"2014", revenue:11510201, profit:609.16, population:5170067 }
	]
});		

// A Dataset defines how the model data is mapped to the chart 
var oDataset = new sap.viz.ui5.data.FlattenedDataset({

	// a Bar Chart requires exactly one dimension (x-axis) 
	dimensions : [ 
		{
			axis : 1, // must be one for the x-axis, 2 for y-axis
			name : 'Year', 
			value : "{Year}"
		} 
	],

	// it can show multiple measures, each results in a new set of bars in a new color 
	measures : [ 
	    // measure 1
	    {
			name : 'Population', 
			value : '{population}'
		},
		{
			name : 'Revenue', // 'name' is used as label in the Legend 
			value : '{revenue}' // 'value' defines the binding for the displayed value   
		},
	],
	
	// 'data' is used to bind the whole data collection that is to be displayed in the chart 
	data : {
		path : "/businessData"
	}
	
});

// create a Bar chart
// you also might use Combination, Line, StackedColumn100, StackedColumn or Column
// for Donut and Pie please remove one of the two measures in the above Dataset.  
var oBarChart = new sap.viz.ui5.Combination({
	width : "80%",
	height : "400px",
	plotArea : {
		colorPalette: ['#5CBAE6', '#B6D957']
	},
	title : {
		visible : true,
		text : 'Profit and Revenue By Country'
	},
	dataset : oDataset
});

// attach the model to the chart and display it
oBarChart.setModel(oModel);

var oIntroFacetGroupContent = new sap.m.VBox({
	justifyContent: "Center",
	items: [
	        oBarChart,
	        new sap.m.Text({
	        	text: "This is a longtext for the information. The information is very very very"
	        })
	        ]
});

var oIntroFacetGroup = new sap.suite.ui.commons.UnifiedThingGroup("group_intro", {
    title : "Intro",
    //description : "",
    design: sap.suite.ui.commons.ThingGroupDesign.ZeroIndent,
    content : oIntroFacetGroupContent
});