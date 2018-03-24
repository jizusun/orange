jQuery.sap.declare("sap.ui.sample.poa.model.Config");

sap.ui.sample.poa.model.Config = {};

/**
 * Supply here the service url of the service to fetch data from
 */
sap.ui.sample.poa.model.Config.getServiceUrl = function () {
	return null;
};

/**
 *
 */
(function (){
	
	// The "reponder" URL parameter defines if the app shall run with mock data
	var responderOn = jQuery.sap.getUriParameters().get("responderOn");
	
	// set the flag for later usage
	sap.ui.sample.poa.model.Config.isMock = ("true" === responderOn) || !sap.ui.sample.poa.model.Config.getServiceUrl();
}
)();