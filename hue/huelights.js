module.exports = function(RED) {
function HueLightNode(config){
	RED.nodes.createNode(this,config);
        var node = this;
	this.on('input', function(msg) {
	var hue = require('node-hue-api'),
	HueApi = hue.HueApi, lightState = hue.lightState;
var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};

var host = config.bridge,
    username = config.user,
    api = new HueApi(host, username),
    state = lightState.create();
	device = config.device;
	switch(msg.payload) {
		case "on":
		api.setLightState(device, state.on())
    		.then(displayResult)
    		.fail(displayError)
    		.done();
		break;
		case "off":
		api.setLightState(device, state.off())
    		.then(displayResult)
    		.fail(displayError)
    		.done();
		break;
		default:
		try{
		var json = JSON.parse(msg.payload);
		console.log(msg.payload);
		if(json != null)
		{
			if(json.hasOwnProperty('status') && json.hasOwnProperty('deviceid'))
			{
				device = json.deviceid;
				console.log("deviceId" + device);
			if (json.hasOwnProperty('colorRed')&& json.hasOwnProperty('colorGreen') && json.hasOwnProperty('colorBlue'))
			{
			console.log("rgb");
			state = lightState.create().on().rgb(json.colorRed,json.colorGreen,json.colorBlue);
}

				if(json.status == "on")
				{
				api.setLightState(json.deviceid, state.on()).then(displayResult).fail(displayError).done();
								
				}else if(json.status == "off")
				{
				api.setLightState(json.deviceid, state.off()).then(displayResult).fail(displayError).done();
			
				}
			if(json.hasOwnProperty('colorTemp') && json.hasOwnProperty('brightPercent'))
			{
			state = lightState.create().on().white(json.colorTemp, json.brightPercent);
			console.log("not colorTemp");
			
			}
			break;}
			if(device != "")
			{			
			// Using a promise
			api.setLightState(device, state)
    			.then(displayResult)
    			.done();
			}
		}}
		catch(ex){
		console.log(ex);
}
		break;
	}
	
	        
});
    
}

    RED.nodes.registerType("huelights",HueLightNode);
}


