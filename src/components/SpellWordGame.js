import React, { useEffect, useState, useRef } from 'react';
import './SpellWordGame.css';
import wordsData from '../data/words.json'; // Твій JSON зі словами

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function SpellWordGame({ category = 'animals', onExit }) {
  const words = useRef(shuffleArray(wordsData.filter(w => w.category === category)));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [letterTiles, setLetterTiles] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [startTime] = useState(Date.now());
  const [mistakes, setMistakes] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const current = words.current[currentWordIndex];

  useEffect(() => {
    if (current) {
      const shuffled = shuffleArray(current.word.split('').map((letter, index) => ({
        id: `${letter}-${index}-${Math.random()}`,
        letter,
      })));
      setLetterTiles(shuffled);
      setUserAnswer([]);
      setFeedback('');
    }
  }, [currentWordIndex]);

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const handleLetterClick = (tile) => {
    if (!userAnswer.includes(tile)) {
      setUserAnswer([...userAnswer, tile]);
      setLetterTiles(letterTiles.filter(t => t.id !== tile.id));
    }
  };

  const handleAnswerClick = (tile) => {
    setUserAnswer(userAnswer.filter(t => t.id !== tile.id));
    setLetterTiles([...letterTiles, tile]);
  };

  const checkAnswer = () => {
    const answer = userAnswer.map(t => t.letter).join('');
    if (answer === current.word) {
      if (currentWordIndex + 1 < words.current.length) {
        setCurrentWordIndex(currentWordIndex + 1);
      } else {
        setShowResult(true);
      }
    } else {
      setFeedback('❌ Спробуй ще раз!');
      setMistakes(mistakes + 1);
      // Скинути відповідь
      setLetterTiles(prev => [...prev, ...userAnswer]);
      setUserAnswer([]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const tile = letterTiles.find(t => t.id === id);
    if (tile) handleLetterClick(tile);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text', id);
  };

  const getTimeSpent = () => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes} хв ${seconds % 60} сек`;
  };

  const closeResultPopup = () => {
    setShowResult(false);
    onExit(); // Повернутись на головну
  };

  return (
    <div className="game-container">
      <div className="word-counter">
        Слово {currentWordIndex + 1} із {words.current.length}
      </div>

      <div className="image-container">
        <img src={current.image} alt={current.word} />
      </div>

      <button className="speak-button" onClick={() => speakWord(current.word)}>🔊 Озвучити</button>

      <div
        className="answer-area drop-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {userAnswer.map((tile) => (
          <span
            key={tile.id}
            className="letter filled"
            onClick={() => handleAnswerClick(tile)}
            title="Клікніть, щоб прибрати букву"
          >
            {tile.letter}
          </span>
        ))}
      </div>

      <div className="tiles-area">
        {letterTiles.map(tile => (
          <button
            key={tile.id}
            className="letter"
            onClick={() => handleLetterClick(tile)}
            draggable
            onDragStart={(e) => handleDragStart(e, tile.id)}
          >
            {tile.letter}
          </button>
        ))}
      </div>

      <button className="check-button" onClick={checkAnswer}>Перевірити</button>

      <div className="feedback">{feedback}</div>

      {/* Попап результату */}
      {showResult && (
        <div className="result-popup">
          <div className="popup-content">
            <h2>🎉 Гру завершено!</h2>
            <p>🔤 Усього слів: <strong>{words.current.length}</strong></p>
            <p>❌ Помилок: <strong>{mistakes}</strong></p>
            <p>⏱️ Час: <strong>{getTimeSpent()}</strong></p>
            <button className="check-button" onClick={closeResultPopup}>Повернутись</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpellWordGame;