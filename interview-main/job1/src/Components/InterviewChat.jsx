// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const InterviewChat = () => {
//   const [questions, setQuestions] = useState([]); // State to hold all questions
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of current question
//   const [responses, setResponses] = useState([]); // Array to store user responses
//   const [currentResponse, setCurrentResponse] = useState(""); // Current user response
//   const [timer, setTimer] = useState(60); // Timer countdown for each question
//   const [totalScore, setTotalScore] = useState(null); // State to hold total score
//   const [difficulty, setDifficulty] = useState(1); // Difficulty level state
//   const [interviewFinished, setInterviewFinished] = useState(false); // Flag to indicate if interview is finished
//   const [levelCleared, setLevelCleared] = useState(null); // State to indicate cleared level

//   useEffect(() => {
//     fetchQuestions();
//   }, [difficulty]);

//   // Function to fetch questions from backend
//   const fetchQuestions = async () => {
//     try {
//       const response = await axios.post(
//         "http://172.17.15.233:5001/user/getQuestions",
//         {
//           difficulty: difficulty,
//           job_id: 1,
//           js_id: 4,
//         }
//       );

//       // Extract questions from response and update state
//       const fetchedQuestions = Object.values(response.data); // Assuming your response data is an object with numeric keys
//       setQuestions(fetchedQuestions);
//       setInterviewFinished(false); // Reset interview finished flag
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   };

//   // Function to submit user's response
//   const submitResponse = () => {
//     const updatedResponses = [...responses];
//     updatedResponses[currentQuestionIndex] = currentResponse;
//     setResponses(updatedResponses);
//     setCurrentResponse("");
//     setTimer(60); // Reset timer for the next question

//     // Move to the next question if available, otherwise finish the interview
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       console.log("Interview finished:", responses);
//       setCurrentQuestionIndex(11);
//       evaluateAnswers(); // Call function to evaluate answers and send to backend
//     }
//   };

//   // Function to evaluate answers and send to backend
//   const evaluateAnswers = async () => {
//     const queArray = questions.slice(0, 10); // Assuming you want to evaluate first 10 questions
//     const ansArray = responses.slice(0, 10); // Assuming you want to evaluate responses for first 10 questions

//     try {
//       const response = await axios.post(
//         "http://172.17.15.233:5001/user/evaluateAnswers",
//         {
//           questions: queArray,
//           answers: ansArray,
//         }
//       );

//       console.log("Evaluation Result:", response.data);
//       setTotalScore(response.data.Total_Score); // Store total score in state
//       if (response.data.Total_Score >= 3) {
//         setLevelCleared(difficulty); // Set the cleared level
//       } else {
//         setInterviewFinished(true); // Interview finished if score is below threshold
//       }
//     } catch (error) {
//       console.error("Error evaluating answers:", error);
//     }
//   };

//   // Effect to handle timer countdown
//   useEffect(() => {
//     let interval;
//     if (timer > 0) {
//       interval = setInterval(() => {
//         setTimer(timer - 1);
//       }, 1000);
//     } else {
//       submitResponse();
//     }

//     return () => clearInterval(interval);
//   }, [timer]);

//   // Handle progression to the next difficulty level or HR round
//   useEffect(() => {
//     if (totalScore !== null && totalScore >= 3) {
//       if (difficulty < 3) {
//         // Move to the next difficulty level
//         setDifficulty(difficulty + 1);
//         // Reset questions and responses for the next level
//         setQuestions([]);
//         setResponses([]);
//         setCurrentQuestionIndex(0);
//         fetchQuestions(); // Fetch new questions for the next level
//       } else {
//         // Qualified for HR round
//         setInterviewFinished(true);
//       }
//     }
//   }, [totalScore]);

//   // Handle clearing level notification
//   useEffect(() => {
//     if (levelCleared !== null) {
//       setTimeout(() => {
//         setLevelCleared(null); // Clear the level cleared notification after 3 seconds
//       }, 3000);
//     }
//   }, [levelCleared]);

//   // Conditional rendering based on total score and interview finish
//   let resultDisplay = null;
//   if (totalScore !== null) {
//     if (interviewFinished) {
//       resultDisplay = (
//         <div>
//           <h3 className="text-xl font-bold mb-2 text-red-600">Interview Not Cleared</h3>
//           <p className="text-gray-700">You did not meet the required threshold for this level.</p>
//         </div>
//       );
//     } else if (totalScore >= 3) {
//       resultDisplay = (
//         <div>
//           <h3 className="text-green-600 font-bold text-lg">Congratulations!</h3>
//           <p className="text-gray-700">You have passed to Difficulty Level {difficulty}.</p>
//         </div>
//       );
//     } else {
//       resultDisplay = (
//         <div>
//           <h3 className="text-red-600 font-bold text-lg">Not Selected</h3>
//           <p className="text-gray-700">Your score is below the required threshold.</p>
//         </div>
//       );
//     }
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Interview Chat</h2>
//       {/* Level indicator */}
//       <div className="mb-4">
//         Current Level: {difficulty}
//       </div>
//       <div className="chat-box mb-4">
//         {/* Display current question and responses */}
//         {questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
//           <div key={index} className="message mb-4 p-4 bg-gray-100 rounded-lg">
//             <div className="question mb-2 text-gray-800">
//               Q{index + 1}: {question}
//             </div>
//             {responses[index] && (
//               <div className="response text-gray-700">A: {responses[index]}</div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Start interview button */}
//       {questions.length > 0 && currentQuestionIndex === 0 && (
//         <button
//           className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
//           onClick={() => setCurrentQuestionIndex(0)}
//         >
//           Start Interview
//         </button>
//       )}

//       {/* Display current question and response textarea */}
//       {currentQuestionIndex < questions.length && (
//         <div className="textarea-container mb-4 overflow-hidden">
//           <div className="question mb-2">
//             <strong className="font-semibold">Current Question:</strong> {questions[currentQuestionIndex]}
//           </div>
//           <textarea
//             rows="4"
//             className="w-full p-2 rounded-lg border border-gray-300 resize-none"
//             value={currentResponse}
//             onChange={(e) => setCurrentResponse(e.target.value)}
//             placeholder="Type your response here..."
//           ></textarea>
//           <div className="flex items-center mt-2">
//             <button
//               className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2"
//               onClick={submitResponse}
//               disabled={!currentResponse.trim()}
//             >
//               Submit Response
//             </button>
//             <span className="timer text-gray-600">Time left: {timer} seconds</span>
//           </div>
//         </div>
//       )}

//       {/* Display message when interview is finished */}
//       {interviewFinished && (
//         <div>
//           {resultDisplay}
//         </div>
//       )}

//       {/* Notification for cleared level */}
//       {levelCleared && (
//         <div className="absolute top-0 right-0 m-4">
//           <div className="bg-green-500 text-white py-2 px-4 rounded-lg">
//             Level {levelCleared} Cleared!
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterviewChat;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotificationPage from "./NotificationPage"; // Adjust import path as needed

const InterviewChat = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [timer, setTimer] = useState(60);
  const [totalScore, setTotalScore] = useState(null);
  const [difficulty, setDifficulty] = useState(1);
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [levelCleared, setLevelCleared] = useState(null);
  const [notificationMessages, setNotificationMessages] = useState([]); // State for notifications

  const navigate = useNavigate(); // React Router's navigate hook

  useEffect(() => {
    fetchQuestions();
  }, [difficulty]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.post(
        "http://172.17.15.233:5001/user/getQuestions",
        {
          difficulty: difficulty,
          job_id: 1,
          js_id: 4,
        }
      );

      const fetchedQuestions = Object.values(response.data);
      setQuestions(fetchedQuestions);
      setInterviewFinished(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const submitResponse = () => {
    const updatedResponses = [...responses];
    updatedResponses[currentQuestionIndex] = currentResponse;
    setResponses(updatedResponses);
    setCurrentResponse("");
    setTimer(60);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(11);
      evaluateAnswers();
    }
  };

  const evaluateAnswers = async () => {
    const queArray = questions.slice(0, 10);
    const ansArray = responses.slice(0, 10);

    try {
      const response = await axios.post(
        "http://172.17.15.233:5001/user/evaluateAnswers",
        {
          questions: queArray,
          answers: ansArray,
        }
      );

      setTotalScore(response.data.Total_Score);
      if (response.data.Total_Score >= 4) {
        setLevelCleared(difficulty);
        addNotification(`Level ${difficulty} Cleared!`);
      } else {
        setInterviewFinished(true);
        navigate("/notifications", {
          state: { key: "Interview Not Cleared" },
        }); 
      }
    } catch (error) {
      console.error("Error evaluating answers:", error);
    }
  };

  const addNotification = (message) => {
    setNotificationMessages([...notificationMessages, message]);
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      submitResponse();
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (totalScore !== null && totalScore >= 3) {
      if (difficulty < 3) {
        setDifficulty(difficulty + 1);
        setQuestions([]);
        setResponses([]);
        setCurrentQuestionIndex(0);
        fetchQuestions();
      } else {
        setInterviewFinished(true);
        addNotification("Selected for HR Round");
        navigate("/notifications"); // Navigate to notifications page
      }
    }
  }, [totalScore]);

  useEffect(() => {
    if (levelCleared !== null) {
      setTimeout(() => {
        setLevelCleared(null);
      }, 3000);
    }
  }, [levelCleared]);

  let resultDisplay = null;
  if (totalScore !== null) {
    if (interviewFinished) {
      resultDisplay = (
        <div>
          <h3 className="text-xl font-bold mb-2 text-red-600">
            Interview Not Cleared
          </h3>
          <p className="text-gray-700">
            You did not meet the required threshold for this level.
          </p>
        </div>
      );
    } else if (totalScore >= 3) {
      resultDisplay = (
        <div>
          <h3 className="text-green-600 font-bold text-lg">Congratulations!</h3>
          <p className="text-gray-700">
            You have passed to Difficulty Level {difficulty}.
          </p>
        </div>
      );
    } else {
      resultDisplay = (
        <div>
          <h3 className="text-red-600 font-bold text-lg">Not Selected</h3>
          <p className="text-gray-700">
            Your score is below the required threshold.
          </p>
        </div>
      );
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Interview Chat</h2>
      <NotificationPage
        messages={notificationMessages}
        addNotification={addNotification}
      />
      <div className="chat-box mb-4">
        {questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
          <div key={index} className="message mb-4 p-4 bg-gray-100 rounded-lg">
            <div className="question mb-2 text-gray-800">
              Q{index + 1}: {question}
            </div>
            {responses[index] && (
              <div className="response text-gray-700">
                A: {responses[index]}
              </div>
            )}
          </div>
        ))}
      </div>

      {questions.length > 0 && currentQuestionIndex === 0 && (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
          onClick={() => setCurrentQuestionIndex(0)}
        >
          Start Interview
        </button>
      )}

      {currentQuestionIndex < questions.length && (
        <div className="textarea-container mb-4 overflow-hidden">
          <div className="question mb-2">
            <strong className="font-semibold">Current Question:</strong>{" "}
            {questions[currentQuestionIndex]}
          </div>
          <textarea
            rows="4"
            className="w-full p-2 rounded-lg border border-gray-300 resize-none"
            value={currentResponse}
            onChange={(e) => setCurrentResponse(e.target.value)}
            placeholder="Type your response here..."
          ></textarea>
          <div className="flex items-center mt-2">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2"
              onClick={submitResponse}
              disabled={!currentResponse.trim()}
            >
              Submit Response
            </button>
            <span className="timer text-gray-600">
              Time left: {timer} seconds
            </span>
          </div>
        </div>
      )}

      {interviewFinished && <div>{resultDisplay}</div>}

      {levelCleared && (
        <div className="absolute top-0 right-0 m-4">
          <div className="bg-green-500 text-white py-2 px-4 rounded-lg">
            Level {levelCleared} Cleared!
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewChat;
