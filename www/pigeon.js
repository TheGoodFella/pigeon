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