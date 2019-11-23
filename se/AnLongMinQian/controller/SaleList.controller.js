sap.ui.define([
	'orange/se/almq/controller/BaseController',
	'sap/ui/model/json/JSONModel',
	'sap/ui/model/Filter',
	'orange/se/almq/model/formatter'
], function (BaseController, JSONModel, Filter, formatter) {
	"use strict";

	return BaseController.extend("orange.se.almq.controller.SaleList", {

		formatter: formatter,

		onInit: function(){
			this.getRouter().attachRouteMatched(this.onRouteMatched, this);
		},

		onRouteMatched: function(oEvent){

		}
	});
});