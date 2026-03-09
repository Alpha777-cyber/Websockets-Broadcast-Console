import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({port:8000});
//0:connecting
//1:Open
//2.Close
//3.Closed
wss.on('connection',(socket,request)=>{
    const ip = request.socket.remoteAddress;

    socket.on('message',(rawData)=>{
        const message = rawData.toString();
        console.log({ rawData});

        wss.clients.forEach((client)=>{
            if(client.readyState == WebSocket.OPEN) client.send(`sever broadcast :${message}`); 
        })
    });

    socket.on('error',(err)=>{
        console.error(`Error: ${err.message}: ${ip}`);
    });

    socket.on('close',()=>{
        console.log('Client disconnected');
    });

});

console.log("Websocket server is live on ws://localhost:8000");
