import React, { useContext, useEffect, useState } from "react";
import Canvas from "./Canvas";
import useMap from "./hooks/useMap";
import topMap from "./images/maps/DemoUpper.png";
import heroImage from "./images/characters/people/hero.png";
import { store } from "./store.js";

const GameMap = (props) => {
  const { mapID, x, y, position } = props;
  const [hero, setHero] = useState(null);

  const { topImage, bottomImage } = useMap(mapID);

  useEffect(() => {
    const image = new Image();
    image.src = heroImage;
    image.onload = () => setHero(image);
  }, [position]);

  const draw = (ctx, frameCount) => {
    if (bottomImage) {
      ctx.clearRect(0, 0, 1056, 594);
      ctx.drawImage(bottomImage, 0, 0);
      ctx.drawImage(
        hero,
        0,
        0,
        32,
        32,
        position.x * 16 - 8,
        position.y * 16 - 2,
        32,
        32
      );

      ctx.drawImage(topImage, 0, 0);
    }
  };

  return <Canvas draw={draw}></Canvas>;
};

export default GameMap;
