
import { useEffect, useState } from "react";

const dictionaryUrl = 'https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/multi-details';



function WordList() {
    const [words, setWords] = useState([]);
    const [activeButton, setActiveButton] = useState(0);

    useEffect(() => {
        fetch(dictionaryUrl)
            .then((response) => response.json())
            .then((data) => setWords(data.dictionaries));
    }, []); 

    return (
        <>
           
            {words.map((word) => {
                return (
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl mx-8 my-8" key={word.id} onClick={setActiveButton} >
                        <p>{word.title}</p>
                    
                    </button>
                );
            })}
        </>
    );
}

export default WordList;
