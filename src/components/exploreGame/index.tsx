import useWindowSize from "@/src/hooks/useWindowSize";
import { useRef, useEffect, useState } from "react";
export default function ExploreGame() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const WINDOW_DIMENSION = useWindowSize();
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

  function drawBackground(
    ctx: CanvasRenderingContext2D | null | undefined,
    background: HTMLImageElement
  ) {
    if (ctx) {
      const imgHeight = (WINDOW_DIMENSION.height as number) * 2;
      const imgWidth = ((imgHeight as number) * 2) / 7;
      const repeatCount = Math.ceil(
        (WINDOW_DIMENSION.width && WINDOW_DIMENSION.width / imgWidth) as number
      );
      for (let i = 0; i < repeatCount; i++) {
        ctx.drawImage(
          background,
          i * imgWidth,
          0,
          imgWidth,
          imgHeight as number
        );
      }
    }
  }

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    const spriteSheet = new Image();
    spriteSheet.src = "/assets/spriteSheets/ryokoRunJump.png";
    const background = new Image();
    background.src = "/assets/spriteSheets/background.png";
    const platformSprite = new Image();
    platformSprite.src = "/assets/spriteSheets/platformSpite.png";
    if (canvas.current) {
      canvas.current.width = WINDOW_DIMENSION.width as number;
      canvas.current.height = 2 * (WINDOW_DIMENSION.height as number);
      // console.log(WINDOW_DIMENSION.width, WINDOW_DIMENSION.height);
    }
    function animate() {
      ctx?.clearRect(
        0,
        0,
        WINDOW_DIMENSION.width as number,
        (WINDOW_DIMENSION.height as number) * 2
      );
      drawBackground(ctx, background);
      ctx?.drawImage(
        spriteSheet,
        walkSprite[spriteIndex].x,
        walkSprite[spriteIndex].y,
        walkSprite[spriteIndex].width,
        walkSprite[spriteIndex].height,
        0,
        0,
        100,
        100
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
      <canvas ref={canvas} className="h-[200vh] w-full"></canvas>
      <div className="flex w-[500px] justify-between">
        <button onClick={MoveLeft}>Left</button>
        <button onClick={MoveRight}>Right</button>
      </div>
    </div>
  );
}
