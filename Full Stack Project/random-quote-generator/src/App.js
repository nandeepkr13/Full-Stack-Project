import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();

      if (response.ok) {
        setQuote(data.content);
        setAuthor(data.author);
        setError(null);
      } else {
        setError('Failed to fetch a quote. Please try again later.');
      }
    } catch (error) {
      setError('An error occurred while fetching the quote. Please try again later.');
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const generateNewQuote = () => {
    fetchRandomQuote();
  };

  return (
    <div className="app-container">
      <div className="quote-container">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <p className="quote-text">"{quote}"</p>
            <p className="author-text">- {author}</p>
          </>
        )}
      </div>
      <button className="generate-button" onClick={generateNewQuote}>
        Generate Quote
      </button>
    </div>
  );
}

export default App;
