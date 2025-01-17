import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const wordsApiUrl =
  'https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/only-words';

function WordList({ tag }) {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch words based on the selected tag
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const defaultTag = tag ? tag : ''

    fetch(`${wordsApiUrl}?tag=${defaultTag}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch words');
        }
        return response.json();
      })
      .then((data) => {
        setWords(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [tag]);

  if (loading) return <p>Loading words...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold">Words:</h3>
      <ul className="list-disc pl-5">
        {words.map((word, index) => (
          <li key={index}>{word.word}</li>
        ))}
      </ul>
    </div>
  );
}

WordList.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default WordList;
