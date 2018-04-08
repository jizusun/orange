jQuery.sap.declare("sap.ui.sample.poa.util.formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

sap.ui.sample.poa.util.formatter = {
	
	_statusStateMap: {
		"Neu": "Warning",
		"待处理": "Success"
	},
	
	StatusState :  function (value) {
		return (value && sap.ui.sample.poa.util.formatter._statusStateMap[value]) ? sap.ui.sample.poa.util.formatter._statusStateMap[value] : "None";
	},
	
	OrderingStatusWithLabel : function (value){
		return "订单状态: " + value;
	},
	
	Quantity: function(value){
		try {
			return (value) ? parseFloat(value).toFixed(0) : value;
		} catch (err) {
			return "Not-A-Number";
		}		
	},
	
	Date: function(value){
		if(value){
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:"yyyy-MM-dd"});
			return oDateFormat.format(new Date(value));
		}
		else{
			return value;
		}
	},
	
	DateWithLabel: function(value){
		if(value){
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:"yyyy-MM-dd"});
			return "申请时间: " + oDateFormat.format(new Date(value));
		}
		else{
			return "申请时间: " + value;
		}
	},
	
	CreatorWithLabel: function(value){
		return "申请人: " + value;
	},
	
	OrderIdWithLabel: function(value){
		return "订单号: " + value;
	},

	ProductNameWithLabel: function(value){
		return "产品名称: " + value;
	},
	
	AttachmentMap: {
		"ppt" : "ppt-attachment",
		"pdf" : "pdf-attachment",
		"zip" : "attachment-zip-file"		
	},
	
	AttachmentIcon: function(value){
		var map = sap.ui.sample.poa.util.formatter.AttachmentMap;
		var code = (value && map[value]) ? map[value] : "question-mark";
		return "sap-icon://" + code;		
	}
};

