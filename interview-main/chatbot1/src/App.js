
import React from 'react';
import Chatbot from 'react-chatbot-kit'
import './App.css';

import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';

import InterviewChat from './InterviewChat';

function App() {
  return (
    <div className="App">
      <InterviewChat/>
    </div>
  );
}

export default App;