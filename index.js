import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 6969 });
console.log(wss.address());
let message_number = 0;
wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    data = JSON.parse(data);
    console.log("Message number:  " + message_number);
    message_number++;
    console.log(data);
    if (data.event != undefined) {
      console.log(data.event);
    }
    if (data.thrust != undefined) {
      wss.clients.forEach(function here_each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ propel: data.thrust, data: data.data }));
        }
      });
    }
  });
});
