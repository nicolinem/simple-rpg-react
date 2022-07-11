import { useState } from "react";
import "./App.css";
import Game from "./Game.js";
import GameMap from "./GameMap";

function App() {
  const [map, setMap] = useState("DemoRoom");

  const buttonPush = () => {
    setMap("Kitchen");
    console.log("buttonpushed");
    console.log(map);
  };
  return (
    <>
      <button onClick={() => buttonPush()}></button>
      <GameMap mapID={map}></GameMap>
    </>
  );
}

export default App;
