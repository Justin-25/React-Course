import { useEffect, useRef, useState } from 'react'
import { Chatbot } from 'supersimpledev'
import './App.css'

function App() {

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

      function ChatInput({ 
        chatMessages, 
        setChatMessages,
        isLoading, 
        setIsLoading
      }) {
        // current data, Updater Function.
        const [inputText, setInputText] = useState('');

        function saveInputText(event) {
          setInputText(event.target.value)
        }
        
        async function sendMessage() {

          if(isLoading) {
            return
          }

          if(!inputText.trim()) {
            return
          }

          const newChatMessages = [
            ...chatMessages,
            {
              id: crypto.randomUUID(),
              message: inputText,
              sender: 'user'
            }
          ];

          setChatMessages(newChatMessages);
          setInputText('');
          setIsLoading(true);

          const response = await Chatbot.getResponseAsync(inputText);
          setChatMessages([
            ...newChatMessages,
            {
              id: crypto.randomUUID(),
              message: response,
              sender: 'robot'
            }
          ]);
          setIsLoading(false);
        }

        function key(event) {
          if (event.key === 'Enter') {
            sendMessage()
          } else if (event.key === 'Escape') {
            setInputText('')
          }
        }

        // return some html
        return (
          // div is to group elements to have a multiple elements
          <div className="chat-input-container">
            <input 
              placeholder="Send a message to Chatbot" 
              size="30"
              onChange={saveInputText}
              value={inputText} // Controlled Input
              onKeyDown={key}
              className="chat-input"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputText.trim()}
              className="send-button"
            >
            Send</button>
          </div>
        );
      }

      function ChatMessage({ 
        message, 
        sender,
      }) {

        return (
            <div className={
              sender === 'user' 
              ? "chat-message-user" 
              : "chat-message-robot"
            }>   
              {sender === 'robot' && (
                <img src="robot.png" 
                  className="chat-message-profile" 
                />
              )}
              <div className="chat-message-text">
                {message}
              </div>
              {sender === 'user' && (
                <img src="user.png" 
                  className="chat-message-profile" 
                />
              )}
            </div>
        )
      };

      function ChatMessages({ 
        chatMessages, 
        isLoading 
      }) {
        
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
                  key = {chatMessages.id}
                />
              );
            })}
              {isLoading && (
                <div>
                  <img 
                    src="robot.png" 
                    width="45" 
                  />
                  <img 
                    src="loading-spinner.gif"
                    className="loading"
                  />
                </div>
              )}
          </div>
        );
      };

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
}
export default App
