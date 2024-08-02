// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewChat from './Components/InterviewChat';
import NotificationPage from './Components/NotificationPage';
import Header from './Components/Header';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route exact path="/" element={<InterviewChat />} />
          <Route path="/notifications" element={<NotificationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
