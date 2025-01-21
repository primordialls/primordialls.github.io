import { useState } from 'react'
import Chat from './Chat.jsx'
import styles from './App.module.css';

function App() {

  return (
    <div className={`${styles.modalContent}`}>
      <Chat/>
    </div>
  )
}

export default App
