import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Неправильний email або пароль');
      setTimeout(() => setError(''), 4000);
    }
  };

  return (
    <div style={styles.container}>
      {/* Випливаюче повідомлення про помилку */}
      {error && (
        <div style={styles.errorOverlay}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Вхід</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Увійти</button>

        <p style={styles.registerText}>
          Немає акаунту? <a href="/register" style={styles.link}>Зареєструватися</a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fce4ec',
    fontFamily: '"Comic Sans MS", cursive',
    position: 'relative'
  },
  form: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '300px',
    zIndex: 1
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#d81b60'
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    width: '100%',
    background: '#ec407a',
    color: '#fff',
    border: 'none',
    padding: '0.6rem',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  errorOverlay: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ffcdd2',
    color: '#b71c1c',
    padding: '1rem 2rem',
    borderRadius: '6px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    fontWeight: 'bold',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-out'
  },
  registerText: {
    textAlign: 'center',
    marginTop: '1rem'
  },
  link: {
    color: '#ec407a',
    textDecoration: 'none'
  }
};

export default LoginPage;