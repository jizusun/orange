jQuery.sap.require("JigsawPuzzle.util.Tools");

sap.ui.controller("JigsawPuzzle.view.Prepare", {

	onInit: function(){
		this._isPhone = sap.ui.getCore().byId("view_root").getModel("device").getData().isPhone;
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRouteMatched(this._handleRouteMatched, this);
	},
	
	getRouter: function(){
		return this._oRouter;
	},
	
	getPokerContainer: function(){
		return this._oPokerContainer;
	},
	
	_handleRouteMatched: function (oEvent) {
		if (oEvent.getParameter("name") !== "prepare") {
			return;
		}
		
		if(this._isPhone){
			var id = oEvent.getParameter("arguments").param;
			this._param = (sap.ui.getCore().byId("view_root").getModel("menu").getData())[id];	
		}
		else{
			this._param = oEvent.getParameter("param");
			/*if(!this._param){
				this._param = {};
				this._param.row = oEvent.getParameter("arguments").param;
			}*/		
		}
		
		var aPlayRS = util.Tools.getRandomSequence(this._param.row*this._param.row);
		this._param.rs = aPlayRS;
		var aPrepareRS = aPlayRS.slice(0).sort(function(iA, iB){ return iA-iB; });
		var aPreparePoker = util.Tools.getPoker(aPrepareRS);
		// Bind Poker to PokerContainer
		this._oPokerContainer = util.Tools.getPokerContainer("prepare", this._param.row, this._param.row, this);
		var oPreparePokerModel = this._oPokerContainer.getModel("poker");
		if(oPreparePokerModel)
			oPreparePokerModel.setData(aPreparePoker);
		else{
			oPreparePokerModel = new sap.ui.model.json.JSONModel(aPreparePoker);
			this._oPokerContainer.setModel(oPreparePokerModel, "poker");	
		}
		
		var oVBoxPrepare = sap.ui.getCore().byId("vbox_prepare");
		if(oVBoxPrepare.getItems().length){
			if((oVBoxPrepare.getItems())[0].getId() != this._oPokerContainer.getId()){
				oVBoxPrepare.removeAllItems();
				oVBoxPrepare.addItem(this._oPokerContainer);
			}				
		}
		else
			oVBoxPrepare.addItem(this._oPokerContainer);
		
		this._startPrepareClock();
	},

	_getPrepareClock: function(){
		return sap.ui.getCore().byId("text_prepare_clock").getText();
	},
	
	_setPrepareClock: function(sec){
		sap.ui.getCore().byId("text_prepare_clock").setText(sec);
	},
	
	_startPrepareClock: function(){
		sap.ui.getCore().byId("text_prepare_clock").setText(this._param.sec);
		this.prepareClock = setInterval(this._tickPrepareClock, 1000, this);
	},
	
	_tickPrepareClock: function(that){
		var cn = parseInt(that._getPrepareClock());
		cn = cn - 1;
		that._setPrepareClock(cn.toString());
		if(0 == cn){
			that._stopPrepareClock();
			that._showPlay();
		}
	},
	
	_stopPrepareClock: function(){
		clearInterval(this.prepareClock);
	},
	
	_showPlay: function(data){
		this._oRouter._myNavToWithoutHash("JigsawPuzzle.view.Play", "JS", false);
		sap.ui.getCore().byId("page_play").getParent().getController().getRouter().fireRouteMatched({name: "play", param: data ? data : this._param});
	},
	
	onPrepareNavBack: function(oEvent){
		var oController = sap.ui.getCore().byId("page_prepare").getParent().getController();
		oController._stopPrepareClock();
		oController.getRouter()._myNavBack();
		//oController.getRouter()._myNavBackWithoutHash("JigsawPuzzle.view.Master", "JS", true);
	},
	
	onPoker: function(){
		sap.m.MessageToast.show("Don't click any more");
	},
	
	onStartPlay: function(oEvent){
		var oController = sap.ui.getCore().byId("page_prepare").getParent().getController();
		oController._stopPrepareClock();
		oController._showPlay();
	}
});