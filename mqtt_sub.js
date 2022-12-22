// Create a client instance: Broker, Port, Websocket Path, Client ID
client = new Paho.MQTT.Client("broker.hivemq.com", Number(8884), "/mqtt", "sfhlzrhdgosjzhf");

// set callback handlers
client.onConnectionLost = function (responseObject) {
    console.log("Connection Lost: "+responseObject.errorMessage);
}

client.onMessageArrived = function (message) {
  console.log("Message Arrived: "+message.payloadString);
  
  var arr = message.payloadString.split(" ")

  // document.getElementById("msg").innerHTML = message.payloadString;
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
	
	// Publish a Message
	// var message = new Paho.MQTT.Message("Message Payload");
	// message.destinationName = "multi/temp/TC-rt";
	// message.qos = 0;
	// client.send(message);
	
	// subscribe
	client.subscribe("multi/temp/TC-rt");
}

// Connect the client, providing an onConnect callback
client.connect({
	onSuccess: onConnect,
	useSSL: true
});


