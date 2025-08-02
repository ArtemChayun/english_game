import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import GameTile from './components/GameTile';
import GuessWordGame from './components/GuessWordGame';
import SpellWordGame from './components/SpellWordGame';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [user, setUser] = useState(null);

  const gamesList = [
    { id: 'guess-word', title: 'Угадай слово', icon: '📝' },
    { id: 'spell-word', title: 'Склади слово', icon: '✏️' },
    { id: 'memory', title: 'Пам\'ять', icon: '🧠' },
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

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const HomePage = () => (
    <>
      <Navbar
        gameStarted={!!currentGame}
        onGoHome={exitGame}
        onLogout={handleLogout}
        user={user ? {
          avatarUrl: `https://i.pravatar.cc/150?u=${user.uid}`,
          name: user.email
        } : null}
      />
      {!currentGame ? (
        <div style={styles.gamesGrid}>
          {gamesList.map((game) => (
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
        <SpellWordGame onExit={exitGame} />
      ) : (
        <div style={styles.placeholder}>
          <h2>Гра "{currentGame}" ще не реалізована</h2>
          <button onClick={exitGame} style={styles.backButton}>
            Повернутись до вибору ігор
          </button>
        </div>
      )}
    </>
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <HomePage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
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

export default App;