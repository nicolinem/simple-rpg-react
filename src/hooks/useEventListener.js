import { useState, useRef, useEffect, useCallback } from "react";

const withGrid = (n) => {
  return n * 16;
};

const useEventListener = () => {
  const [movementUpdate, setMovementUpdate] = useState([]);
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

  const keyDown = (e) => {
    if (e.repeat) {
      return;
    }

    const direction = mapping[e.code];
    setMovementUpdate((oldArr) => [direction, ...oldArr]);
    // setDirection(direction);
  };

  // remove only the one that user release
  const keyUp = (e) => {
    const direction = mapping[e.code];
    setMovementUpdate((prev) => prev.filter((key) => key !== direction));
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return function cleanup() {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, []);


  return { direction };
};

export default useEventListener;
