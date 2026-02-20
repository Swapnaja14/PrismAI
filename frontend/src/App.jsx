import React from 'react';
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';
import MyContext from './MyContext.jsx';

const App = () => {
  const providerValues = {};
  return (
    <div className='app'>
        <MyContext value={providerValues}></MyContext>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
    </div>
  )
}

export default App
