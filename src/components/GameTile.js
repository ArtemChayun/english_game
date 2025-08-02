import React from 'react';

function GameTile({ title, icon, onClick }) {
  return (
    <div style={styles.tile} onClick={onClick} tabIndex={0} role="button" onKeyDown={e => e.key === 'Enter' && onClick()}>
      <div style={styles.icon}>{icon}</div>
      <h3 style={styles.title}>{title}</h3>
      <button style={styles.playButton} onClick={e => { e.stopPropagation(); onClick(); }}>
        Грати
      </button>
    </div>
  );
}

const styles = {
  tile: {
    backgroundColor: '#f8bbd0',
    borderRadius: '12px',
    padding: '1rem',
    width: '180px',
    height: '200px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    textAlign: 'center',
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: '3rem',
    marginBottom: '0.5rem',
  },
  title: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#880e4f',
    flexGrow: 1,
  },
  playButton: {
    backgroundColor: '#ec407a',
    border: 'none',
    borderRadius: '20px',
    padding: '0.5rem 1rem',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  }
};

export default GameTile;