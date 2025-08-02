import React, { useState, useRef, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Navbar({ gameStarted, onGoHome, user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Закрыть меню при клике вне его
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      alert('Помилка при виході: ' + error.message);
    }
  };

  return (
    <nav style={styles.nav}>
      {/* Логотип */}
      <div style={styles.logo}>
        <span role="img" aria-label="logo" style={{ fontSize: '1.8rem' }}>📚</span>
        <span style={{ marginLeft: 8, fontWeight: 'bold', fontSize: '1.2rem' }}>LearnEnglishKids</span>
      </div>

      {/* Правая часть */}
      <div style={styles.rightSide}>
        {gameStarted && (
          <button style={styles.homeButton} onClick={onGoHome}>Головна</button>
        )}
        <div style={styles.avatarWrapper} ref={menuRef}>
          <img
            src={user?.avatarUrl || 'https://i.pravatar.cc/150?img=1'}
            alt="avatar"
            style={styles.avatar}
            onClick={toggleMenu}
          />
          {menuOpen && (
            <div style={styles.dropdown}>
              <button style={styles.dropdownItem} onClick={() => { alert('Профіль'); setMenuOpen(false); }}>
                Профіль
              </button>
              <button style={styles.dropdownItem} onClick={() => { alert('Налаштування'); setMenuOpen(false); }}>
                Налаштування
              </button>
              <button style={styles.dropdownItem} onClick={handleLogout}>
                Вийти з додатку
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    height: '60px',
    backgroundColor: '#f48fb1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1rem',
    fontFamily: '"Comic Sans MS", cursive',
    color: '#fff',
    position: 'relative',
    zIndex: 10,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  rightSide: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    position: 'relative',
  },
  homeButton: {
    backgroundColor: '#ce93d8',
    border: 'none',
    borderRadius: '20px',
    padding: '0.4rem 1rem',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  avatarWrapper: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'visible',
    border: '2px solid #fff',
    position: 'relative',
    cursor: 'pointer',
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  dropdown: {
    position: 'absolute',
    top: '50px',
    right: 0,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    minWidth: '140px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 20,
  },
  dropdownItem: {
    padding: '10px 15px',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#333',
    borderBottom: '1px solid #eee',
  }
};

export default Navbar;