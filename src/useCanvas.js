import React, { useEffect, useRef } from "react";

const useCanvas = (draw) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    // const startGameLoop = () => {
    //   const draw = () => {
    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //     console.log("drawing...");

    //     requestAnimationFrame(() => {
    //       draw();
    //     });
    //   };
    // };
    const render = () => {
      frameCount++;
      draw(ctx, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
