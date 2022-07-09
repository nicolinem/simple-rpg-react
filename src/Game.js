import React, { useContext, useEffect, useState } from "react";
import Canvas from "./Canvas";
import GameMap from "./GameMap";
import { store } from "./store.js";
import useMovement from "./hooks/useMovement";

const Game = () => {
  const position = useMovement();

  const [map, setMap] = useState("DemoRoom");

  const buttonPush = () => {
    setMap("Kitchen");
    console.log("buttonpushed");
    console.log(map);
  };
  return (
    <>
      <button onClick={() => buttonPush()}></button>
      <GameMap mapID={map} position={position}></GameMap>
    </>
  );
};
export default Game;
