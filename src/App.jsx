// import { useState } from 'react'
import './App.css';
import { Home } from './components/pages/Home';
import DictionaryList from './components/DictionaryList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WordList from './components/WordList';
import { useState } from 'react';


function App() {
  const [tag, setTag] = useState('')

  return (
    <>
      <div className="bg-red-300">
        <Home />
        <DictionaryList setTag={setTag}/>
        <div>{tag}</div>
        <WordList tag={tag} />
      </div>
    </>
  );
}

export default App;
