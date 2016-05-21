var Firebase = require("firebase");
var client = require('twilio')('AC679fb093906aea3cd107cfd8e7d97a88', '7b112f421e3262e475e48fd2f8aa226c');
var stolen = new Firebase("https://blazing-inferno-3828.firebaseio.com/New_York/Times_Square/Availability/a01/isStolen");
var phone = new Firebase("https://blazing-inferno-3828.firebaseio.com/New_York/Times_Square/Availability/a01/phone");

var bike_stolen;
var owner_phone;

phone.on("value", function(phoneSnapshot) {
  	owner_phone = String(phoneSnapshot.val());
  	console.log(owner_phone);
});

stolen.on("value", function(stolenSnapshot) {
  	bike_stolen = String(stolenSnapshot.val());
  	console.log(bike_stolen);
  	if(bike_stolen == "true") {
		console.log("sending text");
		 client.messages.create({
		 	body: "Your bike parked at Time Square Rack a01 is stolen or being modified!",
		 	to: owner_phone, // bike owner cell number
		 	from: "+18445152458" // twilio number
		 }, function(err, message) {
		 console.log(message);
		 });
	}
});




