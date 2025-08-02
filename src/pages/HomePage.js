import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import GameTile from '../components/GameTile';
import GuessWordGame from '../components/GuessWordGame';
import SpellWordGame from '../components/SpellWordGame';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function HomePage({ user }) {
  const [currentGame, setCurrentGame] = useState(null);

  const gamesList = [
    { id: 'guess-word', title: 'Угадай слово', icon: '📝' },
    { id: 'spell-word', title: 'Склади слово', icon: '✏️' },
    { id: 'memory', title: 'Памʼять', icon: '🧠' },
    { id: 'quiz', title: 'Вікторина', icon: '❓' },
    { id: 'puzzle', title: 'Пазл', icon: '🧩' },
    { id: 'flashcards', title: 'Флеш-картки', icon: '📇' },
    { id: 'typing', title: 'Тренажер набору', icon: '⌨️' },
  ];

  const startGame = (gameId) => {
    setCurrentGame(gameId);
  };

  const exitGame = () => {
    setCurrentGame(null);
  };

  return (
    <>
      <Navbar
        user={user}
        gameStarted={!!currentGame}
        onGoHome={exitGame}
        onLogout={() => signOut(auth)}
      />

      {!currentGame ? (
        <div style={styles.gamesGrid}>
          {gamesList.map((game) => (
            <GameTile
              key={game.id}
              icon={game.icon}
              title={game.title}
              onClick={() => startGame(game.id)}
            />
          ))}
        </div>
      ) : currentGame === 'guess-word' ? (
        <GuessWordGame onExit={exitGame} />
      ) : currentGame === 'spell-word' ? (
        <SpellWordGame onExit={exitGame} />
      ) : (
        <div style={styles.placeholder}>
          <h2>Гра "{currentGame}" ще не реалізована</h2>
          <button onClick={exitGame} style={styles.backButton}>Повернутись до вибору ігор</button>
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
  },
};

export default HomePage;