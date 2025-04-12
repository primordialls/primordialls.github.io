import { useState, useEffect } from 'react'
import Chat from './Chat.jsx'
import styles from './App.module.css';
import { NavigationButton } from './NavigationButton.jsx';

function App() {
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const [isProfOpen, setIsProfOpen] = useState(false);
  const [input, setInput] = useState('');

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openResume = () => {
    if (input.trim() === "resume2") {
      setInput('');
      window.open('Elia_Doehler2.pdf');
    }
    else if (input.trim() === "resume3") {
      setInput('');
      window.open('Elia_Doehler3.pdf');
    }
    else {
      setInput('');
      window.open('Elia_Doehler.pdf');
    }
    
  };

  return (
    <>
      {isMobile && (
        <>
        {!isProfOpen && <button className={`${styles.menuButton} ${isLinksOpen ? styles.active : ``}`} onClick={() => setIsLinksOpen(prev => !prev)}>
          {isLinksOpen ? '❌' : '🔗'}
        </button>}
        {!isLinksOpen && <button className={`${styles.menuButton} ${styles.prof} ${isProfOpen ? styles.active : ``}`} onClick={() => setIsProfOpen(prev => !prev)}>
          {isProfOpen ? '❌' : '👤'}
        </button>}
        </>
      )}
      <div className={`${styles.profile} ${isProfOpen ? styles.open : ``}`}>
        <img src="splash.png" alt="Elia Doehler" className={styles.profileImage}/>
        <h1>Elia Döhler</h1>
        <h2>Software Engineer</h2>
        <hr />
        <p>Use the chat to find out cool things about me!</p>
        <hr />
        <p>Click the links to the right to see my LinkedIn, GitHub, or Resumé!</p>
        <hr />
        <NavigationButton
          text="Repo for this page"
          onClick={() => window.open('https://github.com/primordialls/primordialls.github.io')}
          repo={true}
        />
      </div>
      <div className={`${styles.links} ${isLinksOpen ? styles.open : ``}`}>
        <NavigationButton
          text="LinkedIn"
          onClick={() => window.open('https://www.linkedin.com/in/elia-doehler')}
        />
        <NavigationButton
          text="GitHub"
          onClick={() => window.open('https://github.com/primordialls')}
        />
        <NavigationButton
          text="Resumé"
          onClick={() => openResume()}
        />
      </div>
      <div className={`${styles.modalContent}`}>
        <Chat input={input} setInput={setInput}/>
      </div>
    </>
  )
}

export default App
