// import { useState } from 'react'
import './App.css';
import { Home } from './components/Home';
import WordList from './components/WordList';

function App() {
  return (
    <>
      <div className="bg-red-300">
        <Home />
        <WordList />
      </div>
    </>
  );
}

export default App;
