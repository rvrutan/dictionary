import { Home } from "./components/pages/Home";
import DictionaryList from "./components/DictionaryList";
import WordList from "./components/WordList";
import { useState } from "react";
import Footer from "./components/Footer";
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
      <div className="bg-indigo-300 text-center text-color font-mono h-lvh ">
        <Home />
        <DictionaryList setTag={setTag} />
        <div className="capitalize text-3xl font-bold">{tag}</div>

        {/* Show options only when a dictionary is selected */}
        {tag && !mode && (
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="btn btn-primary"
              onClick={() => handleModeSelection("words")}
            >
              Get Definitions
            </button>
            <button
              className="btn btn-primary"
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
              className="btn btn-outline mt-4"
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </>
        )}
        {mode === "game" && (
          <>
            {/* <PickWordGame tag={tag} /> */}
            <button
              className="btn btn-outline mt-4"
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </>
        )}

        <Footer />
      </div>
    </>
  );
}

export default App;