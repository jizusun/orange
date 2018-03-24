jQuery.sap.require("sap.ui.ux3.OverlayDialog");
jQuery.sap.require("sap.ui.layout.form.SimpleForm");

sap.ui.controller("JigsawPuzzle.view.Score", {

	onInit: function(){
		this._isPhone = sap.ui.getCore().byId("view_root").getModel("device").getData().isPhone;
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRouteMatched(this._handleRouteMatched, this);
		
		this._aScore = [];
	},
	
	getRouter: function(){
		return this._oRouter;
	},
	
	getScore: function(){
		return this._aScore;
	},
	
	_registerScore: function(oScore){
		this._aScore.push(oScore);
		var oModelScore = sap.ui.getCore().byId("view_root").getModel("score");
		oModelScore.setData(this._aScore[this._aScore.length-1]);
		return this._aScore;
	},
	
	_handleRouteMatched: function(oEvent){
		if (oEvent.getParameter("name") !== "score") {
			return;
		}
		
		var oResult = oEvent.getParameter("result");
		var oComboBox = sap.ui.getCore().byId("combobox_level");
		var sKey = oComboBox.getSelectedKey();
		var nKey;
		if(oResult){
			nKey = (oResult.id).toString();
			oResult.scoreMode = true;
			this._registerScore(oResult);
			if(!oResult.bPass){
				var oCompare = this.getComparison(oResult.row, oResult.row);
				var oOverlayDialog = sap.ui.getCore().byId("od_comparison");
				oOverlayDialog.removeAllContent();
				/*oOverlayDialog.addContent(new sap.m.ScrollContainer({
					content: [ 
new sap.m.HBox({
	  width: "100%", 
	  fitContainer: true,
	  //justifyContent: "Center",
	  items: [ oCompare.prepare ]
}),
new sap.m.HBox({
	  width: "100%", 
	  fitContainer: true,
	  //justifyContent: "Center",
	  items: [ oCompare.play ]
})
 ]
				}));*/
				/*oOverlayDialog.addContent(oCompare.prepare);
				oOverlayDialog.addContent(oCompare.play);*/
				oOverlayDialog.addContent(new sap.m.VBox({
					width: "100%",
					height: "100%",
					fitContainer: true,
					justifyContent: "Center",
					items: [ 
					        oCompare.prepare,
					        new sap.m.HBox({
					        	justifyContent: "Center",
					        	items: [
					        	        new sap.ui.core.Icon({src: "arrow-top"}),
					        	        new sap.ui.core.Icon({src: "arrow-bottom"}),
					        	        ]
					        }).addStyleClass("comparisonSeparator"),
					        oCompare.play
					        ]
				}));
				
				/*var oOverlayDialog = sap.ui.getCore().byId("panel_comparison");				
				oOverlayDialog.removeAllContent();
				oOverlayDialog.addContent(oCompare.prepare.clone());
				oOverlayDialog.addContent(oCompare.play.clone());*/
				//var oOverlayDialog = sap.ui.getCore().byId("page_score");
				/*var oOverlayDialog = sap.ui.getCore().byId("carousel_comparison");
				oOverlayDialog.removeAllPages();
				oOverlayDialog.addPage(oCompare.prepare);
				oOverlayDialog.addPage(oCompare.play);*/
			}
		}
		else{
			nKey = sKey ? sKey:"0";
			var oModelScore = sap.ui.getCore().byId("view_root").getModel("score");
			var oData = oModelScore.getData();
			oData.scoreMode = false;
			oModelScore.setData(oData);
		}
		
		if(!sKey || nKey != sKey){
			oComboBox.setSelectedKey(nKey);
			oComboBox.fireSelectionChange({
				selectedItem: {
					key: nKey
				}
			});
		}
	},
	
	getComparison: function(iR, iC){
		var oPrepPc = util.Tools.getPokerContainer("prepare", iR, iC);
		var oPlayPc = util.Tools.getPokerContainer("play", iR, iC);
		var oPrepData = oPrepPc.getModel("poker").getData();
		var oPlayData = oPlayPc.getModel("poker").getData();
		for(var i=0; i<oPrepData.length; i++)
			if(oPrepData[i].id == oPlayData[i].id){
				oPrepData[i].match = true;
				oPlayData[i].match = true;
			}
		var oScorePrepPc = util.Tools.getScorePokerContainer("prepare", iR, iC);
		oScorePrepPc.setModel(new sap.ui.model.json.JSONModel(oPrepData), "poker");
		var oScorePlayPc = util.Tools.getScorePokerContainer("play", iR, iC);
		oScorePlayPc.setModel(new sap.ui.model.json.JSONModel(oPlayData), "poker");
		
		return {
			prepare: oScorePrepPc,
			play: oScorePlayPc
		};/*new sap.ui.layout.VerticalLayout({
			height: "100%",
			width: "100%",
			//fitContainer: true,
		    //alignItems: "Stretch",
			content: [
			        new sap.m.FlexBox({
			        	fitContainer: true,
			        	//justifyContent: "Start",
			        	items: [ oScorePrepPc ]
			        }),
			        new sap.m.FlexBox({
			        	fitContainer: true,
			        	justifyContent: "Center",
			        	items: [ new sap.m.Label({ text: "VS" }) ]
			        }),
			        new sap.m.FlexBox({
			        	fitContainer: true,
			        	//justifyContent: "End",
			        	items: [ oScorePlayPc ]
			        })
			        ]
		});*/
	},
	
	onViewComparison: function(oEvent){
		var oOverlayDialog = sap.ui.getCore().byId("od_comparison");
		if(!oOverlayDialog.isOpen()){
			oOverlayDialog.open();
		}
	},
	
	onSelectLevel: function(oEvent){
		var oItem = oEvent.getParameter("selectedItem");
		var id;
		if(oItem.getKey)
			id = oItem.getKey();
		else
			id = oItem.key;
		var oBinding = sap.ui.getCore().byId("table_rank").getBinding("items");
		if(oBinding){
			var oFilter = new sap.ui.model.Filter("Level", sap.ui.model.FilterOperator.EQ, id);
			oBinding.filter(oFilter);
		}
	},
	
	onScoreNavBack: function(oEvent){
		var oController = sap.ui.getCore().byId("page_score").getParent().getController();
		var id = oEvent.getParameter("replayId");
		if(id)
			sap.ui.getCore().byId("splitapp").getParent().getController().replayId = id;
		oController.getRouter()._myNavBack();
	},
	
	onPersRank: function(oEvent){
		var oController = sap.ui.getCore().byId("page_score").getParent().getController();
		
		if(!oController._oDlgPersRank){
			var oTablePersRank = new sap.m.Table("table_pers_rank", {
				showSeparater: "Inner",
				noDataText: "没有过关记录",
				columns: [
				          new sap.m.Column({ 
				        	  width: "20%",
				        	  hAlign: "Right",
				        	  vAlign: "Middle"
				          }),
				          new sap.m.Column({ 
				        	  width: "80%",
				        	  hAlign: "Left",
				        	  vAlign: "Middle"
				          }),
				          ],
				items: {
					path: "component>/d/results",
					sorter: new sap.ui.model.Sorter("CompName", false),
					template: new sap.m.ColumnListItem({
						cells: [ ]
					})
				}
			});
			
			oController._oDlgPersRank = new sap.m.Dialog("dialog_pers_rank", {
	 			customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
					                	text: "个人最好成绩"
					                }),
					contentRight: new sap.m.Button({
					            	   //icon: "sap-icon://employee",
					            	   text: "注册",
					            	   type: "Emphasized",
					            	   press: oController.onUserReg
					               }).addStyleClass("sapUiSizeCompact")
				}),
	 			buttons: new sap.m.Button({
	 				text: "确定",
	 				press: function(){
	 					oController._oDlgPersRank.close();
	 				}
	 			}),
	 			subHeader: new sap.m.Bar({
	 				contentMiddle: new sap.m.SearchField("sf_pers_rank", {
	 					 placeholder: "输入用户名查询...",
						 search: function(oEvent){
						 }
				      })
	 			}),
	 			content: oTablePersRank
	 		});
		}
				
		oController._oDlgPersRank.open();
	},
	
	onUserReg: function(oEvent){
		var oController = sap.ui.getCore().byId("page_score").getParent().getController();
		
		if(!oController._oDlgUserReg){
			var oSf = new sap.ui.layout.form.SimpleForm({
				maxContainerCols: 1,
				content: [
				          new sap.m.Label({ text: "用户名" }),
				          new sap.m.Input("input_uname", {
				          }),
				          new sap.m.Label({ text: "电子邮箱" }),
				          new sap.m.Input("input_email", {
				        	  type: "Email"
				          })
				          ]
			});
			
			oController._oDlgUserReg = new sap.m.Dialog("dialog_user_reg", {
	 			title: "新用户注册",
	 			beginButton: new sap.m.Button({
	 				text: "确定",
	 				type: "Accept",
	 				press: function(){
	 					var aInputs = [
	 					               sap.ui.getCore().byId("input_uname"),
	 					               sap.ui.getCore().byId("input_email")
	 					               ];
	 					  		
	 					jQuery.each(aInputs, function (i, oInput){
	 						if(!oInput.getValue()){
	 					  		oInput.setValueState("Error");
	 					  		oInput.setValueStateText("*必填项，不能为空");
	 					  	}
	 						else
	 							oInput.setValueState("None");
	 					});

	 					for(var i=0; i<aInputs.length; i++) {
	 						if(aInputs[i].getValueState() === "Error"){
	 							//aInputs[i].focus();
	 							return false;
	 						}
	 					}

	 					oController._oDlgUserReg.close();
	 				}
	 			}).addStyleClass("sapUiSizeCompact"),
	 			endButton: new sap.m.Button({
	 				text: "取消",
	 				type: "Reject",
	 				press: function(){
	 					oController._oDlgUserReg.close();
	 				}
	 			}).addStyleClass("sapUiSizeCompact"),
	 			content: oSf
	 		});
		}
				
		oController._oDlgUserReg.open();
	},
	
	onHit: function(oEvent){
		
	},
	
	onShare: function(oEvent){
		
	},
	
	onReplay: function(oEvent){
		var oCore = sap.ui.getCore();
		var oController = oCore.byId("page_score").getParent().getController();
		var id = oController._aScore[oController._aScore.length-1].id;
		
		if(oController._isPhone)
			oCore.byId("btn_score_back").firePress({replayId: id});
		else{
			var oItem = (oCore.byId("list_master").getItems())[id];
			oCore.byId("list_master").fireSelect({
				listItem: oItem
			});
		}
	}
});