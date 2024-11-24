import React, { useState } from "react";
import "./Slots.css";
import { CalculatePayout, SearchForWilds } from "./PayoutCalculator";
import watermelon from "./SymbolImage/watermelon.png";
import chery from "./SymbolImage/cheery.png";
import lime from "./SymbolImage/lemon.png";
import plum from "./SymbolImage/plum.png";
import grapes from "./SymbolImage/grapes.png";
import oranges from "./SymbolImage/orange.png";
import seven from "./SymbolImage/seven.png";
import wild from "./SymbolImage/wild.png";
import { RedBlack } from "../../functions/Gamble/RedBlack";
import CardGamble from "./CardGamble";

const SlotSymbols = [
  { id: 1, symbol: "watermelon", image: watermelon },
  { id: 2, symbol: "cherry", image: chery },
  { id: 3, symbol: "lime", image: lime },
  { id: 4, symbol: "plum", image: plum },
  { id: 5, symbol: "grapes", image: grapes },
  { id: 6, symbol: "oranges", image: oranges },
  { id: 7, symbol: "seven", image: seven },
  { id: 8, symbol: "wild", image: wild },
];

const Slots: React.FC<{ balanceParam: number }> = ({ balanceParam }) => {
  const initialSymbols = Array.from({ length: 5 }, (_, columnIndex) =>
    Array.from({ length: 3 }, (_, rowIndex) =>
      GenerateRandomNumber(columnIndex, [])
    )
  );

  const [symbolPlots, setSymbolPlots] = useState(initialSymbols);
  const [betCredit, setBetCredit] = useState(3);
  const [disabled, setDisabled] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [balance, setBalance] = useState(balanceParam);
  const [roll, setRollAnimation] = useState("no-roll");
  const [gambleWin, setGambleWin] = useState(false);

  async function GeneratePanel() {
    setDisabled(true);
    setRollAnimation("roll");
    setBalance(balance - betCredit);

    let newPanel: number[][] = await RollPanel();
    setRollAnimation("last-roll");
    await delay(1);

    const newPanelAfterWilds = SearchForWilds(newPanel);
    setSymbolPlots(newPanelAfterWilds);
    await delay(1);
    setRollAnimation("no-roll");
    let lines = CalculatePayout(newPanelAfterWilds, betCredit);

    if (lines.length == 0) {
      setLastWin(0);
    } else {
      let wonSum = 0;
      lines.forEach((line) => {
        wonSum += line.payout;
      });
      setLastWin(wonSum);
    }
    setDisabled(false);

    // if the won sum is not added to the balance, then  if the player presses play again it gets added or if t
  }

  async function RollPanel() {
    let i: number = 0;
    let newPanel: number[][] = [];

    while (i != 5) {
      newPanel = Array.from({ length: 5 }, (_, columnIndex) =>
        Array.from({ length: 3 }, (_, rowIndex) => {
          let randomNumber = GenerateRandomNumber(columnIndex, newPanel);
          return randomNumber;
        })
      );
      setSymbolPlots(newPanel);
      i++;
      await delay(0.2);
    }
    return newPanel;
  }

  function GenerateRandomNumber(columnIndex: number, panel: number[][]) {
    let randomNumber: number;
    let isEightGenerated = false;

    if (
      panel.length > 0 &&
      panel[0][columnIndex] === 8 &&
      panel[1][columnIndex] === 8 &&
      panel[2][columnIndex] === 8
    ) {
      isEightGenerated = true;
    }

    do {
      if (columnIndex === 0 || columnIndex === 4) {
        randomNumber = Math.floor(Math.random() * 7) + 1;
      } else {
        randomNumber = Math.floor(Math.random() * 8) + 1;
      }
    } while (randomNumber === 8 && isEightGenerated);

    return randomNumber;
  }

  if (gambleWin) {
    return (
      <div className="content">
        <CardGamble
          setGambleWin={setGambleWin}
          setBalance={setBalance}
          setLastWin={setLastWin}
          balance={balance}
          lastWin={lastWin}
        />
      </div>
    );
  }

  return (
    <div className="content">
      <div className="mainPanel">
        {symbolPlots.map((column, columnIndex) => (
          <div key={columnIndex} className={"column " + roll}>
            {column.map((symbolIndex, rowIndex) => {
              const symbol = SlotSymbols.find(
                (s) => s.id === symbolIndex
              )?.image;
              return (
                <div key={`${columnIndex}-${rowIndex}`} className={"symbol"}>
                  <img src={symbol} alt="Slot Symbol" />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="creditButtonsContainer">
        <button className="creditButton" onClick={() => setBetCredit(1)}>
          1 credit
        </button>
        <button className="creditButton" onClick={() => setBetCredit(2)}>
          2 credit
        </button>
        <button className="creditButton" onClick={() => setBetCredit(3)}>
          3 credit
        </button>
        <button className="creditButton" onClick={() => setBetCredit(5)}>
          5 credit
        </button>
        <button className="creditButton" onClick={() => setBetCredit(8)}>
          8 credit
        </button>
      </div>
      <div className="playButtonContainer">
        <div className="balanceContainer">
          <p className="banner">Balance</p>
          <p className="credit">{balance}</p>
        </div>
        {lastWin == 0 ? (
          <button
            className="playButton"
            onClick={() => GeneratePanel()}
            disabled={disabled}
          >
            Play
          </button>
        ) : (
          <div>
            <button
              onClick={() => {
                setBalance(lastWin + balance);
                setLastWin(0);
              }}
            >
              No Gamble
            </button>
            <button
              className="cardGambleButton"
              onClick={() => setGambleWin(true)}
            >
              Gamble
            </button>
          </div>
        )}
        <div className="lastWinContainer">
          <p className="banner">Last Win</p>
          <p className="credit">{lastWin}</p>
        </div>
      </div>
    </div>
  );
};

export default Slots;

function delay(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
