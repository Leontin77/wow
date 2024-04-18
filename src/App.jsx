import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Miner from "./components/Miner";
import MultiplicatorStore from "./components/CountStore";

function App() {
  const [count, setCount] = useState(10000);
  const [multiplicator, setMultiplicator] = useState(1);

  return (
    <>
      <div className="card">
        <div className="count">{count}</div>
        <MultiplicatorStore count={count} setCount={setCount} multiplicator={multiplicator} setMultiplicator={setMultiplicator} />
        <Miner setCount={setCount} multiplicator={multiplicator} />
      </div>
    </>
  );
}

export default App;
