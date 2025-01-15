
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
            <h3>Subjects</h3>
            {words.map((word) => {
                return (
                    <button className="bg-white text-blue" key={word.id} onClick={activeButton} >
                        <p>{word.title}</p>
                    
                    </button>
                );
            })}
        </>
    );
}

export default WordList;
