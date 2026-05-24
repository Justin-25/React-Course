import { useEffect, useState } from 'react'
import { Chatbot } from 'supersimpledev'
import { ChatInput } from './components/ChatInput'

import ChatMessages from './components/ChatMessages'
import RobotProfileImage from './assets/robot.png'
import UserProfileImage from './assets/user.png'
import LoadingSpinner from './assets/loading-spinner.gif'

import './App.css'

function App() {

  // Array Destructuring
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Chatbot.addResponses({
      "Abby" : "Abby is the 3rd sibling in your Family Tree, Her nose is flat and she need to diet because of her weight.",
      "Readilyn" : "Readilyn is a Maldita and a proud Teacher in Mecareli soon to be a Public Teacher, She always rant about her work but on payday her smile is so big that it can reach her ear.",
    })
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages])

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
