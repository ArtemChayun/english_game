import React, { useState, useEffect, useRef } from 'react';
import GuessWordGame from './components/GuessWordGame';
import Navbar from './components/Navbar';
import GameTile from './components/GameTile';
import SpellWordGame from './components/SpellWordGame';
import './App.css';

const categories = [
  { id: 'animals', label: 'Тварини' },
  { id: 'food', label: 'Їжа' },
  //{ id: 'transport', label: 'Транспорт' },
  //{ id: 'furniture', label: 'Меблі' },
  //{ id: 'electronics', label: 'Електроніка' },
  //{ id: 'clothes', label: 'Одяг' },
  //{ id: 'nature', label: 'Природа' },
  //{ id: 'school', label: 'Школа' },
  //{ id: 'buildings', label: 'Будівлі' },
  { id: 'colors', label: 'Кольори' },
  { id: 'numbers', label: 'Цифри' },
 // { id: 'emotions', label: 'Емоції' },
  //{ id: 'body parts', label: 'Частини тіла' },
  //{ id: 'professions', label: 'Професії' },
  //{ id: 'sports', label: 'Спорт' },
  //{ id: 'verbs', label: 'Дії' }
];

function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const popupRef = useRef();

  const user = {
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    name: 'User'
  };

  const gamesList = [
    //{ id: 'guess-word', title: 'Угадай слово', icon: '📝' },
    { id: 'spell-word', title: 'Склади слово', icon: '✏️' },
    //{ id: 'memory', title: 'Пам\'ять', icon: '🧠' },
    //{ id: 'quiz', title: 'Вікторина', icon: '❓' },
    //{ id: 'puzzle', title: 'Пазл', icon: '🧩' },
    //{ id: 'flashcards', title: 'Флеш-картки', icon: '📇' },
    //{ id: 'typing', title: 'Тренажер набору', icon: '⌨️' },
  ];

  const startGame = (gameId) => {
    if (gameId === 'spell-word') {
      setShowCategoryPopup(true);
    } else {
      setCurrentGame(gameId);
    }
  };

  const exitGame = () => {
    setCurrentGame(null);
    setSelectedCategory(null);
  };

  const selectCategoryAndStart = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentGame('spell-word');
    setShowCategoryPopup(false);
  };

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowCategoryPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <Navbar
        gameStarted={!!currentGame}
        onGoHome={exitGame}
        onLogout={() => alert('Вийшли з додатку')}
        user={user}
      />

      {!currentGame ? (
        <div style={styles.gamesGrid}>
          {gamesList.map(game => (
            <GameTile
              key={game.id}
              title={game.title}
              icon={game.icon}
              onClick={() => startGame(game.id)}
            />
          ))}
        </div>
      ) : currentGame === 'guess-word' ? (
        <GuessWordGame onExit={exitGame} />
      ) : currentGame === 'spell-word' ? (
        <SpellWordGame onExit={exitGame} category={selectedCategory} />
      ) : (
        <div style={styles.placeholder}>
          <h2>Гра "{currentGame}" ще не реалізована</h2>
          <button onClick={exitGame} style={styles.backButton}>Повернутись до вибору ігор</button>
        </div>
      )}

      {showCategoryPopup && (
        <div className="popup-overlay">
          <div className="popup" ref={popupRef}>
            <button className="popup-close" onClick={() => setShowCategoryPopup(false)}>×</button>
            <h3>Оберіть категорію</h3>
            <div className="popup-categories">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => selectCategoryAndStart(cat.id)} className="popup-category-btn">
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  gamesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    padding: '2rem',
    backgroundColor: '#fce4ec',
    minHeight: '90vh',
    fontFamily: '"Comic Sans MS", cursive',
  },
  placeholder: {
    padding: '2rem',
    textAlign: 'center',
    fontFamily: '"Comic Sans MS", cursive',
  },
  backButton: {
    marginTop: '1rem',
    backgroundColor: '#ff80ab',
    border: 'none',
    borderRadius: '20px',
    padding: '0.7rem 1.5rem',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
  }
};

export default App;