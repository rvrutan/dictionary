import { Home } from "./components/pages/Home";
import DictionaryList from "./components/DictionaryList";
import WordList from "./components/WordList";
import { useState } from "react";
import Footer from "./components/Footer";
import PickWordGame from "./components/PickWordGame";
// import  PickWordGame  from "./components/PickWordGame";

function App() {
  const [tag, setTag] = useState(""); // Track the selected tag
  const [mode, setMode] = useState(null); // Track the mode: "words" or "game"

  const handleModeSelection = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleGoBack = () => {
    setMode(null); // Reset the mode to go back to the options
  };

  return (
    <>
      <div className="text-center text-color font-mono h-lvh ">
        <Home />
        <DictionaryList setTag={setTag} />
        <div className="capitalize text-2xl p-4 font-bold">{tag}</div>

        {/* Show options only when a dictionary is selected */}
        {tag && !mode && (
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="btn btn-secondary mb-8"
              onClick={() => handleModeSelection("words")}
            >
              Get Definitions
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleModeSelection("game")}
            >
              Play Game
            </button>
          </div>
        )}

        {/* Conditionally render based on the selected mode */}
        {mode === "words" && (
          <>
            <WordList tag={tag} />
            <button
              className="btn btn-neutral mt-4 mb-4"
              onClick={handleGoBack}
            >
              Back
            </button>
          </>
        )}
        {mode === "game" && (
          <>
            <PickWordGame tag={tag} />
            <button
              className="btn btn-neutral mt-4"
              onClick={handleGoBack}
            >
            Back
            </button>
          </>
        )}

        <Footer />
      </div>
    </>
  );
}

export default App;