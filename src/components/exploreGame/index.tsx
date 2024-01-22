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
  const SpriteDimensions = [
    [
      {
        x: 0,
        y: 0,
        width: 200,
        height: 248,
      },
    ],
    [
      {
        x: 0,
        y: 248,
        width: 180,
        height: 248,
      },
      {
        x: 400,
        y: 248,
        width: 180,
        height: 248,
      },
      {
        x: 600,
        y: 248,
        width: 180,
        height: 248,
      },
      {
        x: 850,
        y: 248,
        width: 180,
        height: 248,
      },
      {
        x: 1100,
        y: 248,
        width: 180,
        height: 248,
      },
      {
        x: 1325,
        y: 248,
        width: 180,
        height: 248,
      },
      {
        x: 1550,
        y: 248,
        width: 180,
        height: 248,
      },
      {
        x: 1800,
        y: 248,
        width: 180,
        height: 248,
      },
    ],
  ];
  let spriteIndex = 0;
  let spriteRow = 0;
  let gameFrame = 0;
  let staggerFrames = 25;
  let spriteX = 0;
  let spriteY = WINDOW_DIMENSION.height * 1.5;
  let rightBoundary = WINDOW_DIMENSION.width - 50;
  let leftBoundary = 50;
  let spriteState = "idle";
  let velocity = {
    x: 15,
    y: 1,
  };

  function MoveRight() {
    if (spriteIndex > 6) {
      spriteIndex = 0;
      if (spriteX < rightBoundary) {
        spriteX += 15;
      }
    } else {
      spriteIndex++;
      if (spriteX < rightBoundary) {
        spriteX += 15;
      }
    }
  }

  function MoveLeft() {
    if (spriteIndex < 1) {
      spriteIndex = 7;
      if (spriteX > leftBoundary) {
        spriteX -= 15;
      }
    } else {
      spriteIndex--;
      if (spriteX > leftBoundary) {
        spriteX -= 15;
      }
    }
  }

  function ForwardJump() {
    if (velocity.y === 1) {
      velocity.y = -7;
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          if (spriteX < rightBoundary) {
            spriteX += 10;
          }
        }, i * 20);
      }
    }
  }

  function Jump() {
    if (velocity.y === 1) {
      velocity.y = -7;
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

  useEffect(() => {
    // Define your event handlers
    const moveLeft = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        spriteState = "walk";
        MoveLeft();
      }
    };

    const moveRight = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        spriteState = "walk";
        MoveRight();
      }
    };

    const jump = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        Jump();
      }
    };

    const jumpForward = (event: KeyboardEvent) => {
      //@ts-ignore
      if (event.key === "m") {
        ForwardJump();
      }
    };

    // Add the event listeners
    window.addEventListener("keydown", moveLeft);
    window.addEventListener("keydown", moveRight);
    window.addEventListener("keyup", () => {
      spriteState = "idle";
    });
    window.addEventListener("keydown", jump);
    window.addEventListener("keydown", jumpForward);
    window.addEventListener(
      "keydown",
      function (e) {
        if (
          ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
            e.code
          ) > -1
        ) {
          e.preventDefault();
        }
      },
      false
    );
    // Remove the event listeners when the component unmounts
    return () => {
      window.removeEventListener("keydown", moveLeft);
      window.removeEventListener("keydown", moveRight);
      window.removeEventListener("keydown", jump);
      window.removeEventListener("keydown", jumpForward);
    };
  }, []); // Empty dependency array to run only on mount and unmount

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
    spriteX =
      WINDOW_DIMENSION.width * 0.5 - WINDOW_DIMENSION.height * 0.3 * 0.5;
    rightBoundary = WINDOW_DIMENSION.width - 150;
    spriteY = WINDOW_DIMENSION.height * 1.06;
    spriteSheet.src = "/assets/spriteSheets/ryokoSpriteSheet.png";
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
        spriteState === "idle"
          ? SpriteDimensions[0][0].x
          : SpriteDimensions[1][spriteIndex].x,
        spriteState === "idle"
          ? SpriteDimensions[0][0].y
          : SpriteDimensions[1][spriteIndex].y,
        spriteState === "idle"
          ? SpriteDimensions[0][0].width
          : SpriteDimensions[1][spriteIndex].width,
        spriteState === "idle"
          ? SpriteDimensions[0][0].height
          : SpriteDimensions[1][spriteIndex].height,
        spriteX,
        spriteY,
        100,
        100
      );

      spriteY += velocity.y;
      if (velocity.y < 5) {
        velocity.y += 0.1;
      }
      if (spriteY > WINDOW_DIMENSION.height * 1.5) {
        spriteY = WINDOW_DIMENSION.height * 1.5;
        velocity.y = 1;
      }

      // if (gameFrame % staggerFrames === 0) {
      //   if (spriteIndex > 6) {
      //     spriteIndex = 0;
      //   } else {
      //     spriteIndex++;
      //   }
      // }
      // gameFrame++;

      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  //   const canvasRefCopy = canvas.current;
  //   return () => {
  //     canvasRefCopy?.removeEventListener("resize", () => {});
  //   };
  // }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <canvas ref={canvas} className="h-[200vh] w-full"></canvas>
      <div className="flex w-32 justify-between bg-white py-4 fixed bottom-0">
        <button onClick={MoveLeft} className="w-full">
          Left
        </button>
        <button onClick={MoveRight} className="w-full">
          Right
        </button>
      </div>
    </div>
  );
}
