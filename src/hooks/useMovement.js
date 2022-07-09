import { useState, useRef, useEffect, useCallback } from "react";

const withGrid = (n) => {
  return n * 16;
};

const useMovement = () => {
  const [movementUpdate, setMovementUpdate] = useState([]);
  const [position, setPosition] = useState({ x: withGrid(0), y: withGrid(0) });
  const [isMoving, setIsMoving] = useState(false);
  const [movementProgressLeft, setMovementProgressLeft] = useState(0);

  const changeValue = () => {
    setMovementProgressLeft(movementProgressLeft - 1);
  };

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
  useEffect(() => {
    // dispatch({ type: "test" });
    document.addEventListener("keydown", (e) => {
      const direction = mapping[e.code];
      if (direction && movementUpdate.indexOf(direction) === -1) {
        setMovementUpdate((movementUpdate) => [direction, ...movementUpdate]);
      }
    });
    document.addEventListener("keyup", (e) => {
      const dir = mapping[e.code];
      const index = movementUpdate.indexOf(dir);
      if (index !== -1) {
        setMovementUpdate(movementUpdate.splice(index, 1));
      }
    });
    // return window.removeEventListener("keydown");
  }, []);

  useEffect(() => {
    const property = directionUpdate[movementUpdate[0]];

    if (property != undefined) {
      const dire = property[0];
      const change = property[1];
      console.log(dire);
      setPosition({ ...position, [dire]: (position[dire] += change) });
    }
    console.log(position);
  }, [movementUpdate]);

  const directionUpdate = {
    up: ["y", -1],
    down: ["y", 1],
    left: ["x", -1],
    right: ["x", 1],
  };

  return position;
};

export default useMovement;
