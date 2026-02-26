import React, { useContext, useState } from 'react'
import Chat from './Chat.jsx';
import './ChatWindow.css';
import { MyContext } from './MyContext.jsx';
import {ScaleLoader} from "react-spinners";

const ChatWindow = () => {
  const {prompt, setPrompt, reply, setReply, currThreadId} = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const getReply = async(req, res) => {
      setLoading(true);
      console.log("message ", prompt, " threadId ", currThreadId);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          message: prompt,
          threadId: currThreadId
        })
      };

      try {
          const response = await fetch("http://localhost:8080/api/chat", options);
          const res = await response.json();
          console.log(res);
          setReply(res.reply);
      } 
      catch(error) {
          console.log(error);
      }
      setLoading(false);
  }
  return (
    <div className='chatWindow'>
        <div className="navbar">
          <span>PrismAI <i className="fa-solid fa-angle-down"></i></span>
          <div className="userIconDiv">
              <span className='userIcon'><i className="fa-solid fa-user"></i></span>
          </div>
        </div>
        <Chat></Chat>
        <ScaleLoader color='#ffffff' loading={loading}>
        </ScaleLoader>

        <div className="chatInput">
            <div className="inputBox">
                <input placeholder='Ask Anything' 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter'? getReply(): ''}
                >
                </input>
                <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
            </div>
            <div className="info">
                PrismAI can make mistakes. Check important info. See Cookie Preferences
            </div>
        </div>
    </div>
  )
}

export default ChatWindow;