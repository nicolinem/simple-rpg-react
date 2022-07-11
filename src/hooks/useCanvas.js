import React, { useContext, useEffect, useRef, useState } from "react";
import Canvas from "../Canvas";
import useMap from "../hooks/useMap";
import topMap from "../images/maps/DemoUpper.png";
import heroImage from "../images/characters/people/hero.png";
import useMovement from "../hooks/useMovement";

const useCanvas = () => {
  const canvasRef = useRef(null);

  const [hero, setHero] = useState(null);
  const [movementProgressLeft, setMovementprogressLeft] = useState(0);
  const [currentDirection, setCurrentDirection] = useState();
  const [startTime, setStartTime] = useState(null);

  const [position, setPosition] = useState({
    x: 16 * 4,
    y: 16 * 5,
  });

  const { direction } = useMovement();

  const { topImage, bottomImage } = useMap();


  const directionUpdate = {
    up: ["y", -1],
    down: ["y", 1],
    left: ["x", -1],
    right: ["x", 1],
  };

  const updatePosition = () => {
    if (movementProgressLeft > 0) {
      const property = directionUpdate[currentDirection];
      console.log(property);
      if (property !== undefined) {
        const dire = property[0];
        const change = property[1];
        // console.log(dire);
        setPosition({ ...position, [dire]: (position[dire] += change) });
        console.log(position);
        console.log(movementProgressLeft);
      }
      console.log("settingProgress!!");
      setMovementprogressLeft(movementProgressLeft - 1);
    }
  };

  const update = () => {
    updatePosition();
    if (movementProgressLeft === 0 && direction) {
      console.log("direction ");
      setCurrentDirection(direction);
      setMovementprogressLeft(16);
    }
  };

  useEffect(() => {
    const image = new Image();
    image.src = heroImage;
    image.onload = () => setHero(image);
  }, [position]);

  const draw = (ctx, frameCount) => {
    if (bottomImage) {
      update();
      // console.log(movementProgressLeft);
      ctx.clearRect(0, 0, 1056, 594);
      ctx.drawImage(bottomImage, 0, 0);
      ctx.drawImage(
        hero,
        0,
        0,
        32,
        32,
        position.x - 8,
        position.y - 18,
        32,
        32
      );

      ctx.drawImage(topImage, 0, 0);
    }
  };

  const frame = React.useRef(0);

  const firstFrameTime = React.useRef(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frameCount = 0;
    console.log("test");

    const render = (time) => {
      let timeFraction = (time - firstFrameTime.current) / 1000;
      // console.log(timeFraction);
      if (timeFraction > 1) {
        timeFraction = 1;
      }
      if (timeFraction <= 1) {
        frameCount++;
        draw(ctx, frameCount);
        // request next frame only in cases when we not reached 100% of duration
        if (timeFraction != 1) frame.current = requestAnimationFrame(render);
      }

      console.log("rendering");

      // animationFrameId = window.requestAnimationFrame(render);
    };

    firstFrameTime.current = performance.now();
    frame.current = requestAnimationFrame(render);

    return () => cancelAnimationFrame(frame.current);
    // render();
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
