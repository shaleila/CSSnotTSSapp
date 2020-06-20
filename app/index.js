import document from "document";
import * as messaging from "messaging";

const TIME_LENGTH = "HH:MM".length;

// Fetch UI elements we will need to change
let texttLabel = document.getElementById("textt");
let timeeLabel = document.getElementById("timee");
let prompttLabel = document.getElementById("promptt");
let bgg = document.getElementById("bgg");

// Initialize the UI with some values
texttLabel.text = "It's been in for";
timeeLabel.text = "--:--";
prompttLabel.text = "...";



// begin primary function   
    
messaging.peerSocket.onmessage = function(evt) {
  //let time = evt.data.value;
  const time = JSON.parse(evt.data.newValue).name
  console.log(`Time set to: ${time}`);

  
  // check time is valid and calculate difference in hh:mm
  
    if (time.length === TIME_LENGTH) {
    
      var rawcurrenttime = new Date();
      var formattedcurrenttime = rawcurrenttime.getHours() + ":" + rawcurrenttime.getMinutes();
      var starttime= time;
      var ary1=starttime.split(':'),ary2=formattedcurrenttime.split(':');
      var minsdiff=parseInt(ary2[0],10)*60+parseInt(ary2[1],10)-parseInt(ary1[0],10)*60-parseInt(ary1[1],10);
      var finaldiff = String(100+Math.floor(minsdiff/60)).substr(1)+':'+String(100+minsdiff%60).substr(1);
      console.log("final time diff: " + finaldiff);
    
      timeeLabel.text = finaldiff

     } 
      else {
        console.log(`Error: Time not valid`);
        timeeLabel.text = "Error"
     }
  
  
        // convert time diff to decimal 
        var arr = finaldiff.split(':');
        var dec = parseInt((arr[1]/6)*10, 10);
        var decimalfied = parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec);  
        console.log("decimal: " + decimalfied);
  
  
      // conditionally set bg color and prompt according to time 
      if (decimalfied < 4) {
        prompttLabel.text = "No worries!";
        bgg.style.fill = "fb-green";
        } 
      else if (decimalfied >= 5 && decimalfied < 7) {
        prompttLabel.text = "Still good!";
        bgg.style.fill = "fb-peach";
        } 
      else if (decimalfied >= 7 && decimalfied < 8) {
        prompttLabel.text = "Change soon";
        bgg.style.fill = "fb-orange";
        } 
      else if (decimalfied >= 8) {
        prompttLabel.text = "CHANGE NOW";
        bgg.style.fill = "fb-red";
        }
    

};







// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
};
