all_locations = ["chambre", "couloir", "radiateur", "salon"];
all_types = ["humi", "temp"];

// Create a client instance: Broker, Port, Websocket Path, Client ID
client = new Paho.MQTT.Client("broker.hivemq.com", Number(8884), "/mqtt", "multitc"+Math.floor(Math.random()*1000000));


// set callback handlers
client.onConnectionLost = function (responseObject) {
    console.log("Connection Lost: "+responseObject.errorMessage);
}

client.onMessageArrived = function (message) {
  console.log("Message Arrived: "+message.payloadString);
  
  var arr = message.payloadString.split(" ")

  document.getElementById("chambre_temp").innerHTML = arr[0]+"°C";
  document.getElementById("couloir_temp").innerHTML = arr[1]+"°C";
  document.getElementById("radiateur_temp").innerHTML = arr[2]+"°C";
  document.getElementById("salon_temp").innerHTML = arr[3]+"°C";
  
  document.getElementById("chambre_humi").innerHTML = arr[4]+"%";
  document.getElementById("couloir_humi").innerHTML = arr[5]+"%";
  document.getElementById("radiateur_humi").innerHTML = arr[6]+"%";
  document.getElementById("salon_humi").innerHTML = arr[7]+"%";
}

// Called when the connection is made
function onConnect(){
	console.log("Connected!");
	
	// subscribe
	client.subscribe("multi/temp/TC-rt");
}

// Connect the client, providing an onConnect callback
client.connect({
	onSuccess: onConnect,
	useSSL: true
});


window.onload = function() {
	
	all_locations.forEach(loc => {
		all_types.forEach(type => {
			document.getElementById(loc+"_"+type).innerHTML = '<img src="loader.gif" alt="loader">';
		});
	});
};