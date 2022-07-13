import React, { useEffect, useRef, useState } from "react";
import Canvas from "../Canvas";
import useMap from "../hooks/useMap";
import topMap from "../images/maps/DemoUpper.png";
import heroImage from "../images/characters/people/hero.png";
import useEventListener from "./useEventListener";
import { drawCharacter } from "../draw";
import utils from "../utils";

const useCanvas = () => {
  const canvasRef = useRef();
  const frame = useRef(0);
  const firstFrameTime = useRef(performance.now());
  const { direction } = useEventListener();
  const { topImage, bottomImage, characters, hero } = useMap();

  // const [hero, setHero] = useState(null);
  const [movementProgressLeft, setMovementprogressLeft] = useState(0);
  const [currentDirection, setCurrentDirection] = useState();

  const [position, setPosition] = useState({
    x: utils.withGrid(5),
    y: utils.withGrid(6),
  });

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

  // useEffect(() => {
  //   const image = new Image();
  //   image.src = heroImage;
  //   image.onload = () => setHero(image);
  // }, [position]);

  const draw = (ctx) => {
    // console.log("test", characters);
    if (bottomImage && characters) {
      update();
      ctx.clearRect(0, 0, 1056, 594);
      // console.log(characters.find((sprite) => sprite.id === "hero"));
      // console.log("hero", characters[0]);
      // const cameraPerson = characters.find((sprite) => sprite.id === "hero");

      ctx.drawImage(
        bottomImage,
        utils.withGrid(10.5) - position.x + 8,
        utils.withGrid(6) - position.y + 16
      );

      ctx.drawImage(
        hero.imgSrc,
        0,
        0,
        32,
        32,
        utils.withGrid(10.5),
        utils.withGrid(6),
        32,
        32
      );
      // console.log(characters);
      for (const [key, value] of Object.entries(characters)) {
        console.log("character", characters[key]);
        console.log(value);
        const character = characters[key];
        console.log(character.x);

        const x = character.x + 1 + utils.withGrid(10.5) - position.x;
        console.log(x);
        const y = character.y - 16 + utils.withGrid(6) - position.y;
        console.log(y);
        ctx.drawImage(character.imgSrc, 0, 0, 32, 32, x, y, 32, 32);
        // drawCharacter(ctx, cameraPerson, character);
        // ctx.drawImage(
        //   characters[key].imgSrc,
        //   0,
        //   0,
        //   32,
        //   32,
        //   characters[key].x + 10.5 * 16 - 4,
        //   characters[key].y + 6 * 16 - 5,
        //   32,
        //   32
        // );
      }

      ctx.drawImage(
        topImage,
        utils.withGrid(10.5) - position.x + 8,
        utils.withGrid(6) - position.y + 16
      );
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const render = (time) => {
      let timeFraction = (time - firstFrameTime.current) / 1000;
      // console.log(timeFraction);
      if (timeFraction > 1) {
        timeFraction = 1;
      }
      if (timeFraction <= 1) {
        draw(ctx);
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
