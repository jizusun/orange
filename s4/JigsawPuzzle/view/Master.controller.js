sap.ui.controller("JigsawPuzzle.view.Master", {
	
	onInit: function(){
		this._isPhone = sap.ui.getCore().byId("view_root").getModel("device").getData().isPhone;
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRouteMatched(this._handleRouteMatched, this);
	},
	
	_handleRouteMatched: function(oEvent){
		if (oEvent.getParameter("name") !== "master") {
			return;
		}
		var id = sap.ui.getCore().byId("splitapp").getParent().getController().replayId;
		if(id){
			sap.ui.getCore().byId("splitapp").getParent().getController().replayId = null;
			var oCore = sap.ui.getCore();
			var oItem = (oCore.byId("list_master").getItems())[id];
			oCore.byId("list_master").fireSelect({
				listItem: oItem
			});
		}
	},
	
	getRouter: function(){
		return this._oRouter;
	},
	
	_stopClock: function(){
		if(sap.ui.getCore().byId("page_prepare")){
			var oCtrlrPrepare = sap.ui.getCore().byId("page_prepare").getParent().getController();
			oCtrlrPrepare._stopPrepareClock();
		}
		if(sap.ui.getCore().byId("page_play")){
			var oCtrlrPlay = sap.ui.getCore().byId("page_play").getParent().getController();
			oCtrlrPlay._stopPlayClock();
		}
	},
	
	onMasterListSelect: function(oEvent){
		var oController = sap.ui.getCore().byId("page_master").getParent().getController();
		oController._stopClock();
		var oItem = oEvent.getParameter("listItem");
		oController._masterListItemSelect(oItem);
	},
	
	onMasterListItemPress: function(oEvent){
		var oController = sap.ui.getCore().byId("page_master").getParent().getController();
		oController._stopClock();
		var oItem = oEvent.getSource();
		oController._masterListItemSelect(oItem);
	},
	
	_masterListItemSelect: function(oItem){
		var bindingContext = oItem.getBindingContext("menu");
		var oItemData = bindingContext.getModel().getObject(bindingContext.getPath());
		if(oItemData.row > 0)
			this._showPrepare(oItemData);
		/*else if(-1 == oItemData.row)
			this.showRule();
		else if(-2 == oItemData.row)
			this.showScore();*/
		else
			sap.m.MessageToast.show("Invalid Item");
	},
	
	_showPrepare: function(data){
		if(this._isPhone)
			this._oRouter.navTo("prepare", { param: data.id });
		else{
			this._oRouter._myNavToWithoutHash("JigsawPuzzle.view.Prepare", "JS", false);
			sap.ui.getCore().byId("page_prepare").getParent().getController().getRouter().fireRouteMatched({name: "prepare", param: data});			
		}
	},
	
	showRule: function(){
		var oController = sap.ui.getCore().byId("page_master").getParent().getController();
		if(oController._isPhone)
			oController._oRouter.navTo("rule");
		else
			oController._oRouter._myNavToWithoutHash("JigsawPuzzle.view.Rule", "JS", false);
	},
	
	showScore: function(){
		var oController = sap.ui.getCore().byId("page_master").getParent().getController();
		if(oController._isPhone)
			oController._oRouter.navTo("score");
		else{
			oController._oRouter._myNavToWithoutHash("JigsawPuzzle.view.Score", "JS", false);
			sap.ui.getCore().byId("page_score").getParent().getController().getRouter().fireRouteMatched({name: "score"});
		}
		
		/*var oComboBox = sap.ui.getCore().byId("combobox_level");
		var id = oComboBox.getSelectedKey();
		if(!id){
			oComboBox.setSelectedKey("0");
			oComboBox.fireSelectionChange({
				selectedItem: {
					key: "0"
				}
			});
		}*/
	},
	
	/*onAfterRendering: function(){
		window.history.pushState({ index: "index" }, "index page 2", "index.html");
	}*/
});