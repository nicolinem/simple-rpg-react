import React, { useContext, useEffect, useState } from "react";
import Canvas from "./Canvas";
import GameMap from "./GameMap";
import { store } from "./store.js";

const updatePosition = () => {
  if (this.movementProgressLeft > 0) {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
  }
};

const Game = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [movementProgressLeft, setMovementProgress] = useState(0);
  const [movementUpdate, setMovementUpdate] = useState([]);
  const [xValue, setxValue] = useState(0);
  const [yValue, setyValue] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const heldDirections = [];
  const direction = movementUpdate[0];

  const mapping = {
    ArrowUp: "up",
    KeyW: "up",
    ArrowDown: "down",
    KeyS: "down",
    ArrowLeft: "left",
    KeyA: "left",
    ArrowRight: "right",
    KeyD: "right",
  };

  const directionUpdate = {
    up: ["y", -1],
    down: ["y", 1],
    left: ["x", -1],
    right: ["x", 1],
  };

  useEffect(() => {
    dispatch({ type: "test" });
    document.addEventListener("keydown", (e) => {
      console.log("keydown");
      const direction = mapping[e.code];
      if (direction && heldDirections.indexOf(direction) === -1) {
        heldDirections.unshift(direction);
        setMovementUpdate(movementUpdate.unshift(direction));
        console.log(heldDirections);
        console.log("hello:", movementUpdate);
      }
    });
    document.addEventListener("keyup", (e) => {
      const dir = mapping[e.code];
      const index = heldDirections.indexOf(dir);
      if (index !== -1) {
        heldDirections.splice(index, 1);
        setMovementUpdate(movementUpdate.splice(index, 1));

        console.log("hello:", movementUpdate);
      }
    });
    // return window.removeEventListener("keydown");
  }, []);

  useEffect(() => {
    console.log(movementUpdate);
    // const lala = movementUpdate[0];
    // console.log("test", lala);
    const property = directionUpdate[direction];

    //
    console.log("Position changed");
    console.log("prop", property);
    if (property != undefined) {
      const dire = property[0];
      const change = property[1];
      console.log(dire);
      setPosition({ ...position, [dire]: (position[dire] += change) });
    }
    console.log(position);
  }, [movementUpdate]);

  console.log(globalState);

  const [map, setMap] = useState("DemoRoom");

  const buttonPush = () => {
    setMap("Kitchen");
    console.log("buttonpushed");
    console.log(map);
    dispatch({ type: "test2" });
  };
  return (
    <>
      <button onClick={() => buttonPush()}></button>
      <GameMap mapID={map} x={xValue} y={yValue} position={position}></GameMap>
    </>
  );
};
export default Game;
