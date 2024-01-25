/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import {
  SpriteDimensions,
  platformDimensions,
  platformSpriteDimensions,
} from "./gameConstants";

const ExploreGame = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);
  const WINDOW_DIMENSION = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const player = useRef({
    x: window.innerWidth * 0.5 - window.innerHeight * 0.3 * 0.5,
    y: window.innerHeight * 1.06,
    width: 75,
    height: 75,
  });
  const prevPos = useRef({
    x: player.current.x,
    y: player.current.y,
  });
  const velocity = {
    current: { x: 3, y: 0 },
  };
  const boundary = { left: 0, right: window.innerWidth - player.current.width };
  const actionKeys: string[] = [];
  const ryokoSprite = useRef<HTMLImageElement | null>(null);
  const background = useRef<HTMLImageElement | null>(null);
  const platformSprite = useRef<HTMLImageElement | null>(null);

  let isRightDirection = true;
  let spriteState: "idle" | "walk" = "idle";
  let isGrounded: boolean;
  let spriteIndex: number = 0;
  let frameCount: number = 0;
  const gravity: number = 0.15;

  const resizeCanvas = () => {
    if (canvas.current) {
      player.current.x =
        (player.current.x * window.innerWidth) / WINDOW_DIMENSION.width;
      player.current.y =
        (player.current.y * window.innerHeight) / WINDOW_DIMENSION.height;
      canvas.current.width = WINDOW_DIMENSION.width = window.innerWidth;
      WINDOW_DIMENSION.height = window.innerHeight;
      canvas.current.height = window.innerHeight * 2;
      boundary.right = window.innerWidth - player.current.width;
    }
  };

  function MoveRight() {
    if (frameCount === 0 && isGrounded) {
      if (
        spriteIndex >= SpriteDimensions.right[1].length - 1 &&
        frameCount == 0
      )
        spriteIndex = 0;
      else spriteIndex++;
    }
    if (player.current.x < boundary.right) {
      player.current.x += velocity.current.x;
    }
  }

  function MoveLeft() {
    if (frameCount === 0 && isGrounded) {
      if (spriteIndex >= SpriteDimensions.left[1].length - 1) spriteIndex = 0;
      else {
        spriteIndex++;
      }
    }
    if (player.current.x > boundary.left) {
      player.current.x -= velocity.current.x;
    }
  }

  function Jump() {
    if (isGrounded) {
      velocity.current.y = -Math.sqrt(
        window.innerHeight *
          (1.62 - platformDimensions.left.yPercentage) *
          2 *
          gravity
      );
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

  function drawBackground(
    ctx: CanvasRenderingContext2D | null | undefined,
    background: HTMLImageElement
  ) {
    // console.log(ctx);
    if (ctx) {
      const imgHeight = window.innerHeight * 2;
      const imgWidth = Math.ceil((imgHeight * 2) / 7); // 1000 is the width of the background image, 3500 is the height of the background image
      const repeatCount = Math.ceil(window.innerWidth / imgWidth);
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
      const groundSpriteHeight = window.innerHeight * 0.3;
      const groundSpriteWidth = Math.ceil((groundSpriteHeight * 500) / 245); // 500 is the width of the platform sprite, 245 is the height of the platform sprite
      const repeatCountGround = Math.ceil(
        window.innerWidth / groundSpriteWidth
      );
      for (let i = 0; i < repeatCountGround; i++) {
        ctx.drawImage(
          platformSprite,
          15,
          475,
          500,
          245,
          i * groundSpriteWidth,
          window.innerHeight * 1.7,
          groundSpriteWidth,
          groundSpriteHeight
        );
      }

      // Drawing the grass
      const grassSpriteHeight = Math.ceil(window.innerHeight * 0.123);
      const grassSpriteWidth = grassSpriteHeight * 5; // 500 is the width of the background image, 100 is the height of the background image
      const repeatCountGrass = Math.ceil(window.innerWidth / grassSpriteWidth);
      for (let i = 0; i < repeatCountGrass; i++) {
        ctx.drawImage(
          platformSprite,
          15,
          355,
          500,
          100,
          i * grassSpriteWidth,
          window.innerHeight * 1.577,
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
      const centralPlatformSpriteHeight =
        window.innerHeight * platformDimensions.centre.heightPercentage;
      const centralPlatformSpriteWidth = Math.ceil(
        centralPlatformSpriteHeight * platformDimensions.centre.aspectRatio
      );
      ctx.drawImage(
        platformSprite,
        platformSpriteDimensions.centre.x,
        platformSpriteDimensions.centre.y,
        platformSpriteDimensions.centre.width,
        platformSpriteDimensions.centre.height,
        window.innerWidth * 0.5 -
          centralPlatformSpriteWidth * platformDimensions.centre.xPercentage,
        window.innerHeight * platformDimensions.centre.yPercentage,
        centralPlatformSpriteWidth,
        centralPlatformSpriteHeight
      );

      // Drawing the left platform
      const leftPlatformSpriteHeight =
        window.innerHeight * platformDimensions.left.heightPercentage;
      const leftPlatformSpriteWidth = Math.ceil(
        leftPlatformSpriteHeight * platformDimensions.left.aspectRatio
      );
      ctx.drawImage(
        platformSprite,
        platformSpriteDimensions.left.x,
        platformSpriteDimensions.left.y,
        platformSpriteDimensions.left.width,
        platformSpriteDimensions.left.height,
        window.innerWidth * 0.5 -
          leftPlatformSpriteWidth * platformDimensions.left.xPercentage,
        window.innerHeight * platformDimensions.left.yPercentage,
        leftPlatformSpriteWidth,
        leftPlatformSpriteHeight
      );

      // Drawing the right platform
      const rightPlatformSpriteHeight =
        window.innerHeight * platformDimensions.right.heightPercentage;
      const rightPlatformSpriteWidth = Math.ceil(
        leftPlatformSpriteHeight * platformDimensions.right.aspectRatio
      );
      ctx.drawImage(
        platformSprite,
        platformSpriteDimensions.right.x,
        platformSpriteDimensions.right.y,
        platformSpriteDimensions.right.width,
        platformSpriteDimensions.right.height,
        window.innerWidth * 0.5 -
          rightPlatformSpriteWidth * platformDimensions.right.xPercentage,
        window.innerHeight * platformDimensions.right.yPercentage,
        rightPlatformSpriteWidth,
        rightPlatformSpriteHeight
      );
    }
  };

  const collisionDetection = (
    ctx: CanvasRenderingContext2D | null | undefined
  ) => {
    const centralPlatformSpriteHeight =
      window.innerHeight * platformDimensions.centre.heightPercentage;
    const centralPlatformSpriteWidth = Math.ceil(
      centralPlatformSpriteHeight * platformDimensions.centre.aspectRatio
    );

    const leftPlatformSpriteHeight =
      window.innerHeight * platformDimensions.left.heightPercentage;
    const leftPlatformSpriteWidth = Math.ceil(
      leftPlatformSpriteHeight * platformDimensions.left.aspectRatio
    );

    const rightPlatformSpriteHeight =
      window.innerHeight * platformDimensions.right.heightPercentage;
    const rightPlatformSpriteWidth = Math.ceil(
      rightPlatformSpriteHeight * platformDimensions.right.aspectRatio
    );

    // ctx?.strokeRect(
    //   window.innerWidth * 0.5 -
    //     leftPlatformSpriteWidth * platformDimensions.left.xPercentage,
    //   window.innerHeight * (platformDimensions.left.yPercentage + 0.015),
    //   leftPlatformSpriteWidth,
    //   window.innerHeight * 0.02
    // );

    // ctx?.strokeRect(
    //   window.innerWidth * 0.5 -
    //     rightPlatformSpriteWidth * platformDimensions.right.xPercentage -
    //     player.current.width / 4,
    //   window.innerHeight * (platformDimensions.right.yPercentage + 0.02),
    //   rightPlatformSpriteWidth,
    //   window.innerHeight * 0.02
    // );

    // ctx?.strokeRect(
    //   window.innerWidth * 0.5 -
    //     centralPlatformSpriteWidth * platformDimensions.centre.xPercentage,
    //   window.innerHeight * (platformDimensions.centre.yPercentage + 0.153),
    //   centralPlatformSpriteWidth,
    //   window.innerHeight * 0.02
    // );

    if (player.current.y >= window.innerHeight * 1.62 - player.current.height) {
      // Standing on the ground
      isGrounded = true;
      player.current.y = window.innerHeight * 1.62 - player.current.height;
      return;
    }
    if (
      player.current.y >=
        window.innerHeight * (platformDimensions.left.yPercentage + 0.015) -
          player.current.height &&
      prevPos.current.y <=
        window.innerHeight * (platformDimensions.left.yPercentage + 0.015) -
          player.current.height &&
      player.current.x >=
        window.innerWidth * 0.5 -
          leftPlatformSpriteWidth * platformDimensions.left.xPercentage -
          player.current.width / 2 &&
      player.current.x <=
        window.innerWidth * 0.5 -
          leftPlatformSpriteWidth * platformDimensions.left.xPercentage +
          leftPlatformSpriteWidth -
          player.current.width / 4
    ) {
      // Standing on the left platform
      isGrounded = true;
      player.current.y =
        window.innerHeight * (platformDimensions.left.yPercentage + 0.015) -
        player.current.height;
      return;
    }
    if (
      player.current.y <=
        window.innerHeight * (platformDimensions.left.yPercentage + 0.035) &&
      prevPos.current.y >
        window.innerHeight * (platformDimensions.left.yPercentage + 0.035) &&
      player.current.x >=
        window.innerWidth * 0.5 -
          leftPlatformSpriteWidth * platformDimensions.left.xPercentage -
          player.current.width / 2 &&
      player.current.x <=
        window.innerWidth * 0.5 -
          leftPlatformSpriteWidth * platformDimensions.left.xPercentage +
          leftPlatformSpriteWidth -
          player.current.width / 4
    ) {
      isGrounded = false;
      velocity.current.y = 0;
      return;
    }
    if (
      player.current.y >=
        window.innerHeight * (platformDimensions.right.yPercentage + 0.02) -
          player.current.height &&
      prevPos.current.y <=
        window.innerHeight * (platformDimensions.right.yPercentage + 0.02) -
          player.current.height &&
      player.current.x >=
        window.innerWidth * 0.5 -
          rightPlatformSpriteWidth * platformDimensions.right.xPercentage -
          player.current.width / 2 &&
      player.current.x <=
        window.innerWidth * 0.5 -
          rightPlatformSpriteWidth * platformDimensions.right.xPercentage +
          rightPlatformSpriteWidth -
          player.current.width / 2
    ) {
      // Standing on the right platform
      isGrounded = true;
      player.current.y =
        window.innerHeight * (platformDimensions.right.yPercentage + 0.02) -
        player.current.height;
      return;
    }
    if (
      player.current.y <=
        window.innerHeight * (platformDimensions.right.yPercentage + 0.04) &&
      prevPos.current.y >
        window.innerHeight * (platformDimensions.right.yPercentage + 0.04) &&
      player.current.x >=
        window.innerWidth * 0.5 -
          rightPlatformSpriteWidth * platformDimensions.right.xPercentage -
          player.current.width / 2 &&
      player.current.x <=
        window.innerWidth * 0.5 -
          rightPlatformSpriteWidth * platformDimensions.right.xPercentage +
          rightPlatformSpriteWidth -
          player.current.width / 2
    ) {
      isGrounded = false;
      velocity.current.y = 0;
      return;
    }
    if (
      player.current.y >=
        window.innerHeight * (platformDimensions.centre.yPercentage + 0.153) -
          player.current.height &&
      prevPos.current.y <=
        window.innerHeight * (platformDimensions.centre.yPercentage + 0.153) -
          player.current.height &&
      player.current.x >=
        window.innerWidth * 0.5 -
          centralPlatformSpriteWidth * platformDimensions.centre.xPercentage -
          player.current.width / 2 &&
      player.current.x <=
        window.innerWidth * 0.5 -
          centralPlatformSpriteWidth * platformDimensions.centre.xPercentage +
          centralPlatformSpriteWidth
    ) {
      // Standing on the central platform
      isGrounded = true;
      player.current.y =
        window.innerHeight * (platformDimensions.centre.yPercentage + 0.153) -
        player.current.height;
      return;
    }
    if (
      player.current.y <=
        window.innerHeight * (platformDimensions.centre.yPercentage + 0.173) &&
      prevPos.current.y >
        window.innerHeight * (platformDimensions.centre.yPercentage + 0.173) &&
      player.current.x >=
        window.innerWidth * 0.5 -
          centralPlatformSpriteWidth * platformDimensions.centre.xPercentage -
          player.current.width / 2 &&
      player.current.x <=
        window.innerWidth * 0.5 -
          centralPlatformSpriteWidth * platformDimensions.centre.xPercentage +
          centralPlatformSpriteWidth
    ) {
      isGrounded = false;
      velocity.current.y = 0;

      /* ######### EASTER EGG GOES HERE ######### */

      return;
    }

    isGrounded = false;
  };

  const animate = () => {
    ctx.current?.clearRect(0, 0, window.innerWidth, window.innerHeight * 2);

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

    if (actionKeys.includes("ArrowLeft") && actionKeys.includes("ArrowRight")) {
      spriteState = "idle";
    } else if (
      actionKeys.includes("ArrowLeft") ||
      actionKeys.includes("ArrowRight")
    ) {
      spriteState = "walk";
    } else {
      spriteState = "idle";
    }

    if (actionKeys.includes("ArrowLeft") && actionKeys.includes("ArrowRight")) {
      isRightDirection =
        actionKeys.indexOf("ArrowLeft") > actionKeys.indexOf("ArrowRight")
          ? false
          : true;
    } else if (actionKeys.includes("ArrowLeft")) {
      isRightDirection = false;
    } else if (actionKeys.includes("ArrowRight")) {
      isRightDirection = true;
    }

    drawBackground(ctx.current, background.current as HTMLImageElement);
    drawGround(ctx.current, platformSprite.current as HTMLImageElement);
    drawPlatform(ctx.current, platformSprite.current as HTMLImageElement);

    const currentSpriteState =
      spriteState === "idle"
        ? SpriteDimensions[isRightDirection ? "right" : "left"][0][0]
        : SpriteDimensions[isRightDirection ? "right" : "left"][1][spriteIndex];

    player.current.y += velocity.current.y;
    collisionDetection(ctx.current);
    if (!isGrounded) {
      velocity.current.y += gravity;
    } else {
      velocity.current.y = 0;
    }
    ctx.current?.drawImage(
      ryokoSprite.current as HTMLImageElement,
      currentSpriteState.x,
      currentSpriteState.y,
      currentSpriteState.width,
      currentSpriteState.height,
      player.current.x,
      player.current.y,
      player.current.width,
      player.current.height
    );

    prevPos.current.x = player.current.x;
    prevPos.current.y = player.current.y;

    frameCount = (frameCount + 1) % 5;

    requestAnimationFrame(animate);
  };
  animate();

  useEffect(() => {
    resizeCanvas();
    // console.log(canvas.current);
    ctx.current = canvas.current?.getContext("2d");
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("keydown", (event) =>
      keyboardDownEventHandler(event)
    );
    window.addEventListener("keyup", (event) => keyboardUpEventHandler(event));

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", (event) =>
        keyboardDownEventHandler(event)
      );
      window.removeEventListener("keyup", (event) =>
        keyboardUpEventHandler(event)
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="hidden">
        <img
          src="/assets/spriteSheets/ryokoSpriteSheet.png"
          alt=""
          ref={ryokoSprite}
        />
        <img
          src="/assets/spriteSheets/background.png"
          alt=""
          ref={background}
        />
        <img
          src="/assets/spriteSheets/platformSprite2.png"
          alt=""
          ref={platformSprite}
        />
      </div>
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
    // <div className="flex flex-col justify-center items-center min-h-screen">
    //   <canvas ref={canvas} className="h-[200vh] w-full"></canvas>
    //   <div className="hidden">
    //     <img
    //       src="/assets/spriteSheets/ryokoSpriteSheet.png"
    //       alt=""
    //       ref={ryokoSprite}
    //     />
    //     <img
    //       src="/assets/spriteSheets/background.png"
    //       alt=""
    //       ref={background}
    //     />
    //     <img
    //       src="/assets/spriteSheets/platformSprite2.png"
    //       alt=""
    //       ref={platformSprite}
    //     />
    //   </div>

    //   <div className="flex w-32 justify-between bg-white py-4 fixed bottom-0">
    //     <button
    //       onTouchStart={() => {
    //         actionKeys.push("ArrowLeft");
    //         MoveLeft();
    //       }}
    //       onTouchEnd={() => {
    //         if (actionKeys.includes("ArrowLeft")) {
    //           actionKeys.splice(actionKeys.indexOf("ArrowLeft", 1));
    //         }
    //       }}
    //       onMouseDown={() => {
    //         actionKeys.push("ArrowLeft");
    //         MoveLeft();
    //       }}
    //       onMouseUp={() => {
    //         if (actionKeys.includes("ArrowLeft")) {
    //           actionKeys.splice(actionKeys.indexOf("ArrowLeft", 1));
    //         }
    //       }}
    //       className="w-full"
    //     >
    //       Left
    //     </button>
    //     <button
    //       onTouchStart={() => {
    //         actionKeys.push("ArrowRight");
    //         MoveRight();
    //       }}
    //       onTouchEnd={() => {
    //         if (actionKeys.includes("ArrowRight")) {
    //           actionKeys.splice(actionKeys.indexOf("ArrowRight", 1));
    //         }
    //       }}
    //       onMouseDown={() => {
    //         actionKeys.push("ArrowRight");
    //         MoveRight();
    //       }}
    //       onMouseUp={() => {
    //         if (actionKeys.includes("ArrowRight")) {
    //           actionKeys.splice(actionKeys.indexOf("ArrowRight", 1));
    //         }
    //       }}
    //       className="w-full"
    //     >
    //       Right
    //     </button>
    //     <button
    //       onTouchStart={() => {
    //         actionKeys.push("ArrowUp");
    //         Jump();
    //       }}
    //       onTouchEnd={() => {
    //         if (actionKeys.includes("ArrowUp")) {
    //           actionKeys.splice(actionKeys.indexOf("ArrowUp", 1));
    //         }
    //       }}
    //       onMouseDown={() => {
    //         actionKeys.push("ArrowUp");
    //         Jump();
    //       }}
    //       onMouseUp={() => {
    //         if (actionKeys.includes("ArrowUp")) {
    //           actionKeys.splice(actionKeys.indexOf("ArrowUp", 1));
    //         }
    //       }}
    //       className="w-full"
    //     >
    //       Jump
    //     </button>
    //   </div>
    // </div>
  );
};

export default ExploreGame;
