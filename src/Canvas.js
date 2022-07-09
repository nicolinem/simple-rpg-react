import React, { useEffect, useRef } from "react";
import "./Canvas.css";
import useCanvas from "./hooks/useCanvas";

const Canvas = (props) => {
  const { draw, ...rest } = props;


  const canvasRef = useCanvas(draw);

  return (
    <div className="game-container">
      <canvas
        // class="game-canvas"
        id="canvasID"
        ref={canvasRef}
        width="353"
        height="198"
      ></canvas>
    </div>
  );
};

export default Canvas;
