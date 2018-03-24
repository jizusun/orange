sap.ui.jsview("JigsawPuzzle.view.Rule", {

	getControllerName : function() {
		return "JigsawPuzzle.view.Rule";
	},

	createContent : function(oController) {
 		return new sap.m.Page("page_rule", {
			customHeader: new sap.m.Bar({
 				contentLeft: [
				               new sap.m.Button({
				            	   icon: "sap-icon://nav-back",
				            	   visible: "{device>/isPhone}",
				            	   press: oController.onRuleNavBack
				               })
				               ],
				contentMiddle: [
				                new sap.m.Label({
				                	text: "Rule"
				                })
				                ]
			}).addStyleClass("headerBar"),
			content: [
			          new sap.m.Text({
			        	  text: "This is the rule of the app!"
			          }).addStyleClass("ruleText")
			]
		});
	}

});