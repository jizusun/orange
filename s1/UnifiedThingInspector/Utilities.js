//var isPhone = jQuery.device.is.phone;
var isPhone = sap.ui.Device.system.phone;
var sDevice = isPhone ? "phone" : "desktop";

var isTablet = sap.ui.Device.system.tablet;
