import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import RobotProfileImage from '../assets/robot.png'
import LoadingSpinner from '../assets/loading-spinner.gif'
import './ChatMessages.css'

function ChatMessages({ 
  chatMessages, 
  isLoading 
  }) {

    function useAutoScroll(dependencies) {
        const ref = useRef(null)

        useEffect(() => {
          const containerHtmlElem = ref.current;
          if (containerHtmlElem) {
            containerHtmlElem.scrollTop = containerHtmlElem.scrollHeight
          }
        }, dependencies)

        return ref
      }
        
    const chatMessagesRef = useAutoScroll([chatMessages]);

    if (chatMessages.length === 0) {
      return (
        <div
          className="welcome-text"
        >
          Welcome to the chatbot project! Send a message using the textbox below
        </div>
      )
    }

    return (
      <div 
        className="chat-messages-container"
        ref={chatMessagesRef}
      >
        {chatMessages.map((chatMessages) => {
          return (
            <ChatMessage 
              message = {chatMessages.message}
              sender = {chatMessages.sender}
              time = {chatMessages.time}
              key = {chatMessages.id}
            />
          );
        })}
          {isLoading && (
            <div>
              <img 
                src={RobotProfileImage}
                width="45" 
              />
              <img 
                src={LoadingSpinner}
                className="loading"
              />
            </div>
          )}
      </div>
    );
};

export default ChatMessages;