import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const wordsApiUrl =
  "https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/only-words";
const definitionApiUrl =
  "https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/by-id?id=";

function WordList({ tag }) {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null); // Tracks the expanded category
  const [selectedWord, setSelectedWord] = useState(null); // Tracks the selected word
  const [definition, setDefinition] = useState(null); // Tracks the fetched definition
  const [loadingDefinition, setLoadingDefinition] = useState(false);
  const [definitionError, setDefinitionError] = useState(null);

  // Fetch words based on the selected tag
  useEffect(() => {
    setLoading(true);
    setError(null);

    const defaultTag = tag ? tag : "";

    fetch(`${wordsApiUrl}?tag=${defaultTag}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch words");
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

  // Fetch definition for a selected word
  const fetchDefinition = (wordObj) => {
    setLoadingDefinition(true);
    setDefinitionError(null);
    setDefinition(null);

    fetch(`${definitionApiUrl}${wordObj._id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch definition");
        }
        return response.json();
      })
      .then((data) => {
        setDefinition(data.definition); // Assuming the response has a `definition` field
        setLoadingDefinition(false);
      })
      .catch((err) => {
        setDefinitionError(err.message);
        setLoadingDefinition(false);
      });
  };

  const handleWordClick = (wordObj) => {
    setSelectedWord((prev) =>
      prev && prev.word === wordObj.word ? null : wordObj
    );

    // Fetch definition for the selected word
    if (!selectedWord || selectedWord.word !== wordObj.word) {
      fetchDefinition(wordObj);
    } else {
      setDefinition(null); // Clear the definition if deselecting the word
    }
  };

  if (loading) return <p>Loading words...</p>;
  if (error) return <p>Error: {error}</p>;

  // Categorize words by their first letter
  const categorizedWords = words.reduce((acc, wordObj) => {
    const firstLetter = wordObj.word[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(wordObj);
    return acc;
  }, {});

  const toggleCategory = (letter) => {
    setExpandedCategory((prev) => (prev === letter ? null : letter));
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold p-4">Words:</h3>
      <div className="flex space-x-2  ">
        {Object.keys(categorizedWords)
          .sort()
          .map((letter) => (
            <div key={letter} className="mb-4">
              <h4
                className="text-xl p-2 font-bold cursor-pointer bg-stone-300 rounded-lg "
                onClick={() => toggleCategory(letter)}
              >
                {letter} {expandedCategory === letter ? "-" : "+"}
              </h4>
              {expandedCategory === letter && (
                <ul className="list-disc pl-5 ">
                  {categorizedWords[letter].map((wordObj, index) => (
                    <li
                      key={index}
                      className="text-lg cursor-pointer text-white hover:border-2"
                      onClick={() => handleWordClick(wordObj)}
                    >
                      {wordObj.word}
                      {selectedWord && selectedWord.word === wordObj.word && (
                        <div className="text-md text-gray-700 ml-4">
                          {loadingDefinition ? (
                            <p>Loading definition...</p>
                          ) : definitionError ? (
                            <p>Error: {definitionError}</p>
                          ) : (
                            <p>Definition: {definition}</p>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

WordList.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default WordList;
