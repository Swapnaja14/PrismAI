import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';
import {MyContext} from './MyContext.jsx';
import './App.css';
import {v1 as uuidv1} from "uuid";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply]= useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());

  const providerValues = {
      prompt, setPrompt,
      reply, setReply,
      currThreadId, setCurrThreadId
  };

  return (
    <div className='app'>
      <MyContext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  );
};

export default App;