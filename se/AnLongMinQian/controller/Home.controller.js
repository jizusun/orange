sap.ui.define([
	'orange/se/almq/controller/BaseController',
	'orange/se/almq/model/formatter',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator'
], function (BaseController, formatter, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("orange.se.almq.controller.Home", {
		formatter : formatter,

		onInit: function () {
			var oComponent = this.getOwnerComponent();
			this._router = oComponent.getRouter();
		},
		
		onNavButtonPress : function () {
			this.getOwnerComponent().myNavBack();
		}
	});
});