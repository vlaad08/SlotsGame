import React, { useState } from "react";
import "./Deposit.css";

const DepositForm: React.FC<{
  setBalance: (balance: number) => void;
  onDeposit: () => void;
}> = ({ setBalance, onDeposit }) => {
  const [amount, setAmount] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleDeposit = () => {
    setBalance(amount);
    onDeposit();
  };

  return (
    <div className="depositForm">
      <h1>Deposit first in order to play</h1>
      <input type="number" value={amount} onChange={handleInputChange} />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
};

export { DepositForm };
