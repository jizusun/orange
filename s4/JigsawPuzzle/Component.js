jQuery.sap.declare("JigsawPuzzle.Component");
jQuery.sap.require("JigsawPuzzle.model.GameData");

sap.ui.core.UIComponent.extend("JigsawPuzzle.Component", {
	
	metadata: {
		
		routing: {
			config: {
				viewType: "JS",
				viewPath: "JigsawPuzzle.view",
				targetControl: "splitapp",
				clearTarget: false,
				transition: "slide"
			},
			routes: [
				{
					pattern: "rule",
					name: "rule",
					view: "Rule",
					targetAggregation: "detailPages"
				},
				{
					pattern: "score/:result:",
					name: "score",
					view: "Score",
					targetAggregation: "detailPages"
				},
				{	
					pattern: "",
					name: "master",
					view: "Master",
					viewLevel: 0,
					targetAggregation: "masterPages",
					subroutes: [
						{
							pattern: "prepare/{param}",
							name: "prepare",
							view: "Prepare",
							viewLevel: 1,
							targetAggregation: "detailPages",
							subroutes: [
							            {
							            	pattern: "play/{param}",
							            	name: "play",
							            	view: "Play",
							            	viewLevel: 2,
							            	targetAggregation: "detailPages"
							            }
							            ]
						},
						{
							pattern : "{all*}",
							name : "notFound",
							view : "NotFound",
							//viewLevel : 3,
							targetAggregation : "detailPages"
						}
					]
				}
			]
		}
	},

	init : function () {

		jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
		jQuery.sap.require("sap.ui.core.routing.HashChanger");
		jQuery.sap.require("JigsawPuzzle.MyRouter");

		// call overwritten init (calls createContent)
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		//extend the router
		this._oRouter = this.getRouter();
		jQuery.extend(this._oRouter, JigsawPuzzle.MyRouter);
		
		//navigate to initial page for !phone
		if (!sap.ui.Device.system.phone) {
			this._oRouter._myNavToWithoutHash("JigsawPuzzle.view.Rule", "JS", false);
			//this._oRouter.navTo("score");
		}
		//window.history.pushState({ index: "index" }, "index page 2", "index.html");
		
		// initialize the router
		this._oRouteHandler = new sap.m.routing.RouteMatchedHandler(this._oRouter);
		this._oRouter.initialize();

	},

	destroy : function () {
		
		if (this._oRouteHandler) {
			this._oRouteHandler.destroy();
		}

		// call overriden destroy
		sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);
	},

	createContent : function () {

		// create root view
		var oView = sap.ui.view({
			id: "view_root", 
			viewName : "JigsawPuzzle.view.App",
			type : "JS",
			viewData : { component : this }
		});
		
		// set menu model
		//var oMenuModel = new sap.ui.model.json.JSONModel("JigsawPuzzle/model/Menu.json");
		var oMenuModel = new sap.ui.model.json.JSONModel(model.GameData.menu);
		oView.setModel(oMenuModel, "menu");
		
		// set score model
		var oScoreModel = new sap.ui.model.json.JSONModel();
		oView.setModel(oScoreModel, "score");
		
		// set rank model
		var oRank = [
		             {"Level":"1","Rank":"1","UId":"13","UName":"name_13","StrScore":"","IntScore":"66","Exchange":"0","KickDate":"0000-00-00 00:00:00"},
		             {"Level":"1","Rank":"2","UId":"12","UName":"name_12","StrScore":"","IntScore":"77","Exchange":"0","KickDate":"0000-00-00 00:00:00"},
		             {"Level":"1","Rank":"3","UId":"11","UName":"name_11","StrScore":"","IntScore":"88","Exchange":"0","KickDate":"0000-00-00 00:00:00"},
		             {"Level":"1","Rank":"4","UId":"44","UName":"\u54c8\u54c8","StrScore":"","IntScore":"99","Exchange":"0","KickDate":"0000-00-00 00:00:00"},
		             {"Level":"2","Rank":"1","UId":"44","UName":"\u54c8\u54c8","StrScore":"40-07-22","IntScore":"23","Exchange":"7","KickDate":"2015-06-10 10:59:04"},
		             {"Level":"2","Rank":"2","UId":"21","UName":"name_21","StrScore":"","IntScore":"23","Exchange":"10","KickDate":"0000-00-00 00:00:00"},
		             {"Level":"2","Rank":"3","UId":"23","UName":"name_23","StrScore":"03-07-23","IntScore":"252","Exchange":"0","KickDate":"0000-00-00 00:00:00"},
		             {"Level":"2","Rank":"4","UId":"22","UName":"\u4e2d\u6587\u540d","StrScore":"","IntScore":"296","Exchange":"0","KickDate":"0000-00-00 00:00:00"},
		             {"Level":"3","Rank":"1","UId":"13","UName":"name_13","StrScore":"90-07-22","IntScore":"299","Exchange":"98","KickDate":"2015-06-10 11:11:15"},
		             {"Level":"3","Rank":"2","UId":"44","UName":"\u54c8\u54c8","StrScore":"","IntScore":"300","Exchange":"0","KickDate":"0000-00-00 00:00:00"},
		             {"Level":"4","Rank":"1","UId":"13","UName":"name_13","StrScore":"90-07-22","IntScore":"1400","Exchange":"98","KickDate":"2015-06-10 11:10:38"}
		             ];
		var oRankModel = new sap.ui.model.json.JSONModel(oRank);
		oView.setModel(oRankModel, "rank");
				
		// set device model
		var oDeviceModel = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : sap.ui.Device.system.phone,
			isNoPhone : !sap.ui.Device.system.phone,
			listMode : (sap.ui.Device.system.phone) ? "None" : "SingleSelectMaster",
			listItemType : (sap.ui.Device.system.phone) ? "Active" : "Inactive"
		});
		oDeviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(oDeviceModel, "device");

		return oView;
	}

});