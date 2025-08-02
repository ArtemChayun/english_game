import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Паролі не співпадають');
      setTimeout(() => setError(''), 4000);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Помилка при реєстрації. Можливо, цей email вже використовується.');
      setTimeout(() => setError(''), 4000);
    }
  };

  return (
    <div style={styles.container}>
      {error && (
        <div style={styles.errorOverlay}>
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} style={styles.form}>
        <h2 style={styles.title}>Реєстрація</h2>

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
        <input
          type="password"
          placeholder="Підтвердити пароль"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Зареєструватися</button>

        <p style={styles.loginText}>
          Вже є акаунт? <a href="/login" style={styles.link}>Увійти</a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fce4ec',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Comic Sans MS", cursive',
    position: 'relative'
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '320px',
    zIndex: 1
  },
  title: {
    textAlign: 'center',
    color: '#d81b60',
    marginBottom: '1.2rem',
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
    backgroundColor: '#ec407a',
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
  loginText: {
    textAlign: 'center',
    marginTop: '1rem'
  },
  link: {
    color: '#ec407a',
    textDecoration: 'none'
  }
};

export default RegisterPage;