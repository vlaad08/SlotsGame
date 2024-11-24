import React from "react";
import { useState } from "react";
import { RedBlack } from "../../functions/Gamble/RedBlack";
import "./CardGamble.css";

const redBlack = new RedBlack();

const CardGamble: React.FC<{
  setGambleWin: (gambleWin: boolean) => void;
  setBalance: (balance: number) => void;
  setLastWin: (lastWin: number) => void;
  balance: number;
  lastWin: number;
}> = ({ setGambleWin, setBalance, setLastWin, balance, lastWin }) => {
  const [color, setColor] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [gambleAttempts, setGambleAttempts] = useState(3);

  async function checkGambleWin(sc: string, ac: string) {
    setSelectedColor(sc);
    await delay(0.5);
    setColor(ac);

    await delay(1);

    if (sc == ac) {
      setColor("");
      setLastWin(lastWin * 2);
    } else {
      setColor("");
      setLastWin(0);
      setGambleWin(false);
    }

    setGambleAttempts(gambleAttempts - 1);
    if (gambleAttempts == 0) {
      setBalance(balance + lastWin);
      setGambleAttempts(3);
      setGambleWin(false);
    }
  }

  return (
    <div className="cardGameContent">
      <p>Current color : {color}</p>
      <p>You selected : {selectedColor}</p>
      <p>Last Win : </p>
      <p>Remaining attemps : {gambleAttempts}</p>
      <div className="buttonDiv">
        <button
          onClick={async () => {
            checkGambleWin("red", redBlack.Gamble());
          }}
        >
          Red
        </button>
        <button
          onClick={async () => {
            checkGambleWin("black", redBlack.Gamble());
          }}
        >
          Black
        </button>
        <button>X</button>
      </div>
    </div>
  );
};
function delay(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export default CardGamble;
