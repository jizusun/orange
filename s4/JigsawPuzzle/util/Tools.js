jQuery.sap.declare("util.Tools");
jQuery.sap.require("sap.ui.layout.VerticalLayout");

util.Tools = {
	isPhone: sap.ui.Device.system.phone,
	PreparePcPool: {},
	PlayPcPool: {},
	ScorePreparePcPool: {},
	ScorePlayPcPool: {},
	PokerSize: [ "", "", "", "6.916rem", "4.75rem", "3.45rem", "2.583rem", "1.964rem", "1.5rem" ],
	
	getPokerContainer: function(sType, iR, iC, oController){ // Available on Chrome, without responsive
		if(iR != parseInt(iR) || iR < 1)
			return false;
		
		if(sType == "prepare" && this.PreparePcPool[iR])
			return this.PreparePcPool[iR];
		else if(sType == "play" && this.PlayPcPool[iR])
			return this.PlayPcPool[iR];
		else{
			var oPokerContainer = new sap.ui.layout.VerticalLayout("vl_"+sType+"_pc_"+iR, { //sap.ui.layout.ResponsiveFlowLayout OR sap.m.VBox
				height: "100%",
				width: "100%"
			});
			var idx = 0;
			var sStyle = sType + "Poker";
			for(var i=0; i<iR; i++){
				var oPokerContainerRow = new sap.m.HBox({
					height: "100%",
					width: "100%",
					justifyContent: "Center",
					alignItems: "Center"
				});
				for(var j=0; j<iC; j++){
					var oPokerContainerCell = new sap.ui.core.Icon("poker_"+sType+"_"+iR+"_"+i+"_"+j, {
						src: "{poker>/"+idx+"/source}",
						color: "{poker>/"+idx+"/color}",
						size: this.PokerSize[iR],//iR < 7 ? "3rem":"1.5rem",
						layoutData: new sap.m.FlexItemData({
							growFactor: 1,
						}),
						press: oController.onPoker
					}).addStyleClass(sStyle);
					oPokerContainerRow.addItem(oPokerContainerCell);
					idx++;
				}
				oPokerContainer.addContent(oPokerContainerRow);
			}
			
			if(sType == "prepare"){
				this.PreparePcPool[iR] = oPokerContainer;
				return this.PreparePcPool[iR];
			}
			else{
				this.PlayPcPool[iR] = oPokerContainer;
				return this.PlayPcPool[iR];
			}
		}
	},
	
	getScorePokerContainer: function(sType, iR, iC){ // Available on Chrome, without responsive
		if(iR != parseInt(iR) || iR < 1)
			return false;
		
		if(sType == "prepare" && this.ScorePreparePcPool[iR])
			return this.ScorePreparePcPool[iR];
		else if(sType == "play" && this.ScorePlayPcPool[iR])
			return this.ScorePlayPcPool[iR];
		else{
			var oPokerContainer = new sap.ui.layout.VerticalLayout("vl_score_"+sType+"_pc_"+iR, {
				height: "100%",
				width: "100%"
			});
			var idx = 0;
			for(var i=0; i<iR; i++){
				var oPokerContainerRow = new sap.m.HBox({
					height: "100%",
					width: "100%",
					justifyContent: "Center",
					alignItems: "Center"
				});
				for(var j=0; j<iC; j++){
					var oPokerContainerCell = new sap.ui.core.Icon("poker_score_"+sType+"_"+iR+"_"+i+"_"+j, {
						src: "{poker>/"+idx+"/source}",
						color: {
							parts: [
							        { path: "poker>/"+idx+"/match" },
							        { path: "poker>/"+idx+"/color" }
							        ],
							formatter: function(bMatch, color){
								if(bMatch)
									return "#f2f2f2";
								else
									return color;
							}
						},
						size: "1.5rem",
						layoutData: new sap.m.FlexItemData({
							growFactor: 1,
						})
					}).addStyleClass("scorePoker");
					oPokerContainerRow.addItem(oPokerContainerCell);
					idx++;
				}
				oPokerContainer.addContent(oPokerContainerRow);
				//oPokerContainer.addItem(oPokerContainerRow);
			}
			
			if(sType == "prepare"){
				this.ScorePreparePcPool[iR] = oPokerContainer;
				return this.ScorePreparePcPool[iR];
			}
			else{
				this.ScorePlayPcPool[iR] = oPokerContainer;
				return this.ScorePlayPcPool[iR];
			}
		}
	},
	
	getRandomSequence: function(iCount){
		if(iCount != parseInt(iCount) || iCount < 1)
			return false;
			
		var aRS = [];
		var iMax = 445;
		var iMin = 0;
		
		while(true){
			var iNum = Math.round(Math.random() * (iMax - iMin + 1)) + iMin;
			if(aRS.indexOf(iNum) == -1)
				aRS.push(iNum);
			if(aRS.length == iCount)
				break;
		}
		
		return aRS;
	},
	
	getPoker: function(aSeq){
		if(typeof aSeq != "object" || aSeq.length == 0)
			return false;
		
		var aPoker = [];
		for(var i=0; i<aSeq.length; i++)
			aPoker.push(model.GameData.poker[aSeq[i]]);
		
		return aPoker;
	}
};