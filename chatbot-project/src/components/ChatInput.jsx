import { useState } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from 'dayjs';
import './ChatInput.css'

export function ChatInput({ 
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
        sender: 'user',
        time: dayjs().valueOf()
      }
    ];

    setChatMessages(newChatMessages);
    setInputText('');
    setIsLoading(true);
    
    try {
      
      const response = await Chatbot.getResponseAsync(inputText);
      setChatMessages([
        ...newChatMessages,
        {
          id: crypto.randomUUID(),
          message: response,
          sender: 'robot',
          time: dayjs().valueOf()
        }
      ]);
      
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  function key(event) {
    if (event.key === 'Enter') {
      sendMessage()
    } else if (event.key === 'Escape') {
      setInputText('')
    }
  }


  // Clears chat messages from state: setChatMessages([])
  // Clears localStorage: localStorage.setItem('messages', JSON.stringify([]))
  function removeAll() {
    setChatMessages([]);
    localStorage.setItem('messages', JSON.stringify([]));
    // The reload() method of the Location interface reloads the current URL, like the Refresh button.
    window.location.reload()
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
      <button
        className="clear-button"
        onClick={removeAll}
      >
        Clear
      </button>
    </div>
  );
}