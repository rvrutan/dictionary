import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const gameApiUrl =
  "https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/multichoice?tag=";

function PickWordGame({ tag }) {
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tag) {
      fetch(`${gameApiUrl}${tag}`)
        .then((response) => response.json())
        .then((data) => {
          setGameData(data);
          setLoading(false);
          console.log(data);
        })
        .catch((err) => {
          setError("Failed to load game data");
          setLoading(false);
        });
    }
  }, [tag]);

  if (loading)
    return (
      <div>
        <div>Loading game...</div>
      </div>
    );
  if (error)
    return (
      <div>
        <div>Error: {error}</div>
      </div>
    );

  return ( 
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Pick the Right Word</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gameData.map((wordObj, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            <p className="font-semibold">Definition: {wordObj.definition}</p>
                  <button className="btn btn-sm btn-accent">{wordObj.word}</button>
          </div>
        ))}
      </div>
    // </div>
  );
}

PickWordGame.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default PickWordGame;
