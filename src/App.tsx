import React, { useState } from "react";
import "./App.css";
import Slots from "./pages/SlotsPage/Slots";
import { DepositForm } from "./pages/DepositPage/Deposit";

function App() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [balance, setBalance] = useState(0);

  if (initialLoad) {
    return (
      <div className="Deposit">
        <DepositForm
          setBalance={setBalance}
          onDeposit={() => setInitialLoad(false)}
        />
      </div>
    );
  }

  return (
    <div className="Slots">
      <Slots balanceParam={balance} />
    </div>
  );
}

export default App;
