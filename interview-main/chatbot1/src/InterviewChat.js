// src/InterviewChat.js
import React, { useState, useEffect } from 'react';
import './InterviewChat.css';
import axios from 'axios'
const InterviewChat = () => {
  const [questions] = useState([
    "Tell me about yourself.",
    "What are your strengths?",
    "What are your weaknesses?",
    "Why do you want to work here?",
    // Add more questions as needed
  ]);

const [que,setQue]=useState({})
  useEffect(()=>{

axios.post("http://172.17.15.233/user/getQuestions", {
    difficulty: 1,
    job_id: 1,
    js_id: 4
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });},[])
console.log(que)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [timer, setTimer] = useState(60); // Allocate 60 seconds for each question

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      submitResponse();
    }
  }, [timer]);

  const submitResponse = () => {
    console.log(responses)
    setResponses([...responses, currentResponse]);
    setCurrentResponse('');
    setTimer(60); // Reset timer for the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Interview finished:', responses);
      // Add logic to handle the end of the interview
    }
  };

  return (
    <div className="container">
      <h2>Interview Chat</h2>
      {/* <div className="chat-box">
        {questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
          <div key={index} className="message">
            <div className="question">Q{index + 1}: {question}</div>
            {responses[index] && (
              <div className="response">A: {responses[index]}</div>
            )}
          </div>
        ))}
      </div> */}
      {currentQuestionIndex < questions.length && (
        <div className="textarea-container">
          <div className="question"><strong>Current Question:</strong> {questions[currentQuestionIndex]}</div>
          <textarea
            rows="4"
            cols="16"
            value={currentResponse}
            onChange={(e) => setCurrentResponse(e.target.value)}
            placeholder="Type your response here..."
          ></textarea>
          <div className="buttons">
            <button onClick={submitResponse} disabled={!currentResponse.trim()}>Submit Response</button>
            <span className="timer">Time left: {timer} seconds</span>
          </div>
        </div>
      )}
      {currentQuestionIndex >= questions.length && (
        <div>
          <h3>Thank you for your responses!</h3>
          {/* You can add additional UI or logic here for submission */}
        </div>
      )}
    </div>
  );
};

export default InterviewChat;