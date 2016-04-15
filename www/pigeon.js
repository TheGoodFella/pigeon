var msgOthrPosY=0;
var msgMyPosY=0;

var ws = new WebSocket('ws://' + location.host + ':6969', 'echo-protocol');

ws.onopen = function (e) {
    console.log("Connected.");
}

ws.onmessage = function (data) {
    console.log("TRANSMISSION INCOMING");

    // Parses the message 
    msg = JSON.parse(data.data);
    msg.data = JSON.parse(msg.data);

    if (msg.cat == 'query') {
        console.log(msg.data);
    }
};

ws.onclose = function (e) {
    alert("Connection lost.");
};

function addothrmsg()
{
    console.log("adding msg by other...");
    
    var div = document.createElement('div');
    div.className="msgothr";
    div.textContent="message";
    document.getElementById("othmsg").appendChild(div);
}