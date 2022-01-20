import { useEffect, useState } from "react";
import "./App.css";
import { SingleCard } from "./components/singleCard";

const cardImages = [
     { src: "/img/helmet-1.png", matched: false },
     { src: "/img/potion-1.png", matched: false },
     { src: "/img/ring-1.png", matched: false },
     { src: "/img/scroll-1.png", matched: false },
     { src: "/img/shield-1.png", matched: false },
     { src: "/img/sword-1.png", matched: false },
];

function App() {
     const [cards, setCards] = useState([]);
     const [turns, setTurns] = useState(0);
     const [choiceone, setChoiceone] = useState(null);
     const [choiceTwo, setChoiceTwo] = useState(null);
     const [disabled, setDisabled] = useState(false);

     //shuffle cards
     const shuffleCards = () => {
          const shuffledCards = [...cardImages, ...cardImages]
               .sort(() => Math.random() - 0.5)
               .map((card) => ({
                    ...card,
                    id: Math.random(),
               }));
          setChoiceone(null);
          setChoiceTwo(null);
          setCards(shuffledCards);
          setTurns(0);
     };

     // handle a choice
     const handleChoice = (card) => {
          choiceone ? setChoiceTwo(card) : setChoiceone(card);
     };

     useEffect(() => {
          if (choiceone && choiceTwo) {
               setDisabled(true);
               if (choiceone.src === choiceTwo.src) {
                    setCards((prevCards) => {
                         return prevCards.map((state) => {
                              if (state.src === choiceone.src) {
                                   return { ...state, matched: true };
                              } else {
                                   return state;
                              }
                         });
                    });

                    resetTurn();
               } else {
                    setTimeout(() => resetTurn(), 1000);
               }
          }
     }, [choiceone, choiceTwo]);

     const resetTurn = () => {
          setChoiceone(null);
          setChoiceTwo(null);
          setTurns((prevTurns) => prevTurns + 1);
          setDisabled(false);
     };

     useEffect(() => {
          shuffleCards();
     }, []);

     return (
          <div className="App">
               <div className="box">
                    <h1>Magic Match</h1>
                    <h2 className="turn">Turns: {turns}</h2>
               </div>
               <button onClick={shuffleCards}>New Game</button>
               <div className="card-grid">
                    {cards.map((state) => (
                         <SingleCard
                              key={state.id}
                              card={state}
                              handleChoice={handleChoice}
                              flipped={state === choiceone || state === choiceTwo || state.matched}
                              disabled={disabled}
                         />
                    ))}
               </div>
          </div>
     );
}

export default App;
