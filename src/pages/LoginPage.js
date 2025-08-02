import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../assets/google_logo.png'; // Імпортуємо іконку

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setErrorMessage('Невірна електронна адреса або пароль');
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      setErrorMessage('Помилка входу через Google');
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Вхід до акаунту</h2>

        {errorMessage && <div style={styles.error}>{errorMessage}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.loginButton}>Увійти</button>
        </form>

        <div style={styles.divider}></div>

        <button onClick={handleGoogleLogin} style={styles.googleButton}>
          <img src={googleLogo} alt="Google" style={styles.googleIcon} />
        </button>

        <p style={styles.bottomText}>
          Ще не маєте акаунту? <a href="/register" style={styles.link}>Зареєструватись</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#fce4ec',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Comic Sans MS", cursive',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#ec407a',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.8rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
  },
  loginButton: {
    padding: '0.8rem',
    backgroundColor: '#ec407a',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  googleButton: {
    marginTop: '1rem',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '50%',
    padding: '10px',
    width: '48px',
    height: '48px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  googleIcon: {
    width: '24px',
    height: '24px',
  },
  divider: {
    margin: '1rem 0',
    height: '1px',
    backgroundColor: '#eee',
  },
  bottomText: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.9rem',
  },
  link: {
    color: '#ec407a',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  error: {
    position: 'absolute',
    top: '-30px',
    left: 0,
    right: 0,
    margin: '0 auto',
    backgroundColor: '#ffcdd2',
    color: '#b71c1c',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    textAlign: 'center',
    width: '100%',
  }
};

export default LoginPage;