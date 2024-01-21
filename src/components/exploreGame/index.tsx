import { useRef, useEffect, useState } from "react";
export default function ExploreGame() {
  const canvas = useRef<HTMLCanvasElement>(null);
  let CANVAS_WIDTH = 500;
  let CANVAS_HEIGHT = 500;
  const [direction, setDirection] = useState<"left" | "right">("right");
  const walkSprite = [
    {
      x: 0,
      y: 0,
      width: 32,
      height: 64,
    },
    {
      x: 32,
      y: 0,
      width: 32,
      height: 64,
    },
    {
      x: 68,
      y: 0,
      width: 32,
      height: 64,
    },
    {
      x: 99,
      y: 0,
      width: 32,
      height: 64,
    },
    {
      x: 128,
      y: 0,
      width: 32,
      height: 64,
    },
    {
      x: 162,
      y: 0,
      width: 38,
      height: 64,
    },
    {
      x: 204,
      y: 0,
      width: 36,
      height: 64,
    },
    {
      x: 238,
      y: 0,
      width: 32,
      height: 64,
    },
  ];
  let spriteIndex = 0;
  let spriteRow = 0;
  let gameFrame = 0;
  let staggerFrames = 25;

  function MoveRight() {
    if (spriteIndex > 6) {
      spriteIndex = 0;
    } else {
      spriteIndex++;
    }
  }

  function MoveLeft() {
    if (spriteIndex < 1) {
      spriteIndex = 7;
    } else {
      spriteIndex--;
    }
  }

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    const spriteSheet = new Image();
    if (ctx) {
      CANVAS_WIDTH = canvas.current?.width || 500;
      CANVAS_HEIGHT = canvas.current?.height || 500;
      spriteSheet.src = "/assets/spriteSheets/ryokoRunJump.png";
    }
    function animate() {
      ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx?.drawImage(
        spriteSheet,
        walkSprite[spriteIndex].x,
        walkSprite[spriteIndex].y,
        walkSprite[spriteIndex].width,
        walkSprite[spriteIndex].height,
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );

      if (gameFrame % staggerFrames === 0) {
        if (spriteIndex > 6) {
          spriteIndex = 0;
        } else {
          spriteIndex++;
        }
      }
      gameFrame++;
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <canvas
        ref={canvas}
        className="w-[500px] h-[500px] border border-black"
      ></canvas>
      <div className="flex w-[500px] justify-between">
        <button onClick={MoveLeft}>Left</button>
        <button onClick={MoveRight}>Right</button>
      </div>
    </div>
  );
}
