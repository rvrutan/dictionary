import { useEffect, useState } from 'react';

const dictionaryUrl =
  'https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/multi-details';

function WordList() {
  const [words, setWords] = useState([]);
  const [activeButton, setActiveButton] = useState(null); // Start with null to indicate no active button

  useEffect(() => {
    fetch(dictionaryUrl)
      .then((response) => response.json())
      .then((data) => setWords(data.dictionaries));
  }, []);

  return (
    <>
      <h3>Subjects</h3>
      {words.map((word) => (
        <button
          key={word.id}
          className={activeButton === word.id ? 'bg-black' : 'bg-white'} // Conditional className
          onClick={() => setActiveButton(word.id)} // Update state to make this button active
        >
          <p>{word.title}</p>
        </button>
      ))}
    </>
  );
}

export default WordList;
