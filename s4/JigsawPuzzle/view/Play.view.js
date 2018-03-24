sap.ui.jsview("JigsawPuzzle.view.Play", {
 
	getControllerName : function() {
		return "JigsawPuzzle.view.Play";
	},

	createContent : function(oController) {
 		return new sap.m.Page("page_play", {
 			customHeader: new sap.m.Bar({
 				contentLeft: [
				               new sap.m.Button({
				            	   icon: "sap-icon://nav-back",
				            	   visible: "{device>/isPhone}",
				            	   press: oController.onPlayNavBack
				               })
				               ],
				contentMiddle: [
				                new sap.ui.core.Icon({
				                	src: "sap-icon://future"
				                }),
				                new sap.m.Text("text_play_clock_min", {
				                }).addStyleClass("appTitle"),
				                new sap.m.Label({ text: ":" }),
				                new sap.m.Text("text_play_clock_sec", {
				                }).addStyleClass("appTitle"),
				                new sap.m.Label({ text: ":" }),
				                new sap.m.Text("text_play_clock_csec", {
				                }).addStyleClass("appTitle")
				                ],
				contentRight: [
				               new sap.m.Button({
				            	   icon: "sap-icon://drop-down-list",
				            	   text: "Options",
				            	   press: oController.onPlayOptions
				               })
				               ]
			}).addStyleClass("headerBar"),
			enableScrolling: false,
			content: [
			          new sap.m.VBox("vbox_play", {
			        	  height: "100%",
			        	  width: "100%", 
			        	  fitContainer: true,
			        	  justifyContent: "Center"
			          })
			]
		});
	}

});