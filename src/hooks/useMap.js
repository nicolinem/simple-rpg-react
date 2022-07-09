import REACT, { useEffect, useState } from "react";
import bottoMmp from "../images/maps/DemoLower.png";
import topMap from "../images/maps/DemoUpper.png";
import bottomMapDining from "../images/maps/DiningRoomLower.png";

const useMap = (map) => {
  const [bottomImage, setBottomImage] = useState(null);
  const [topImage, setTopImage] = useState(null);

  const gameMaps = {
    DemoRoom: {
      bottomSrc: bottoMmp,
      topSrc: topMap,
    },
    Kitchen: {
      bottomSrc: bottomMapDining,
      topSrc: topMap,
    },
  };

  useEffect(() => {
    const bottomImage = new Image();
    bottomImage.src = gameMaps[map].bottomSrc;

    const topImage = new Image();
    topImage.src = gameMaps[map].topSrc;

    bottomImage.onload = () => setBottomImage(bottomImage);
    topImage.onload = () => setTopImage(topImage);
  }, [map]);

  return { topImage, bottomImage };
};

export default useMap;
