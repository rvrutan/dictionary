// import { useState } from 'react'
import './App.css';
import { Home } from './components/Home';
import DictionaryList from './components/DictionaryList';

function App() {
  return (
    <>
      <div className="bg-red-300">
        <Home />
        <DictionaryList />
      </div>
    </>
  );
}

export default App;
