const statusEL = document.getElementById("status");
const log = document.getElementById("log");
const input = document.getElementById("message-input");
        
//1.initiate the handshake
//the firtst step
const socket = new WebSocket('ws://localhost:8000');

const appendLog = (label,message)=>{
    const entry =  `${new Date().toLocaleTimeString()} ${label} ${message} \n`
      log.textContent = entry + log.textContent;
    }

socket.addEventListener('open',()=>{
    statusEL.textContent = 'CONNECTED: ws://localhost:8000';
    statusEL.className = 'status-on';
    appendLog('[SYSTEM]','Tunnel Established.');
})

socket.addEventListener('close',()=>{
    statusEL.textContent = 'DISCONNECTED';
    statusEL.className = 'status-off'
    appendLog('[SYSTEM]','Tunnel Collapsed');
})

socket.addEventListener('message',(e)=>{
    appendLog('[RECIEVED]', e.data);
})

document.getElementById('message-form')
 .addEventListener('submit',(e) =>{
    e.preventDefault();

    if(socket.readyState != WebSocket.OPEN){
        appendLog('[ERROR','No active tunnel found.');
    }

    const msg = input.ariaValueMax.trim();
    socket.send(msg);
    appendLog('[SENT],msg')
    input.value = "";
 })
