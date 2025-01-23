import React from 'react'
import { useState } from 'react'
import styles from './Chat.module.css'


const Chat = () => {
  const [messages, setMessages] = useState([{ text: "What can I do? ", isUser: false }]);
  const [input, setInput] = useState('');
  
  const handleSend = async () => {
    if (input.trim()) {
      setInput('');
      setMessages([{ text: "Let me think...", isUser: false}, { text: input, isUser: true}, ...messages]);

      const response = await fetch('https://dkkq5s6pnrgihvccdsam66dz3q0tbxmw.lambda-url.us-east-1.on.aws/ ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: input.trim()}),
      });

      if (response.status !== 201 && response.status !== 200) {
        const data = await response.json()
        alert(data.message)
      }
      else {
        const data = await response.json();
        setMessages([{text: data, isUser: false}, { text: input, isUser: true}, ...messages]);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
    if (event.key === 'Escape') {
      setInput('');
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.messageContainer} ${message.isUser ? '' : styles.ai}`}>
            {!message.isUser && (
              <img
                src="/place.png"
                alt="profile"
                className={styles.profileImage}
                id='profileImage'
              />
            )}
            <div className={styles.message}>
              {message.text}
              {message.image && <img src={message.image} alt="message attachment" className={styles.messageImage} />}
            </div>
          </div>
        ))}
        <div className={`${styles.spacer}`}></div>
      </div>
      <div className={styles.inputContainer}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className={styles.input}
          placeholder='Explain it to me...'
          maxLength={60}
        />
        <button onClick={handleSend} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;