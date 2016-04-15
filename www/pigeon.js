var msgPosY=0;
var yIncreaser=0;

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

function addrecmsg()
{    
    var div = document.createElement('div');
    div.className="messageRec";
    div.textContent="message received";
    document.getElementById("chat").appendChild(div);
}

function addsenmsg()
{
    var div = document.createElement('div');
    div.className="messageSen";
    div.textContent="message sent";
    document.getElementById("chat").appendChild(div);
}