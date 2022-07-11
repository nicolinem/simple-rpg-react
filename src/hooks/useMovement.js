import { useState, useRef, useEffect, useCallback } from "react";

const withGrid = (n) => {
  return n * 16;
};

const useMovement = () => {
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
    // console.log(movementUpdate);
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
  // useEffect(() => {
  //   // dispatch({ type: "test" });
  //   document.addEventListener("keydown", (e) => {
  //     const direction = mapping[e.code];
  //     console.log("index", movementUpdate.indexOf(direction));
  //     if (direction && movementUpdate.indexOf(direction) === -1) {
  //       setMovementUpdate((movementUpdate) => [direction, ...movementUpdate]);
  //     }
  //   });
  //   document.addEventListener("keyup", (e) => {
  //     const dir = mapping[e.code];
  //     const index = movementUpdate.indexOf(dir);
  //     console.log(movementUpdate);
  //     console.log(index);
  //     if (index !== -1) {
  //       setMovementUpdate(movementUpdate.splice(index, 1));
  //       console.log(movementUpdate.splice(index, 1));
  //     }
  //   });
  //   // return window.removeEventListener("keydown");
  // }, []);

  // useEffect(() => {
  //   console.log(movementUpdate);
  //   const property = directionUpdate[movementUpdate[0]];

  //   if (property != undefined) {
  //     const dire = property[0];
  //     const change = property[1];
  //     console.log(dire);
  //     setPosition({ ...position, [dire]: (position[dire] += change) });
  //   }
  //   console.log(position);
  // }, [movementUpdate]);

  return { direction };
};

export default useMovement;
