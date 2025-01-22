import { useState,useEffect } from 'react';
import {io} from 'socket.io-client';


const socket = io('http://localhost:3000');
const App = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

useEffect(()=>{
  // receive messages
  socket.on('message', (message) => {
    setMessages([...messages, message]);
  });


  // cleanoff functions
  return () => {
    socket.off("message");
  }
},[messages]);

const sendMessage = () => {
  if(messageInput.trim() === ''){
    return;
  }
  socket.emit('message', messageInput);
  setMessageInput('');

}


  return (
    <div>
      <h1>Simple Chat App</h1>

      <input type="text" value={messageInput} onChange={(e)=>{setMessageInput(e.target.value)}} placeholder='Type your message...'/>

      <button onClick={sendMessage}>Send</button>

      {/* render all the messages */}
      <section>

      {messages.map((message, index)=>{
        return <div key={index}>{message}</div>
      })}
      </section>
    </div>
  )
}

export default App