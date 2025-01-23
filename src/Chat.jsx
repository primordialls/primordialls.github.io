import React from 'react';
import { useState } from 'react'
import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import styles from './Chat.module.css';

const Chat = () => {
  const [messages, setMessages] = useState([{ text: "What can I do for you? ", isUser: false }]);
  const [input, setInput] = useState('');
  const model = new ChatOpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    model: "gpt-4"
  });

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", "Act like a super drunk assistant that still wants to be helpful"],
    ["user", "{text}"],
  ]);
  
  const handleSend = async () => {
    if (input.trim()) {
      setInput('');
      setMessages([{ text: "Let me think...", isUser: false}, { text: input, isUser: true}, ...messages]);
      const promptValue = await promptTemplate.invoke({
        text: input,
      });
      const response = await model.invoke(promptValue);
      // if (response.status !== 201 && response.status !== 200) {
      //   const data = await response.json()
      //   alert(data.message)
      // }
      // else {
        setMessages([{text: response.content, isUser: false}, { text: input, isUser: true}, ...messages]);
      // }
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
          <div className={styles.messageWrap}>
            {!message.isUser && (
              <img
                src="./assets/place.jpeg"
                alt="profile"
                className={styles.profileImage} 
              />
            )}
            <div key={index} className={`${styles.message} ${message.isUser ? '' : styles.ai}`}>
              {message.text}
              {message.image && <img src={message.image} alt="message attachment" className={styles.messageImage} />}
            </div>
          </div>
        ))}
        <div className={`${styles.spacer}`}></div>
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className={styles.input}
          placeholder='Explain it to me...'
        />
        <button onClick={handleSend} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;