import { useState } from 'react';
import DictionaryList from './DictionaryList';
import axios from 'axios';

const geologyUrl =
  'https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/only-words?tag=geology';
const chemistyUrl =
  'https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/only-words?tag=chemistry';
const biologyUrl =
  'https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/only-words?tag=biology';
const medicalTermUrl =
  'https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/only-words?tag=medical';

export const BrowseWords = () => {
  const [words, setWords] = useState([]);
};
