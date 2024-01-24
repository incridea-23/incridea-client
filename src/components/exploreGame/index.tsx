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
  x: 3,
  y: 0,
};
let rightBoundary = 0;
let leftBoundary = 0;
const prevPos = { x: 0, y: 0 };
let changeState = false;

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
  const [showAbout, setShowAbout] = useState(false);

  // const [scrollY, setScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [scrollY]);

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
      setShowAbout(false);
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
      setShowAbout(false);
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
      setShowAbout(false);
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
      setShowAbout(false);
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
      setShowAbout(false);
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

      if (!changeState) {
        setShowAbout(true);
        changeState = true;
      } else {
        changeState = false;
      }
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
      setShowAbout(false);
      velocity.y = 0;

      /* ######### EASTER EGG GOES HERE ######### */
    } else {
      isGrounded = false;
      setShowAbout(false);
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
    WINDOW_DIMENSION.width = window.innerWidth;
    WINDOW_DIMENSION.height = window.innerHeight;
    player.x = prevPos.x;
    player.y = prevPos.y;
    rightBoundary = WINDOW_DIMENSION.width - player.width;
  }, [showAbout]);

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
      <div
        className="absolute bg-[#d64d00] h-max w-max top-[20%] text-[#fec3b5] pressStart text-center sm:p-12 border-l-4 border-t-4 border-white p-4 rounded-lg"
        style={{ borderStyle: "outset" }}
      >
        <h1 className="lg:text-8xl md:text-7xl sm:text-6xl text-4xl">
          INCRIDEA
        </h1>
        <h3 className="lg:text-5xl md:text-4xl sm:text-3xl text-xl">
          DICE OF DESTINY
        </h3>
        <span className="absolute -top-16 text-white left-0 flex flex-col lg:text-xl md:text-lg sm:text-md text-sm">
          <p>RYOKO</p>
          <p>000006</p>
        </span>
        <span className="absolute -bottom-5 text-white right-0 lg:text-xl md:text-lg sm:text-md text-sm">
          © Incridea 2024
        </span>
      </div>

      {showAbout && (
        <div
          className="absolute h-max sm:max-w-lg sm:text-xs sm:top-[35%] md:max-w-xl md:text-md max-w-md text-xs top-[30%] mx-4 text-opacity-80  bg-[#86d6e9]/30 p-6 xl:top-[45%] xl:left-6 xl:max-w-xl xl:text-lg  text-white pressStart justify-evenly text-justify space-y-4 rounded-lg"
          style={{ borderStyle: "outset" }}
        >
          <p>
            Incridea, a three-day National-Level extravaganza will play host to
            over 60 events, spanning the technical, non-technical, and cultural
            spheres, replete with cultural soirées and pronites, promising to be
            an experience of a lifetime.
          </p>
          <p>
            The stunning marine world, with all its wonders and marvels, will be
            unveiled before your very eyes, as you revel in the vivacity of
            these momentous days, forging memories that shall be etched in your
            minds forevermore.
          </p>

          <span className="absolute bottom-1 right-2 text-xs font-mono">
            Try controlling Ryoko
          </span>
        </div>
      )}
      <canvas ref={canvas} className="h-[200vh] w-full "></canvas>
      {/* <div className="flex w-32 justify-between bg-white py-4 fixed bottom-0">
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
          onMouseDown={() => {
            actionKeys.push("ArrowLeft");
            MoveLeft();
          }}
          onMouseUp={() => {
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
          onMouseDown={() => {
            actionKeys.push("ArrowRight");
            MoveRight();
          }}
          onMouseUp={() => {
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
          onMouseDown={() => {
            actionKeys.push("ArrowUp");
            Jump();
          }}
          onMouseUp={() => {
            if (actionKeys.includes("ArrowUp")) {
              actionKeys.splice(actionKeys.indexOf("ArrowUp", 1));
            }
          }}
          className="w-full"
        >
          Jump
        </button>
      </div> */}

      <div className="fixed bottom-5 right-5 opacity-50">
        <svg
          width="205"
          height="150"
          viewBox="0 0 1222 888"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none"
        >
          <g
            id="Right"
            onTouchStart={() => {
              actionKeys.push("ArrowRight");
              MoveRight();
            }}
            onTouchEnd={() => {
              if (actionKeys.includes("ArrowRight")) {
                actionKeys.splice(actionKeys.indexOf("ArrowRight", 1));
              }
            }}
            onMouseDown={() => {
              actionKeys.push("ArrowRight");
              MoveRight();
              console.log("clicked");
            }}
            onMouseUp={() => {
              if (actionKeys.includes("ArrowRight")) {
                actionKeys.splice(actionKeys.indexOf("ArrowRight", 1));
              }
            }}
            className="pointer-events-auto"
          >
            <g
              id="Rectangle 6"
              filter="url(#filter0_b_95_21)"
              className="pointer-events-none"
            >
              <rect
                x="808"
                y="495"
                width="414"
                height="392"
                rx="40"
                fill="white"
              />
              <rect
                x="808.5"
                y="495.5"
                width="413"
                height="391"
                rx="39.5"
                stroke="black"
              />
            </g>
            <path
              id="Polygon 7"
              d="M1110.02 686.3C1115.71 690.343 1115.62 698.824 1109.84 702.735L965.084 800.648C958.4 805.169 949.389 800.319 949.482 792.25L951.776 593.116C951.869 585.047 960.989 580.405 967.567 585.08L1110.02 686.3Z"
              fill="black"
            />
          </g>
          <g
            id="Up"
            onTouchStart={() => {
              actionKeys.push("ArrowUp");
              Jump();
            }}
            onTouchEnd={() => {
              if (actionKeys.includes("ArrowUp")) {
                actionKeys.splice(actionKeys.indexOf("ArrowUp", 1));
              }
            }}
            onMouseDown={() => {
              actionKeys.push("ArrowUp");
              Jump();
            }}
            onMouseUp={() => {
              if (actionKeys.includes("ArrowUp")) {
                actionKeys.splice(actionKeys.indexOf("ArrowUp", 1));
              }
            }}
          >
            <g id="Rectangle 6_2" filter="url(#filter1_b_95_21)">
              <rect
                x="416"
                y="414"
                width="414"
                height="392"
                rx="40"
                transform="rotate(-90 416 414)"
                fill="white"
              />
              <rect
                x="416.5"
                y="413.5"
                width="413"
                height="391"
                rx="39.5"
                transform="matrix(0 -1 1 0 3 830)"
                stroke="black"
              />
            </g>
            <path
              id="Polygon 7_2"
              d="M607.3 111.976C611.343 106.286 619.824 106.383 623.735 112.165L721.648 256.916C726.169 263.6 721.319 272.611 713.25 272.518L514.116 270.224C506.047 270.131 501.405 261.011 506.08 254.433L607.3 111.976Z"
              fill="black"
            />
          </g>
          <g
            id="Left"
            onTouchStart={() => {
              actionKeys.push("ArrowLeft");
              MoveLeft();
            }}
            onTouchEnd={() => {
              if (actionKeys.includes("ArrowLeft")) {
                actionKeys.splice(actionKeys.indexOf("ArrowLeft", 1));
              }
            }}
            onMouseDown={() => {
              actionKeys.push("ArrowLeft");
              MoveLeft();
            }}
            onMouseUp={() => {
              if (actionKeys.includes("ArrowLeft")) {
                actionKeys.splice(actionKeys.indexOf("ArrowLeft", 1));
              }
            }}
          >
            <g id="Rectangle 7" filter="url(#filter2_b_95_21)">
              <rect
                x="416.155"
                y="884.994"
                width="414"
                height="392"
                rx="40"
                transform="rotate(179.684 416.155 884.994)"
                fill="white"
              />
              <rect
                x="415.652"
                y="884.497"
                width="413"
                height="391"
                rx="39.5"
                transform="rotate(179.684 415.652 884.497)"
                stroke="black"
              />
            </g>
            <path
              id="Polygon 8"
              d="M113.08 695.362C107.368 691.351 107.419 682.869 113.179 678.927L257.387 580.217C264.047 575.659 273.084 580.46 273.036 588.529L271.84 787.673C271.791 795.742 262.697 800.434 256.093 795.796L113.08 695.362Z"
              fill="black"
            />
          </g>
          <defs>
            <filter
              id="filter0_b_95_21"
              x="804"
              y="491"
              width="422"
              height="400"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
              <feComposite
                in2="SourceAlpha"
                operator="in"
                result="effect1_backgroundBlur_95_21"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_backgroundBlur_95_21"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_b_95_21"
              x="412"
              y="-4"
              width="400"
              height="422"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
              <feComposite
                in2="SourceAlpha"
                operator="in"
                result="effect1_backgroundBlur_95_21"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_backgroundBlur_95_21"
                result="shape"
              />
            </filter>
            <filter
              id="filter2_b_95_21"
              x="-3.78027"
              y="489.22"
              width="423.715"
              height="401.837"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
              <feComposite
                in2="SourceAlpha"
                operator="in"
                result="effect1_backgroundBlur_95_21"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_backgroundBlur_95_21"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}
