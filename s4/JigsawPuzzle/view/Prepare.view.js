sap.ui.jsview("JigsawPuzzle.view.Prepare", {

	getControllerName : function() {
		return "JigsawPuzzle.view.Prepare";
	},

	createContent : function(oController) {
 		return new sap.m.Page("page_prepare", {
 			customHeader: new sap.m.Bar({
 				contentLeft: [
				               new sap.m.Button({
				            	   icon: "sap-icon://nav-back",
				            	   visible: "{device>/isPhone}",
				            	   press: oController.onPrepareNavBack
				               })
				               ],
				contentMiddle: [
				                new sap.ui.core.Icon({
				                	src: "sap-icon://past"
				                }),
				                new sap.m.Text("text_prepare_clock", {
				                }).addStyleClass("appTitle")
				                ],
				contentRight: [
				               new sap.m.Button({
				            	   icon: "sap-icon://feeder-arrow",
				            	   iconFirst: false,
				            	   text: "SD",
				            	   press: oController.onStartPlay
				               })
				               ]
			}).addStyleClass("headerBar"),
			enableScrolling: false,
			content: [
			          new sap.m.VBox("vbox_prepare", {
			        	  height: "100%",
			        	  width: "100%", 
			        	  fitContainer: true,
			        	  justifyContent: "Center"
			          })
			]
		});
	}

});