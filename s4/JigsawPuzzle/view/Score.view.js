sap.ui.jsview("JigsawPuzzle.view.Score", {

	getControllerName: function() {
		return "JigsawPuzzle.view.Score";
	},

	createContent: function(oController){
		oOverlayContainer = new sap.ui.ux3.OverlayDialog("od_comparison", {
			width: "90%",
			height: "90%",
			openButtonVisible: false
		});
		
		var oObjectHeader = new sap.m.ObjectHeader({
			//condensed: true,
			visible: "{score>/scoreMode}",
			title: {
				path: "score>/bPass",
				formatter: function(v){
					if(v)
						return "Success";
					else
						return "Fail";
				}
			},
			attributes: [
			             new sap.m.ObjectAttribute({
			            	 text: "{score>/levelName}"
			             }),
			             new sap.m.ObjectAttribute({
			            	 visible: {
			            		 path: "score>/bPass",
			            		 formatter: function(v){
			            			 return !v;
			     				 }
			            	 },
			            	 text: "View...",
			            	 active: true,
			            	 press: oController.onViewComparison
			             })
			             ],
			number: {
				path: "score>/strScore",
				formatter: function(v){
					return "Spend: " + v;
				}
			},
			/*numberUnit: {
				path: "score>/exchange",
				formatter: function(v){
					return "Exchange:" + v;
				}
			},*/
			numberState: {
				path: "score>/bPass",
				formatter: function(v){
					if(v)
						return "Success";
					else
						return "Error";
				}
			},
			statuses: [
			           new sap.m.ObjectStatus({
			        	   //icon: "sap-icon://action",
			        	   text: {
			        		   path: "score>/exchange",
			        		   formatter: function(v){
			        			   return "Exchange:" + v;
			        		   }
			        	   },
			        	   state: "Warning"
			           })
			           ],
			/*responsive: true,
			headerContainer: new sap.m.IconTabBar({
				items: [
				        new sap.m.IconTabFilter({
				        	text: "View..."
				        })
				        ]
			}).addStyleClass("sapUiResponsiveContentPadding")*/
		}).addStyleClass("sapUiSizeCompact");
		
		/*var oItb = new sap.m.IconTabBar({
			items: [
			        new sap.m.IconTabFilter("itf_comparison", {
			        	text: "View..."
			        })
			        ]
		});*/
		
		/*var oPanel = new sap.m.Panel("panel_comparison", {
			headerText: "View...",
			expandable: true
		});*/
		
		/*var oCarousel = new sap.m.Carousel("carousel_comparison", {
		});*/
		
		var oTable = new sap.m.Table("table_rank", {
			//backgroundDesign: sap.m.BackgroundDesign.Transparent,
			showSeparators: "All",
			noDataText: "至今无人能过这关...",
			headerToolbar: new sap.m.Toolbar({
				content: [
				          new sap.m.Label({ text: "Rank" }),
				          new sap.m.ToolbarSpacer(),
				          new sap.m.ComboBox("combobox_level", {
				        	  //editable: false,
				        	  items: {
				        		  path: "menu>/",
				        		  filters: new sap.ui.model.Filter("row", sap.ui.model.FilterOperator.GT, 0),
				        		  template: new sap.ui.core.Item({
				        			  key: "{menu>id}",
				        			  text: "{menu>name}"
				        		  })
				        	  },
				        	  selectionChange: oController.onSelectLevel
				          })
				          ]
			}).addStyleClass("sapUiSizeCompact"),
		    columns: [
		              new sap.m.Column({
		            	  width: "10%"
		              }),
		              new sap.m.Column(),
		              new sap.m.Column()
		              ],
		    items: {
		           	path : "rank>/",
		           	sorter: new sap.ui.model.Sorter("Rank", false),
		           	//filters: new sap.ui.model.Filter("Level", sap.ui.model.FilterOperator.EQ, 2),
		           	template: new sap.m.ColumnListItem({
		           		cells: [
		           		        new sap.m.Label({ text: "{rank>Rank}" }),
		           		        new sap.m.HBox({
		           		        	items: [
		           		        	        /*new sap.m.Image({
		           		        	        	src: "images/persons/img_contacts_03.png",
		           		        	        	width: "48px",
		           		        	        	height: "48px"
		           		        	        }).addStyleClass("palyerImage"),*/
		           		        	        new sap.m.VBox({
		           		        	        	items: [
		           		        	        	        new sap.m.Text({text: "{rank>UName}" }).addStyleClass("playerName"),
		           		        	        	        new sap.m.Text({
		           		        	        	        	text: {
		           		        	        	        		path: "rank>KickDate",
		           		        	        	        		formatter: function(v){
		           		        	        	        			return v.substr(0, 10);
		           		        	        	        		}
		           		        	        	        	}//"{rank>KickDate}"
		           		        	        	        }).addStyleClass("playerValue")
		           		        	        	        ]
		           		        	        })
		           		        	        ]
		           		        }),
		           		        new sap.m.HBox({
		           		        	items: new sap.m.VBox({
		           		        	        	items: [
		           		        	        	        new sap.m.Text({
		           		        	        	        	text: {
		           		        	        	        		path: "rank>StrScore",
		           		        	        	        		formatter: function(v){
		           		        	        	        			return "用时: "+v;
		           		        	        	        		}
		           		        	        	        	}//"{rank>StrScore}"
		           		        	        	        }).addStyleClass("playerName"),
		           		        	        	        new sap.m.Text({
		           		        	        	        	text: {
		           		        	        	        		path: "rank>Exchange",
		           		        	        	        		formatter: function(v){
		           		        	        	        			return "交换次数: "+v;
		           		        	        	        		}
		           		        	        	        	}//"{rank>Exchange}"
		           		        	        	        }).addStyleClass("playerValue")
		           		        	        	        ]
		           		        	        })
		           		        })
		           		        ]
		           	})/*.addStyleClass("sapUiSizeCompact")*/
		           },
		});
		
 		return new sap.m.Page("page_score", {
			customHeader: new sap.m.Bar({
 				contentLeft: [
				               new sap.m.Button("btn_score_back", {
				            	   icon: "sap-icon://nav-back",
				            	   visible: "{device>/isPhone}",
				            	   press: oController.onScoreNavBack
				               })
				               ],
				contentMiddle: [
				                new sap.m.Label({
				                	text: "Score"
				                })
				                ],
				contentRight: [
				               new sap.m.Button({
				            	   icon: "sap-icon://employee",
				            	   press: oController.onPersRank
				               })				               
				               ]
			}).addStyleClass("headerBar"),
			showFooter: true,
			footer: //new sap.m.OverflowToolbar({
				new sap.m.Bar({
				contentRight: [
				          //new sap.m.ToolbarSpacer(),
				          new sap.m.Button("button_hit",{
				        	  visible: {
				        		  parts: [
				        		          { path: "score>/scoreMode" },
				        		          { path: "score>/bPass" }
				        		          ],
				        		  formatter: function(mode, bPass){
				        			  if(mode && bPass)
				        				  return true;
				        			  return false;
				        		  }
				        	  },
				          	  icon: "sap-icon://competitor",
				           	  text: "Hit",
				           	  type: "Emphasized",
				           	  /*layoutData: new sap.m.OverflowToolbarLayoutData({
				           		  moveToOverflow: false
				           	  }),*/
				           	  press: oController.onHit
				          }),
				          new sap.m.Button("button_share",{
				           	  icon: "sap-icon://share-2",
				           	  text: "Share",
				           	  type: "Accept",
				           	  /*layoutData: new sap.m.OverflowToolbarLayoutData({
				           		  moveToOverflow: false
				           	  }),*/
				           	  press: oController.onShare
				          }),
				          new sap.m.Button("button_replay",{
				        	  visible: {
				        		  path: "score>/id",
				        		  formatter: function(v){
				        			  if(v)
				        				  return true;
				        			  return false;
				        		  }
				        	  },
			            	  icon: "sap-icon://share",
			            	  text: "Replay",
			            	  /*layoutData: new sap.m.OverflowToolbarLayoutData({
				           		  moveToOverflow: true
				           	  }),*/
			            	  press: oController.onReplay
			              })  
				         ]
			}),
			content: [
			          oObjectHeader,
			          //oPanel
			          oTable
			          ]
		});
	}

});