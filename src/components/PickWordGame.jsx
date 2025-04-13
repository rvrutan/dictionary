import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const gameApiUrl =
  "https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/multichoice?tag=";

function PickWordGame({ tag }) {
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (tag) {
      fetch(`${gameApiUrl}${tag}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data);
          if (!Array.isArray(data)) {
            throw new Error("Invalid data format received from API");
          }
          // Process the data to create questions
          const processedData = data.map(item => {
            // Get all words except the current one
            const otherWords = data
              .filter(word => word.word !== item.word)
              .map(word => word.word);
            
            // Shuffle and take 3 random words
            const shuffledWords = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
            
            // Combine with correct word and shuffle
            const allOptions = [...shuffledWords, item.word].sort(() => Math.random() - 0.5);
            
            return {
              definition: item.definition,
              correctWord: item.word,
              options: allOptions
            };
          });
          
          setGameData(processedData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading game data:", err);
          setError("Failed to load game data");
          setLoading(false);
        });
    }
  }, [tag]);

  const handleAnswerSelect = (word) => {
    if (showResult) return;
    
    const isCorrect = word === gameData[currentQuestion].correctWord;
    setSelectedAnswer(word);
    setShowResult(true);
    
    if (isCorrect) {
      setScore(score + 100);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    if (currentQuestion < gameData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // If we've reached the end, reset the game
      resetGame();
    }
  };

  const resetGame = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion(0);
    setScore(0);
    setGameData(null);
    setLoading(true);
    // Reload the game data
    fetch(`${gameApiUrl}${tag}`)
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from API");
        }
        // Process the data to create questions
        const processedData = data.map(item => {
          const otherWords = data
            .filter(word => word.word !== item.word)
            .map(word => word.word);
          
          const shuffledWords = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
          const allOptions = [...shuffledWords, item.word].sort(() => Math.random() - 0.5);
          
          return {
            definition: item.definition,
            correctWord: item.word,
            options: allOptions
          };
        });
        
        setGameData(processedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error resetting game data:", err);
        setError("Failed to load game data");
        setLoading(false);
      });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-xl">Loading quiz...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );

  return (
    <div className="p-4 max-w-4xl mx-auto">

      <h3 className="text-2xl font-bold mb-4">Pick the Right Word</h3>
      <div className="mb-4 flex justify-between items-center">
        <span className="text-lg font-semibold">Score: {score}</span>
        <span className="text-lg">Question {currentQuestion + 1} of {gameData.length}</span>
      </div>
      
      <div className="mb-6 p-4 bg-base-300 rounded-xl shadow-2xl">
        <p className="text-xl font-semibold mb-4">{gameData[currentQuestion].definition}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gameData[currentQuestion].options.map((word, index) => {
            let baseButtonClass = "text-lg px-4 py-2 rounded shadow transition duration-300 w-full ";

            let buttonClass;

            if (showResult) {
              const correct = word === gameData[currentQuestion].correctWord;
              const selected = word === selectedAnswer;

              if (selected && correct) {
                buttonClass = baseButtonClass + "bg-success text-white";
              } else if (selected && !correct) {
                buttonClass = baseButtonClass + "bg-error text-white";
              } else if (!selected && correct) {
                buttonClass = baseButtonClass + "bg-success text-white";
              } else {
                buttonClass = baseButtonClass + "bg-gray-300 text-gray-700";
              }
            } else {
              buttonClass = baseButtonClass + "bg-secondary text-black hover:bg-accent";
            }

            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleAnswerSelect(word)}
                disabled={showResult}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      {showResult && (
        <div className="mt-4">
          <div className="flex justify-center gap-4">
            <button 
              className="btn btn-neutral"
              onClick={nextQuestion}
            >
              {currentQuestion < gameData.length - 1 ? "Next Question" : "Restart"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

PickWordGame.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default PickWordGame;
