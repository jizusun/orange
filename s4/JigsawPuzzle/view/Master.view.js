sap.ui.jsview("JigsawPuzzle.view.Master", {

	getControllerName: function(){
		return "JigsawPuzzle.view.Master";
	},

	createContent: function(oController){
		//this.addStyleClass("sapUiSizeCompact");
		
		var oListMaster = new sap.m.List("list_master", {
			mode: "{device>/listMode}",
			select: oController.onMasterListSelect,
			items: {
				path: "menu>/",
				/*template: new sap.m.StandardListItem({
		        	title: "{menu>name}",
		        	//info: "111",
		        	infoState: "Success",
		        	type: "{device>/listItemType}",
		        	press: oController.onMasterListItemPress
		        })*/
				template: new sap.m.ObjectListItem({
					title: "{menu>name}",
					icon: "{menu>badge}",
					number: {
						path: "menu>row",
						formatter: function(v){
							if(v > 0)
								return v + " X " + v;
							else
								return "";
						}
					}, //"{menu>row}",
					numberUnit: "grid",
					type: "{device>/listItemType}",
					firstStatus: new sap.m.ObjectStatus({
						text: {
							path: "menu>sec",
							formatter: function(v){
								if(v > 0)
									return "Prepare time: " + v;
								else
									return "";
							}
						}, //"{menu>sec}",
						state: "Success",
					}),
					press: oController.onMasterListItemPress
				})
			}
		}).addDelegate({
			onAfterRendering: function(){
				var oItems = sap.ui.getCore().byId("list_master").getItems();
				for(var i=0; i<oItems.length; i++){
					var oBindingContext = oItems[i].getBindingContext("menu");
					var color = (oBindingContext.getModel().getObject(oBindingContext.getPath())).color;
					var oBadge = oItems[i]._oImageControl;
					oBadge.setColor(color);
				}
			}
		});
		
 		return new sap.m.Page("page_master", {
			/*showFooter: "{device>/isNoPhone}",
			footer: new sap.m.Toolbar(),*/
			customHeader: new sap.m.Bar({
 				contentLeft: new sap.m.Button({
 									icon: "sap-icon://lightbulb",
 									text: "Rule",
 									press: oController.showRule
 								}),
				contentMiddle: new sap.m.Label({
				                	text: "Master Page Title"
				                }),
				contentRight: new sap.m.Button({
									icon: "sap-icon://target-group",
									text: "Score",
									press: oController.showScore
 								}),
			}).addStyleClass("headerBar"),
			content: [ 
			          oListMaster
			         ]
		});
	}

});