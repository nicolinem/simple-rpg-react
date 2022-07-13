import REACT, { useEffect, useState } from "react";
import bottoMmp from "../images/maps/DemoLower.png";
import topMap from "../images/maps/DemoUpper.png";
import bottomMapDining from "../images/maps/DiningRoomLower.png";
import heroImage from "../images/characters/people/hero.png";
import npcImage from "../images/characters/people/npc1.png";
import utils from "../utils";

const useMap = (map) => {
  const [bottomImage, setBottomImage] = useState(null);
  const [topImage, setTopImage] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [hero, setHero] = useState(null);

  const gameMaps = {
    DemoRoom: {
      bottomSrc: bottoMmp,
      topSrc: topMap,
      hero: {
        isPlayerControlled: true,
        imgSrc: heroImage,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      },
      gameObjects: [
        // {
        //   id: "hero",
        //   isPlayerControlled: true,
        //   imgSrc: heroImage,
        //   x: utils.withGrid(5),
        //   y: utils.withGrid(6),
        // },
        {
          id: "npc",
          isPlayerControlled: false,
          imgSrc: npcImage,
          x: utils.withGrid(6),
          y: utils.withGrid(9),
        },
      ],
    },
    Kitchen: {
      bottomSrc: bottomMapDining,
      topSrc: topMap,
    },
  };

  useEffect(() => {
    const bottomImage = new Image();
    bottomImage.src = gameMaps["DemoRoom"].bottomSrc;

    const topImage = new Image();
    topImage.src = gameMaps["DemoRoom"].topSrc;

    const heroImage = new Image();
    heroImage.src = gameMaps["DemoRoom"].hero.imgSrc;

    // console.log(Object.entries(gameMaps["DemoRoom"].gameObjects));
    const sprites = [];
    for (const [key, value] of Object.entries(
      gameMaps["DemoRoom"].gameObjects
    )) {
      const image = new Image();
      image.src = gameMaps["DemoRoom"].gameObjects[key].imgSrc;
      image.onload = () => {
        console.log(image);
        // sprites.push(
        //   [key]: {
        //   ...gameMaps["DemoRoom"].gameObjects[key],
        //   imgSrc: image,
        // }
        // );

        setCharacters((oldArr) => [
          ...oldArr,
          {
            ...gameMaps["DemoRoom"].gameObjects[key],
            imgSrc: image,
          },
        ]);
      };

      console.log(`${key}: ${value.isPlayerControlled}`);
    }
    setCharacters(sprites);
    console.log(characters);
    // .forEach((element) => {
    Object.keys(gameMaps["DemoRoom"].gameObjects).map((key, index) => {});

    // });
    // const heroImage = new Image();
    // heroImage.src = gameMaps["DemoRoom"].hero.imgSrc;
    heroImage.onload = () =>
      setHero({
        ...gameMaps["DemoRoom"].hero,
        imgSrc: heroImage,
      });
    bottomImage.onload = () => setBottomImage(bottomImage);
    topImage.onload = () => setTopImage(topImage);
    // heroImage.onload = () => setHeroImage(heroImage);
  }, [map]);

  return { topImage, bottomImage, characters, hero };
};

export default useMap;
