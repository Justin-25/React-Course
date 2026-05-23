import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import { ChatInput } from './components/ChatInput'

import ChatMessages from './components/ChatMessages'
import RobotProfileImage from './assets/robot.png'
import UserProfileImage from './assets/user.png'
import LoadingSpinner from './assets/loading-spinner.gif'

import './App.css'

function App() {

  // Array Destructuring
  const [chatMessages, setChatMessages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="app-container">
      <ChatMessages 
        chatMessages = {chatMessages}
        isLoading={isLoading}
      />

      <ChatInput 
        chatMessages = {chatMessages}
        setChatMessages = {setChatMessages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      /> 
    </div>
  );
}

export default App
