jQuery.sap.declare("JigsawPuzzle.MyRouter");
	
JigsawPuzzle.MyRouter = {
	_myNavToWithoutHash: function(sViewName, sViewType, bMaster, oData){
		var oSplitApp = sap.ui.getCore().byId("splitapp");
		var oView = this.getView(sViewName, sViewType);
		oSplitApp.addPage(oView, bMaster);
		oSplitApp.to(oView.getId(), "slide", oData);
	},
	
	_myNavBackWithoutHash: function(sViewName, sViewType, bMaster, oData){
		var oSplitApp = sap.ui.getCore().byId("splitapp");
		var oView = this.getView(sViewName, sViewType);
		oSplitApp.addPage(oView, bMaster);
		oSplitApp.backToPage(oView.getId(), oData, null);
	},
	
	_myNavBack: function(oData){
		var oHistory = sap.ui.core.routing.History.getInstance();
		var oPrevHash = oHistory.getPreviousHash();
		if (oPrevHash !== undefined) {
			window.history.go(-1);
		} else {
			this.navTo("master", {}, true);
		}
	}
};