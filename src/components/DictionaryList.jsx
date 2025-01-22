import { useEffect, useState } from 'react';

const dictionaryUrl =
  'https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/multi-details';

function DictionaryList({ setTag }) {
  const [dictionaries, setDictionaries] = useState([]); // To store the list of dictionaries

  // Fetch the dictionary list on component mount
  useEffect(() => {
    fetch(dictionaryUrl)
      .then((response) => response.json())
      .then((data) => setDictionaries(data.dictionaries))
      .catch((error) => console.error('Error fetching dictionaries:', error));
  }, []);

  return (
    <div>
      <div className="button-container">
        {dictionaries.map((dictionary) => (
          <button
            key={dictionary._id}
            className="bg-indigo-600 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded-3xl mx-8 my-8 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
            onClick={() => setTag(dictionary.tags[0])}
          >
            <p>{dictionary.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DictionaryList;
