var msgCount=0;

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

function addmsg(isSent)
{    
    var div = document.createElement('div');
    if(isSent)
        div.className="messageRec";
    else
        div.className="messageSen";
    if(isSent)
        div.textContent="message received";
    else
        div.textContent="message sent";
    div.id=msgCount.toString();
    msgCount++;
    $(div).appendTo("#chat");

     $(div).animate({
        color: "green"
    }, 200);

    $(div).animate({
        color: "black"
    }, 300);
}