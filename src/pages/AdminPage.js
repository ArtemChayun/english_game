import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Пример категорий (замени на свои)
const categories = [
  { id: 'animals', label: 'Тварини' },
  { id: 'food', label: 'Їжа' },
  { id: 'colors', label: 'Кольори' },
  { id: 'numbers', label: 'Цифри' },
  // добавляй сюда свои категории
];

export default function AdminPage() {
  const [word, setWord] = useState('');
  const [category, setCategory] = useState(categories.length > 0 ? categories[0].id : '');
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddWord = async () => {
    if (!word.trim() || !imageFile) {
      setMessage({ type: 'error', text: 'Будь ласка, заповніть усі поля.' });
      return;
    }

    setUploading(true);
    try {
      const imageRef = ref(storage, `words/${category}/${word.trim()}_${Date.now()}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, 'words'), {
        word: word.trim(),
        category,
        image: imageUrl,
      });

      setMessage({ type: 'success', text: 'Слово додано успішно!' });
      setWord('');
      setImageFile(null);
    } catch (error) {
      console.error('Помилка додавання слова:', error);
      setMessage({ type: 'error', text: 'Сталася помилка, спробуйте пізніше.' });
    }
    setUploading(false);
  };

  return (
    <div style={styles.container}>
      <h2>Адмін панель — Додати слово</h2>

      <div style={styles.formGroup}>
        <label>Слово:</label>
        <input
          type="text"
          value={word}
          onChange={e => setWord(e.target.value)}
          style={styles.input}
          placeholder="Наприклад: cat"
        />
      </div>

      <div style={styles.formGroup}>
        <label>Категорія:</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={styles.select}
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label>Завантажити картинку:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.input}
        />
      </div>

      <button
        onClick={handleAddWord}
        style={{ ...styles.button, opacity: uploading ? 0.6 : 1, cursor: uploading ? 'not-allowed' : 'pointer' }}
        disabled={uploading}
      >
        {uploading ? 'Завантаження...' : 'Додати слово'}
      </button>

      {message && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            color: message.type === 'error' ? 'red' : 'green',
            backgroundColor: message.type === 'error' ? '#ffe6e6' : '#e6ffe6',
          }}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: '"Comic Sans MS", cursive',
  },
  formGroup: {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1rem',
  },
  input: {
    padding: '0.6rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginTop: '0.3rem',
  },
  select: {
    padding: '0.6rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginTop: '0.3rem',
  },
  button: {
    marginTop: '1rem',
    padding: '0.7rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#7e57c2',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
  }
};