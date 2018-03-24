sap.ui.controller("JigsawPuzzle.view.Rule", {

	onInit : function () {
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRouteMatched(this._handleRouteMatched, this);
	},
	
	_handleRouteMatched : function (evt) {
		if (evt.getParameter("name") !== "rule") {
			return;
		}
		//this._dimension = evt.getParameter("dimension");

		//sap.ui.getCore().byId("text_play_dimension").setText(this._dimension);
	},
	
	getRouter: function(){
		return this._oRouter;
	},
	
	onRuleNavBack: function(oEvent){
		var oController = sap.ui.getCore().byId("page_rule").getParent().getController();
		oController.getRouter()._myNavBack();
		//oController.getRouter()._myNavBackWithoutHash("JigsawPuzzle.view.Master", "JS", true);
	}
});