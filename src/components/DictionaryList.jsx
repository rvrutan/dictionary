import { useEffect, useState } from "react";

const dictionaryUrl =
  "https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/multi-details";

function DictionaryList({ setTag }) {
  const [dictionaries, setDictionaries] = useState([]); // To store the list of dictionaries

  // Fetch the dictionary list on component mount
  useEffect(() => {
    fetch(dictionaryUrl)
      .then((response) => response.json())
      .then((data) => setDictionaries(data.dictionaries))
      .catch((error) => console.error("Error fetching dictionaries:", error));
  }, []);

  return (
    <div className="">
      <div className="flex flex-wrap justify-center gap-4">
        {dictionaries.map((dictionary) => (
          <button
            key={dictionary._id}
            className="btn btn-primary shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-primary-focus"
            onClick={() => setTag(dictionary.tags[0])}
          >
            <p className="text-center text-lg">{dictionary.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DictionaryList;