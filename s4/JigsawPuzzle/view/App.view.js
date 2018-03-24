sap.ui.jsview("JigsawPuzzle.view.App", {
 
	getControllerName : function() {
		return "JigsawPuzzle.view.App";
	},

	createContent : function(oController) {
		this.setDisplayBlock(true);
		return new sap.m.SplitApp("splitapp", {
			//mode: "HideMode"
			//backgroundColor: "#00b377",
			//backgroundImage: "JigsawPuzzle/image/AppBgPic.jpg",
		});
	}

});
