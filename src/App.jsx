// import { useState } from 'react'
import './App.css';
import { Home } from './components/pages/Home';
import DictionaryList from './components/DictionaryList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WordList from './components/WordList';

function App() {
  return (
    <>
      <div className="bg-red-300">
        <Home />
        <DictionaryList />
        {/* <WordList /> */}
      </div>
    </>
  );
}

export default App;
