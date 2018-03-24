jQuery.sap.require("JigsawPuzzle.util.Tools");

sap.ui.controller("JigsawPuzzle.view.Play", {
	
	onInit: function(){
		this._isPhone = sap.ui.getCore().byId("view_root").getModel("device").getData().isPhone;
		this._pCount = 0;
		
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRouteMatched(this._handleRouteMatched, this);
	},
	
	getRouter: function(){
		return this._oRouter;
	},
	
	getPokerContainer: function(){
		return this._oPokerContainer;
	},
		
	_handleRouteMatched: function(oEvent){
		if (oEvent.getParameter("name") !== "play") {
			return;
		}
		this._param = oEvent.getParameter("param");
		this._param.exchange = 0;
		
		var aPlayPoker = util.Tools.getPoker(this._param.rs);
		this._oPokerContainer = util.Tools.getPokerContainer("play", this._param.row, this._param.row, this);
		var oPlayPokerModel = this._oPokerContainer.getModel("poker");
		if(oPlayPokerModel)
			oPlayPokerModel.setData(aPlayPoker);
		else{
			oPlayPokerModel = new sap.ui.model.json.JSONModel(aPlayPoker);
			this._oPokerContainer.setModel(oPlayPokerModel, "poker");	
		}
		
		var oVBoxPlay = sap.ui.getCore().byId("vbox_play");
		if(oVBoxPlay.getItems().length){
			if((oVBoxPlay.getItems())[0].getId() != this._oPokerContainer.getId()){
				oVBoxPlay.removeAllItems();
				oVBoxPlay.addItem(this._oPokerContainer);
			}				
		}
		else
			oVBoxPlay.addItem(this._oPokerContainer);

		this._startPlayClock(true);
	},
	
	_startPlayClock: function(bInit){
		//this._oPokerContainer.setEnabled(true);
		//this._oPokerContainer.setBusy(false);
		if(bInit){
			sap.ui.getCore().byId("text_play_clock_min").setText("00");
			sap.ui.getCore().byId("text_play_clock_sec").setText("00");
			sap.ui.getCore().byId("text_play_clock_csec").setText("00");
			if(!this.playClock)
				this._stopPlayClock();
		}
		this.playClock = setInterval(this._tickPlayClock, 10, this);
	},
	
	_tickPlayClock: function(clockOwner){
		var sCsec = sap.ui.getCore().byId("text_play_clock_csec").getText();
		var csec = parseInt(sCsec);
		csec += 1;
		if(csec == 100){
			csec = 0;
			sCsec = "00";
			var sSec = sap.ui.getCore().byId("text_play_clock_sec").getText();
			var sec = parseInt(sSec);
			sec += 1;
			if(sec == 60){
				sec = 0;
				sSec = "00";
				var sMin = sap.ui.getCore().byId("text_play_clock_min").getText();
				var min = parseInt(sMin);
				min += 1;
				if(min == 60){
					min = 0;
					sMin = "00";
					clockOwner._stopPlayClock();
				}
				else
					sMin = min < 10 ? '0' + min.toString() : min.toString();
				sap.ui.getCore().byId("text_play_clock_min").setText(sMin);
			}
			else
				sSec = sec < 10 ? '0' + sec.toString() : sec.toString();
			sap.ui.getCore().byId("text_play_clock_sec").setText(sSec);
		}
		sCsec = csec < 10 ? '0' + csec.toString() : csec.toString();
		sap.ui.getCore().byId("text_play_clock_csec").setText(sCsec);
	},
	
	_stopPlayClock: function(){
		clearInterval(this.playClock);
		//this._oPokerContainer.setEnabled(false);
		//this._oPokerContainer.setBusy(bBusy ? bBusy : true);
	},
	
	_getPlayScore: function(){
		var sMin = sap.ui.getCore().byId("text_play_clock_min").getText();
		var sSec = sap.ui.getCore().byId("text_play_clock_sec").getText();
		var sCsec = sap.ui.getCore().byId("text_play_clock_csec").getText();
		var sTime = sMin + " min " + sSec + " sec " + sCsec;
		var min = parseInt(sMin);
		var sec = parseInt(sSec);
		var csec = parseInt(sCsec);
		var iTime = (min*60 + sec)*100 + csec; 
		return { id: this._param.id, levelName: this._param.name, row: this._param.row, strScore: sTime, intScore: iTime, exchange: this._param.exchange };
	},
	
	_pausePlay: function(){
		this._stopPlayClock();
		if(!this._pauseDialog){
			var that = this;
			this._pauseDialog = new sap.m.BusyDialog("bd_play_pause", {
				  title: "Pause...",
				  showCancelButton: true,
				  cancelButtonText: "back",
				  close: function(oEvent){
					  that._recoverPlay();
				  }
			  });
		}
		this._pauseDialog.open();
	},
	
	_navToScore: function(bPass){
		/*if(this._isPhone)
			this._oRouter.navTo("score");
		else*/
			/*this._oRouter._myNavToWithoutHash("JigsawPuzzle.view.Score", "JS", false);*/
		
		var oScore = this._getPlayScore();
		oScore.bPass = bPass;
		oScore.id = this._param.id;
		this._oRouter._myNavToWithoutHash("JigsawPuzzle.view.Score", "JS", false);
		sap.ui.getCore().byId("page_score").getParent().getController().getRouter().fireRouteMatched({name: "score", result: oScore});
		/*var oComboBox = sap.ui.getCore().byId("combobox_level");
		oComboBox.setSelectedKey(oScore.id);
		oComboBox.fireSelectionChange({
			selectedItem: {
				key: oScore.id
			}
		});*/
		
		//sap.ui.getCore().byId("page_score").getParent().getController().registerScore(oScore);
		
		/*var oItbScore = sap.ui.getCore().byId("itb_score");
		oItbScore.setSelectedKey(bPass?"key_itf_success":"key_itf_fail");
		oItbScore.setExpanded(true);*/
	},
	
	_dropPlay: function(){
		this._stopPlayClock();
		this._navToScore(false);
	},
	
	_recoverPlay: function(){
		this._startPlayClock(false);
	},
	
	_quitPlay: function(oEvent){
		this._stopPlayClock();
		if(this._isPhone)
			this.getRouter()._myNavBack();
			//this.getRouter()._myNavBackWithoutHash("JigsawPuzzle.view.Master", "JS", true);
		else
			this.getRouter()._myNavBackWithoutHash("JigsawPuzzle.view.Rule", "JS", false);
	},
	
	_passPlay: function(){
		this._stopPlayClock();
		sap.m.MessageToast.show("Bingo");
		//this._oPokerContainer.setBusy(true);
		var that = this;
		setTimeout(function(){
			that._navToScore(true);
		}, 2000);
	},

	onPlayNavBack: function(oEvent){
		var oController = sap.ui.getCore().byId("page_play").getParent().getController();
		oController._stopPlayClock();
		oController.getRouter()._myNavBack();
		//oController.getRouter()._myNavBackWithoutHash("JigsawPuzzle.view.Master", "JS", true);
	},
	
	onPlayOptions: function(oEvent){
		var oController = sap.ui.getCore().byId("page_play").getParent().getController();
		if(!oController._oPlayOption){
			oController._oPlayOption = new sap.m.ActionSheet({
				showCancelButton: true,
				cancelButtonText: "Cancel",
				/*cancelButtonPress: function(oEvent){
				},*/
				buttons: [
				          new sap.m.Button({
				        	  text: "Pause",
				        	  press: function(oEvent){ oController._pausePlay(); }
				          }),
				          new sap.m.Button({
				        	  text: "Drop",
				        	  press: function(oEvent){ oController._dropPlay(); }
				          }),
				          new sap.m.Button({
				        	  text: "Quit",
				        	  press: function(oEvent){ oController._quitPlay(); }
				          })
				          ]
			});
		}
		oController._oPlayOption.openBy(this);
	},
	
	onPoker: function(oEvent){
		var oController = sap.ui.getCore().byId("page_play").getParent().getController();
		var pokerId = oEvent.getParameter("id");
		var tmp = pokerId.split("_");
		var iR = parseInt(tmp[tmp.length-2]);
		var iC = parseInt(tmp[tmp.length-1]);
		if(oController._pCount == 0){
			oController._pCount++;
			oController._firPokerIdx = iR * oController._param.row + iC;
		}
		else{
			oController._pCount = 0;
			oController._secPokerIdx = iR * oController._param.row + iC;
			if(oController._firPokerIdx != oController._secPokerIdx){
				oController._param.exchange++;
				var oPlayPokerModel = oController.getPokerContainer().getModel("poker");
				var oPlayPokerData = oPlayPokerModel.getData();
				var oTmp = oPlayPokerData[oController._firPokerIdx];
				oPlayPokerData[oController._firPokerIdx] = oPlayPokerData[oController._secPokerIdx];
				oPlayPokerData[oController._secPokerIdx] = oTmp;
				oPlayPokerModel.setData(oPlayPokerData);

				var i;
				for(i=0; i<oPlayPokerData.length-1; i++)
					if(oPlayPokerData[i].id > oPlayPokerData[i+1].id)
						break;
				if(i == oPlayPokerData.length-1) // change to "i == oPlayPokerData.length-1" after debug
					oController._passPlay();	
			}
		}
	}
});