sap.ui.define(
	["sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"],
	function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("orange.se.almq.controller.BaseController", {

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		onAvatarButtonPress: function () {
			var msg = this.getResourceBundle().getText("avatarButtonMessageToastText");
			MessageToast.show(msg);
		}
	});
});