import React, { useState } from 'react';

const questions = [
  {
    image: 'https://cdn-icons-png.flaticon.com/512/415/415733.png',
    correct: 'apple',
    options: ['dog', 'apple', 'car']
  },
  {
    image: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    correct: 'cat',
    options: ['cat', 'banana', 'train']
  },
  {
    image: 'https://cdn-icons-png.flaticon.com/512/1998/1998611.png',
    correct: 'car',
    options: ['bike', 'bus', 'car']
  }
];

function GuessWordGame({ onExit }) {
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(null);

  const handleClick = (option) => {
    if (option === questions[current].correct) {
      setResult('✅ Правильно!');
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % questions.length);
        setResult(null);
      }, 1000);
    } else {
      setResult('❌ Ні, спробуй ще!');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Угадай слово по картинці</h2>
      <img src={questions[current].image} alt="guess" style={styles.image} />
      <div style={styles.options}>
        {questions[current].options.map((opt) => (
          <button key={opt} style={styles.button} onClick={() => handleClick(opt)}>
            {opt}
          </button>
        ))}
      </div>
      {result && <p style={styles.result}>{result}</p>}
      <button
        style={styles.exitButton}
        onClick={() => {
          console.log('Exit clicked');
          onExit();
        }}
      >
        Вийти на головну
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'Comic Sans MS',
  },
  image: {
    width: '150px',
    margin: '1rem'
  },
  options: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1rem'
  },
  button: {
    fontSize: '1.2rem',
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#ce93d8',
    color: '#fff',
  },
  result: {
    fontSize: '1.5rem',
    marginTop: '1rem'
  },
  exitButton: {
    marginTop: '2rem',
    padding: '0.5rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#ef9a9a',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer'
  }
};

export default GuessWordGame;