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

    if (!selectedWord || selectedWord.word !== wordObj.word) {
      fetchDefinition(wordObj);
    } else {
      setDefinition(null);
    }
  };

  if (loading)
    return (
      <div className="alert alert-info shadow-lg">
        <div>Loading words...</div>
      </div>
    );
  if (error)
    return (
      <div className="alert alert-error shadow-lg">
        <div>Error: {error}</div>
      </div>
    );

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
    <div className="p-4">
      <h3 className="text-3xl font-semibold p-4 text-center">Words</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {Object.keys(categorizedWords)
          .sort()
          .map((letter) => (
            <div key={letter} className="w-full sm:w-1/3 md:w-1/5">
              <div className="collapse collapse-arrow bg-base-200 shadow-md">
                <input
                  type="checkbox"
                  checked={expandedCategory === letter}
                  onChange={() => toggleCategory(letter)}
                />
                <div className="collapse-title text-xl font-bold">
                  {letter} {expandedCategory === letter ? "-" : "+"}
                </div>
                <div className="collapse-content">
                  <ul className="list-disc pl-5">
                    {categorizedWords[letter].map((wordObj, index) => (
                      <li
                        key={index}
                        className="text-lg cursor-pointer hover:underline"
                        onClick={() => handleWordClick(wordObj)}
                      >
                        {wordObj.word}
                        {selectedWord &&
                          selectedWord.word === wordObj.word && (
                            <div className="card bg-base-100 shadow-md mt-2 p-2">
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
                </div>
              </div>
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