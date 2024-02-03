import React, { useState } from 'react';
import './App.css';
import Slots from './Slots/Slots';

function App() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [balance, setBalance] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBalance(Number(event.target.value));
  };

  return (
    <div className="App">
      {initialLoad ? (
        <div>
          <h1>Deposit first in order to play</h1>
          <input type="number" onChange={handleInputChange} />
          <button onClick={() => setInitialLoad(false)}>Deposit</button>
        </div>
      ) : (
        <Slots balanceParam={balance}/>  
      )}
    </div>
  );
}

export default App;
