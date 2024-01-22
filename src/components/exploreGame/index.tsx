import useWindowSize from "@/src/hooks/useWindowSize";
import { useRef, useEffect, useState } from "react";
export default function ExploreGame() {
  const canvas = useRef<HTMLCanvasElement>(null);
  // const WINDOW_DIMENSION = useWindowSize();
  const WINDOW_DIMENSION = {
    width: 0,
    height: 0,
  };
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
      const imgHeight = WINDOW_DIMENSION.height * 2;
      const imgWidth = Math.ceil((imgHeight * 2) / 7); // 1000 is the width of the background image, 3500 is the height of the background image
      const repeatCount = Math.ceil(WINDOW_DIMENSION.width / imgWidth);
      for (let i = 0; i < repeatCount; i++) {
        ctx.drawImage(background, i * imgWidth, 0, imgWidth, imgHeight);
      }
    }
  }

  const drawGround = (
    ctx: CanvasRenderingContext2D | null | undefined,
    platformSprite: HTMLImageElement
  ) => {
    if (canvas.current && ctx) {
      // Drawing the ground
      const groundSpriteHeight = WINDOW_DIMENSION.height * 0.3;
      const groundSpriteWidth = Math.ceil((groundSpriteHeight * 500) / 245); // 500 is the width of the platform sprite, 245 is the height of the platform sprite
      const repeatCountGround = Math.ceil(
        WINDOW_DIMENSION.width / groundSpriteWidth
      );
      for (let i = 0; i < repeatCountGround; i++) {
        ctx.drawImage(
          platformSprite,
          15,
          475,
          500,
          245,
          i * groundSpriteWidth,
          WINDOW_DIMENSION.height * 1.7,
          groundSpriteWidth,
          groundSpriteHeight
        );
      }

      // Drawing the grass
      const grassSpriteHeight = Math.ceil(WINDOW_DIMENSION.height * 0.123);
      const grassSpriteWidth = grassSpriteHeight * 5; // 500 is the width of the background image, 100 is the height of the background image
      const repeatCountGrass = Math.ceil(
        WINDOW_DIMENSION.width / grassSpriteWidth
      );
      for (let i = 0; i < repeatCountGrass; i++) {
        ctx.drawImage(
          platformSprite,
          15,
          355,
          500,
          100,
          i * grassSpriteWidth,
          WINDOW_DIMENSION.height * 1.577,
          grassSpriteWidth,
          grassSpriteHeight
        );
      }
    }
  };

  const drawPlatform = (
    ctx: CanvasRenderingContext2D | null | undefined,
    platformSprite: HTMLImageElement
  ) => {
    if (canvas.current && ctx) {
      // Drawing the central platform
      const platformSpriteHeight = WINDOW_DIMENSION.height * 0.3;
      const platformSpriteWidth = Math.ceil((platformSpriteHeight * 275) / 325); // 275 is the width of the platform sprite, 325 is the height of the platform sprite
      ctx.drawImage(
        platformSprite,
        15,
        15,
        275,
        325,
        WINDOW_DIMENSION.width * 0.5 - platformSpriteWidth * 0.5,
        WINDOW_DIMENSION.height * 1.027,
        platformSpriteWidth,
        platformSpriteHeight
      );

      // Drawing the left platform
      const leftPlatformSpriteHeight = WINDOW_DIMENSION.height * 0.15;
      const leftPlatformSpriteWidth = Math.ceil(
        (leftPlatformSpriteHeight * 225) / 150
      ); // 225 is the width of the platform sprite, 150 is the height of the platform sprite
      ctx.drawImage(
        platformSprite,
        305,
        15,
        225,
        150,
        WINDOW_DIMENSION.width * 0.5 - leftPlatformSpriteWidth * 1.05,
        WINDOW_DIMENSION.height * 1.39,
        leftPlatformSpriteWidth,
        leftPlatformSpriteHeight
      );

      // Drawing the right platform
      const rightPlatformSpriteHeight = WINDOW_DIMENSION.height * 0.17;
      const rightPlatformSpriteWidth = Math.ceil(
        (leftPlatformSpriteHeight * 225) / 150
      ); // 225 is the width of the platform sprite, 150 is the height of the platform sprite
      ctx.drawImage(
        platformSprite,
        305,
        15,
        225,
        150,
        WINDOW_DIMENSION.width * 0.5 + rightPlatformSpriteWidth * 0.4,
        WINDOW_DIMENSION.height * 1.3,
        rightPlatformSpriteWidth,
        rightPlatformSpriteHeight
      );
    }
  };

  // Variables for shadow platform position, scale
  const shadowPlatformSprite = [
    {
      heightPercent: 0.093,
      spritePosition: { x: 305, y: 180, width: 150, height: 100 },
    },
    {
      heightPercent: 0.06,
      spritePosition: { x: 305, y: 290, width: 150, height: 55 },
    },
  ];

  let shadowPlatformPosition: {
    x: number;
    y: number;
    scale: number;
    shadowPlatformSpriteIndex: number;
  }[] = [];

  const drawShadowPlatform = (
    ctx: CanvasRenderingContext2D | null | undefined,
    platformSprite: HTMLImageElement
  ) => {
    if (ctx && canvas.current) {
      shadowPlatformPosition.map((shadowPlatform, index) => {
        const spritePos =
          shadowPlatformSprite[shadowPlatform.shadowPlatformSpriteIndex]
            .spritePosition;

        const shadowPlatformSpriteHeight =
          shadowPlatformSprite[shadowPlatform.shadowPlatformSpriteIndex]
            .heightPercent *
          WINDOW_DIMENSION.height *
          shadowPlatform.scale;
        const shadowPlatformSpriteWidth = Math.ceil(
          (shadowPlatformSpriteHeight * spritePos.width) / spritePos.height
        );
        ctx.drawImage(
          platformSprite,
          spritePos.x,
          spritePos.y,
          spritePos.width,
          spritePos.height,
          shadowPlatform.x - shadowPlatformSpriteWidth / 2,
          shadowPlatform.y,
          shadowPlatformSpriteWidth,
          shadowPlatformSpriteHeight
        );
      });
      console.log("drawn");
    }
  };

  const canvasResize = () => {
    if (canvas.current) {
      WINDOW_DIMENSION.width = window.innerWidth;
      WINDOW_DIMENSION.height = window.innerHeight;
      canvas.current.width = WINDOW_DIMENSION.width;
      canvas.current.height = 2 * WINDOW_DIMENSION.height;
    }
  };

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    const spriteSheet = new Image();
    spriteSheet.src = "/assets/spriteSheets/ryokoRunJump.png";
    const background = new Image();
    background.src = "/assets/spriteSheets/background.png";
    const platformSprite = new Image();
    platformSprite.src = "/assets/spriteSheets/platformSprite.png";

    if (canvas.current) {
      canvasResize();

      window.addEventListener("resize", () => {
        canvasResize();
      });
    }

    const shadowPlatformRepeatCount = Math.ceil(
      WINDOW_DIMENSION.width /
        (shadowPlatformSprite[0].spritePosition.width * 2)
    );

    const shadowPlatformConstructor = () => {
      let shadowPlatformSpawnWidth =
        WINDOW_DIMENSION.width / shadowPlatformRepeatCount;
      let shadowPlatformSpawnHeight = WINDOW_DIMENSION.height * 0.228;
      for (let i = 0; i < shadowPlatformRepeatCount; i++) {
        shadowPlatformPosition.push({
          x:
            Math.random() * shadowPlatformSpawnWidth +
            shadowPlatformSpawnWidth * i +
            (i && 100),
          y:
            Math.random() * shadowPlatformSpawnHeight +
            1.207 * WINDOW_DIMENSION.height,
          scale: Math.random() * 0.5 + 0.75,
          shadowPlatformSpriteIndex: Math.round(Math.random()),
        });
      }

      console.log(shadowPlatformPosition);
    };
    shadowPlatformConstructor();

    function animate() {
      ctx?.clearRect(0, 0, WINDOW_DIMENSION.width, WINDOW_DIMENSION.height * 2);
      drawBackground(ctx, background);
      drawGround(ctx, platformSprite);
      drawShadowPlatform(ctx, platformSprite);
      drawPlatform(ctx, platformSprite);

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

    const canvasRefCopy = canvas.current;
    return () => {
      canvasRefCopy?.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <canvas ref={canvas} className="h-[200vh] w-full"></canvas>
      {/* <div className="flex w-[500px] justify-between">
        <button onClick={MoveLeft}>Left</button>
        <button onClick={MoveRight}>Right</button>
      </div> */}
    </div>
  );
}
