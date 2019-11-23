sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/model/json/JSONModel',
    'orange/se/almq/model/models'
], function (UIComponent, JSONModel, models) {

	"use strict";

	return UIComponent.extend("orange.se.almq.Component", {

		metadata: {
			manifest: "json"
		},

		init: function () {
			// call overwritten init (calls createContent)
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			this.getRouter().initialize();
		},

		myNavBack: function () {
			var oHistory = sap.ui.core.routing.History.getInstance();
			var oPrevHash = oHistory.getPreviousHash();
			if (oPrevHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("home", {}, true);
			}
		}
	});
});
