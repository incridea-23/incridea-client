import { useRef, useEffect, useState } from "react";

const WINDOW_DIMENSION = {
  width: 0,
  height: 0,
};
const player = {
  height: 75,
  width: 75,
  x: 0,
  y: 0,
};
const velocity = {
  x: 6,
  y: 0,
};
let rightBoundary = 0;
let leftBoundary = 0;
const prevPos = { x: 0, y: 0 };

export default function ExploreGame() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const SpriteDimensions = {
    right: [
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
          x: 1346,
          y: 255,
          width: 164,
          height: 220,
        },
        {
          x: 1577,
          y: 265,
          width: 171,
          height: 220,
        },
        {
          x: 1809,
          y: 272,
          width: 156,
          height: 227,
        },
        {
          x: 0,
          y: 251,
          width: 130,
          height: 217,
        },
        {
          x: 191,
          y: 258,
          width: 144,
          height: 215,
        },
        {
          x: 405,
          y: 255,
          width: 171,
          height: 218,
        },
        {
          x: 627,
          y: 265,
          width: 140,
          height: 220,
        },
        {
          x: 860,
          y: 265,
          width: 171,
          height: 220,
        },
        {
          x: 1115,
          y: 255,
          width: 145,
          height: 218,
        },
      ],
    ],
    left: [
      [
        {
          x: 0,
          y: 752,
          width: 200,
          height: 246,
        },
      ],
      [
        {
          x: 455,
          y: 1006,
          width: 164,
          height: 220,
        },
        {
          x: 217,
          y: 1006,
          width: 171,
          height: 220,
        },
        {
          x: 0,
          y: 1023,
          width: 157,
          height: 227,
        },
        {
          x: 1835,
          y: 1002,
          width: 131,
          height: 217,
        },
        {
          x: 1630,
          y: 1009,
          width: 144,
          height: 215,
        },
        {
          x: 1389,
          y: 1006,
          width: 171,
          height: 218,
        },
        {
          x: 1198,
          y: 1016,
          width: 140,
          height: 220,
        },
        {
          x: 934,
          y: 1016,
          width: 171,
          height: 220,
        },
        {
          x: 705,
          y: 1006,
          width: 145,
          height: 218,
        },
      ],
    ],
  };
  let spriteIndex = 0;
  let frameCount = 0;
  let spriteState = "idle";
  const gravity = 0.1;
  let isRightDirection = true;
  const actionKeys: string[] = [];
  let isGrounded = false;

  function MoveRight() {
    if (frameCount === 0 && isGrounded) {
      if (
        spriteIndex >= SpriteDimensions.right[1].length - 1 &&
        frameCount == 0
      )
        spriteIndex = 0;
      else spriteIndex++;
    }
    if (player.x < rightBoundary) {
      player.x += velocity.x;
    }
  }

  function MoveLeft() {
    if (frameCount === 0 && isGrounded) {
      if (spriteIndex >= SpriteDimensions.left[1].length - 1) spriteIndex = 0;
      else {
        spriteIndex++;
      }
    }
    if (player.x > leftBoundary) {
      player.x -= velocity.x;
    }
  }

  function Jump() {
    if (isGrounded) {
      velocity.y = -7;
      isGrounded = false;
    }
  }

  const keyboardDownEventHandler = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        isRightDirection = false;
        actionKeys.indexOf("ArrowLeft") === -1 && actionKeys.push(e.key);
        break;
      case "ArrowRight":
        e.preventDefault();
        actionKeys.indexOf("ArrowRight") === -1 && actionKeys.push(e.key);
        break;
      case "ArrowUp":
        e.preventDefault();
        actionKeys.indexOf("ArrowUp") === -1 && actionKeys.push(e.key);
        break;
      case " ":
        e.preventDefault();
        actionKeys.indexOf("ArrowUp") === -1 && actionKeys.push("ArrowUp");
        break;
    }
  };

  const keyboardUpEventHandler = (event: KeyboardEvent) => {
    actionKeys.includes(event.key) &&
      actionKeys.splice(actionKeys.indexOf(event.key), 1);
    event.key === " " && actionKeys.splice(actionKeys.indexOf("ArrowUp"), 1);
  };

  useEffect(() => {
    // Add the event listeners
    window.addEventListener("keydown", (event) =>
      keyboardDownEventHandler(event)
    );
    window.addEventListener("keyup", (event) => keyboardUpEventHandler(event));
    return () => {
      window.removeEventListener("keydown", keyboardDownEventHandler);
      window.removeEventListener("keyup", keyboardUpEventHandler);
    };
  }, []); // Empty dependency array to run only on mount and unmount

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
        284,
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
        477,
        177,
        225,
        150,
        WINDOW_DIMENSION.width * 0.5 + rightPlatformSpriteWidth * 0.4,
        WINDOW_DIMENSION.height * 1.3,
        rightPlatformSpriteWidth,
        rightPlatformSpriteHeight
      );
    }
  };

  const collisionDetection = (
    ctx: CanvasRenderingContext2D | null | undefined
  ) => {
    const centralPlatformSpriteHeight = WINDOW_DIMENSION.height * 0.3;
    const centralPlatformSpriteWidth = Math.ceil(
      (centralPlatformSpriteHeight * 275) / 325
    );

    const leftPlatformSpriteHeight = WINDOW_DIMENSION.height * 0.15;
    const leftPlatformSpriteWidth = Math.ceil(
      (leftPlatformSpriteHeight * 225) / 150
    );

    const rightPlatformSpriteWidth = Math.ceil(
      (leftPlatformSpriteHeight * 225) / 150
    );

    if (player.y >= WINDOW_DIMENSION.height * 1.62 - player.height) {
      isGrounded = true;
      player.y = WINDOW_DIMENSION.height * 1.62 - player.height;
    } else if (
      player.y >= WINDOW_DIMENSION.height * 1.405 - player.height &&
      prevPos.y <= WINDOW_DIMENSION.height * 1.405 - player.height &&
      player.x >=
        WINDOW_DIMENSION.width * 0.5 -
          leftPlatformSpriteWidth * 1.05 -
          player.width / 2 &&
      player.x <=
        WINDOW_DIMENSION.width * 0.5 -
          leftPlatformSpriteWidth * 1.05 +
          leftPlatformSpriteWidth -
          player.width / 4
    ) {
      isGrounded = true;
      player.y = WINDOW_DIMENSION.height * 1.405 - player.height;
    } else if (
      player.y <= WINDOW_DIMENSION.height * 1.425 &&
      prevPos.y > WINDOW_DIMENSION.height * 1.425 &&
      player.x >=
        WINDOW_DIMENSION.width * 0.5 -
          leftPlatformSpriteWidth * 1.05 -
          player.width / 2 &&
      player.x <=
        WINDOW_DIMENSION.width * 0.5 -
          leftPlatformSpriteWidth * 1.05 +
          leftPlatformSpriteWidth -
          player.width / 4
    ) {
      isGrounded = false;
      velocity.y = 0;
    } else if (
      player.y >= WINDOW_DIMENSION.height * 1.32 - player.height &&
      prevPos.y <= WINDOW_DIMENSION.height * 1.32 - player.height &&
      player.x >=
        WINDOW_DIMENSION.width * 0.5 +
          rightPlatformSpriteWidth * 0.4 -
          player.width / 2 &&
      player.x <=
        WINDOW_DIMENSION.width * 0.5 +
          rightPlatformSpriteWidth * 0.4 +
          rightPlatformSpriteWidth -
          player.width / 4
    ) {
      isGrounded = true;
      player.y = WINDOW_DIMENSION.height * 1.32 - player.height;
    } else if (
      player.y <= WINDOW_DIMENSION.height * 1.34 &&
      prevPos.y > WINDOW_DIMENSION.height * 1.34 &&
      player.x >=
        WINDOW_DIMENSION.width * 0.5 +
          rightPlatformSpriteWidth * 0.4 -
          player.width / 2 &&
      player.x <=
        WINDOW_DIMENSION.width * 0.5 +
          rightPlatformSpriteWidth * 0.4 +
          rightPlatformSpriteWidth -
          player.width / 4
    ) {
      isGrounded = false;
      velocity.y = 0;
    } else if (
      player.y >= WINDOW_DIMENSION.height * 1.18 - player.height &&
      prevPos.y <= WINDOW_DIMENSION.height * 1.18 - player.height &&
      player.x >=
        WINDOW_DIMENSION.width * 0.5 -
          centralPlatformSpriteWidth * 0.5 -
          player.width / 2 &&
      player.x <=
        WINDOW_DIMENSION.width * 0.5 -
          centralPlatformSpriteWidth * 0.5 +
          centralPlatformSpriteWidth
    ) {
      isGrounded = true;
      player.y = WINDOW_DIMENSION.height * 1.18 - player.height;
    } else if (
      player.y <= WINDOW_DIMENSION.height * 1.2 &&
      prevPos.y > WINDOW_DIMENSION.height * 1.2 &&
      player.x >=
        WINDOW_DIMENSION.width * 0.5 -
          centralPlatformSpriteWidth * 0.5 -
          player.width / 2 &&
      player.x <=
        WINDOW_DIMENSION.width * 0.5 -
          centralPlatformSpriteWidth * 0.5 +
          centralPlatformSpriteWidth
    ) {
      isGrounded = false;
      velocity.y = 0;

      /* ######### EASTER EGG GOES HERE ######### */
    } else {
      isGrounded = false;
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

  const shadowPlatformPosition: {
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

  /* {
    if(typeof(window) !== undefined)
    WINDOW_DIMENSION.width = window.innerWidth;
    WINDOW_DIMENSION.height = window.innerHeight;
    player.x = prevPos.x;
    player.y = prevPos.y;
    rightBoundary = WINDOW_DIMENSION.width - player.width;
  }; */
  // Copy this whenever REACT STATES are changed using useEffect having that state as dependency

  // example:
  // const [dummy, setDummy] = useState(0);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setDummy(dummy + 1);
  //   }, 1000);
  //   resetStates();
  // }, [dummy]);

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    const spriteSheet = new Image();
    player.x =
      WINDOW_DIMENSION.width * 0.5 - WINDOW_DIMENSION.height * 0.3 * 0.5;
    rightBoundary = WINDOW_DIMENSION.width - player.width;
    player.y = WINDOW_DIMENSION.height * 1.06;
    prevPos.x = player.x;
    prevPos.y = player.y;
    spriteSheet.src = "/assets/spriteSheets/ryokoSpriteSheet.png";
    const background = new Image();
    background.src = "/assets/spriteSheets/background.png";
    const platformSprite = new Image();
    platformSprite.src = "/assets/spriteSheets/platformSprite.png";

    if (canvas.current) {
      canvasResize();

      window.addEventListener("resize", () => {
        canvasResize();
        WINDOW_DIMENSION.width = window.innerWidth;
        WINDOW_DIMENSION.height = window.innerHeight;
        rightBoundary = WINDOW_DIMENSION.width - player.width;
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
            (i && shadowPlatformSpawnWidth / 2),
          y:
            Math.random() * shadowPlatformSpawnHeight +
            1.207 * WINDOW_DIMENSION.height,
          scale: Math.random() * 0.5 + 0.75,
          shadowPlatformSpriteIndex: Math.round(Math.random()),
        });
      }
    };
    shadowPlatformConstructor();

    function animate() {
      actionKeys.map((key) => {
        switch (key) {
          case "ArrowLeft":
            MoveLeft();
            break;
          case "ArrowRight":
            MoveRight();
            break;
          case "ArrowUp":
            Jump();
            break;
        }
      });

      if (
        actionKeys.includes("ArrowLeft") &&
        actionKeys.includes("ArrowRight")
      ) {
        spriteState = "idle";
      } else if (
        actionKeys.includes("ArrowLeft") ||
        actionKeys.includes("ArrowRight")
      ) {
        spriteState = "walk";
      } else {
        spriteState = "idle";
      }

      if (
        actionKeys.includes("ArrowLeft") &&
        actionKeys.includes("ArrowRight")
      ) {
        isRightDirection =
          actionKeys.indexOf("ArrowLeft") > actionKeys.indexOf("ArrowRight")
            ? false
            : true;
      } else if (actionKeys.includes("ArrowLeft")) {
        isRightDirection = false;
      } else if (actionKeys.includes("ArrowRight")) {
        isRightDirection = true;
      }

      ctx?.clearRect(0, 0, WINDOW_DIMENSION.width, WINDOW_DIMENSION.height * 2);
      drawBackground(ctx, background);
      drawGround(ctx, platformSprite);
      drawShadowPlatform(ctx, platformSprite);
      drawPlatform(ctx, platformSprite);

      const currentSpriteState =
        spriteState === "idle"
          ? SpriteDimensions[isRightDirection ? "right" : "left"][0][0]
          : SpriteDimensions[isRightDirection ? "right" : "left"][1][
              spriteIndex
            ];

      player.y += velocity.y;
      collisionDetection(ctx);
      if (!isGrounded) {
        velocity.y += gravity;
      } else {
        velocity.y = 0;
      }
      ctx?.drawImage(
        spriteSheet,
        currentSpriteState.x,
        currentSpriteState.y,
        currentSpriteState.width,
        currentSpriteState.height,
        player.x,
        player.y,
        player.width,
        player.height
      );

      prevPos.x = player.x;
      prevPos.y = player.y;

      frameCount = (frameCount + 1) % 5;
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
      <div className="flex w-32 justify-between bg-white py-4 fixed bottom-0">
        <button
          onTouchStart={() => {
            actionKeys.push("ArrowLeft");
            MoveLeft();
          }}
          onTouchEnd={() => {
            if (actionKeys.includes("ArrowLeft")) {
              actionKeys.splice(actionKeys.indexOf("ArrowLeft", 1));
            }
          }}
          className="w-full"
        >
          Left
        </button>
        <button
          onTouchStart={() => {
            actionKeys.push("ArrowRight");
            MoveRight();
          }}
          onTouchEnd={() => {
            if (actionKeys.includes("ArrowRight")) {
              actionKeys.splice(actionKeys.indexOf("ArrowRight", 1));
            }
          }}
          className="w-full"
        >
          Right
        </button>
        <button
          onTouchStart={() => {
            actionKeys.push("ArrowUp");
            Jump();
          }}
          onTouchEnd={() => {
            if (actionKeys.includes("ArrowUp")) {
              actionKeys.splice(actionKeys.indexOf("ArrowUp", 1));
            }
          }}
          className="w-full"
        >
          Jump
        </button>
      </div>
    </div>
  );
}
