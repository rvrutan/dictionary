import { useEffect, useState } from 'react';
import WordList from './WordList'; // Import the WordList component

const dictionaryUrl =
  'https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/multi-details';

function DictionaryList() {
  const [dictionaries, setDictionaries] = useState([]); // To store the list of dictionaries
  const [activeDictionary, setActiveDictionary] = useState(null); // To store the selected dictionary

  // Fetch the dictionary list on component mount
  useEffect(() => {
    fetch(dictionaryUrl)
      .then((response) => response.json())
      .then((data) => setDictionaries(data.dictionaries))
      .catch((error) => console.error('Error fetching dictionaries:', error));
  }, []);

  // Handle button click to set the active dictionary
  const handleButtonClick = (dictionary) => {
    setActiveDictionary(dictionary); // Set the selected dictionary as active
  };

  return (
    <div>
      <div className="button-container">
        {dictionaries.map((dictionary) => (
          <button
            key={dictionary.id}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl mx-8 my-8"
            onClick={() => handleButtonClick(dictionary)}
          >
            <p>{dictionary.title}</p>
          </button>
        ))}
      </div>

      <div className="dictionary-content">
        {activeDictionary ? (
          <div>
            <h2 className="text-xl font-bold">{activeDictionary.title}</h2>
            <p>{activeDictionary.description}</p>
            {/* Pass the tag to the WordList component */}
            <WordList tag={activeDictionary.tag} />
          </div>
        ) : (
          <p>Select a dictionary to view details</p>
        )}
      </div>
    </div>
  );
}

export default DictionaryList;
