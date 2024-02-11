/* eslint-disable @next/next/no-img-element */
import styles from "@/src/components/explore/audioPlayer.module.css";
import { AddXpDocument, GetUserXpDocument } from "@/src/generated/generated";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiFillSound, AiOutlineSound } from "react-icons/ai";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";
import Typewriter from "typewriter-effect";
import Button from "../button";
import AudioPlayer from "../explore/AudioPlayer";
import ExploreNav from "../explore/exploreNav";
import {
  SpriteDimensions,
  platformDimensions,
  platformSpriteDimensions,
} from "./gameConstants";
import { baseImageUrl, baseAudioUrl } from "@/src/utils/url";

const fps: number = 60;
const actionKeys: string[] = [];

const ExploreGame = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showRuleBook, setShowRuleBook] = useState(false);
  const router = useRouter();
  const [showSchedule, setShowSchedule] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  let calledXp = false;
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);
  const lastExecutionTimeRef = useRef<number>(0);
  let audioElement: "ground" | "middle" | "left" | "right" | "jump" = "middle";
  const [isMuted, setIsMuted] = useState(true);
  const isMutedRef = useRef(isMuted);
  const mainThemeAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  function movementSoundTrigger(path: string, delay: number) {
    if (isMutedRef.current) {
      return;
    }
    const isJump = path === `${baseAudioUrl}/audio/jump.mp3` ? true : false;
    if (isJump && audioElement === "jump") {
      return;
    }
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastExecutionTimeRef.current;

    if (elapsedTime >= delay) {
      const audio = new Audio(path);
      audio.play();

      lastExecutionTimeRef.current = currentTime;
    }
  }

  const [addXp] = useMutation(AddXpDocument, {
    variables: {
      levelId: "1",
    },
    refetchQueries: ["GetUserXp"],
    awaitRefetchQueries: true,
  });

  const handleAddXp = () => {
    if (calledXp) return;
    calledXp = true;
    const promise = addXp().then((res) => {
      if (res.data?.addXP.__typename === "MutationAddXPSuccess") {
        toast.success(
          `Congratulations!!! You have found ${res.data?.addXP.data.level.point} Xp`,
          {
            position: "bottom-center",
            style: {
              backgroundColor: "#7628D0",
              color: "white",
            },
          }
        );
      }
    });
  };

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
  const boundary = { left: 0, right: window.innerWidth };
  const ryokoSprite = useRef<HTMLImageElement | null>(null);
  const background = useRef<HTMLImageElement | null>(null);
  const platformSprite = useRef<HTMLImageElement | null>(null);

  let isRightDirection = true;
  let spriteState: "idle" | "walk" = "idle";
  let isGrounded: boolean;
  let spriteIndex: number = 0;
  let frameCount: number = 0;
  const gravity: number = 0.15;
  let showAboutFlag = true;
  let showRuleBookFlag = true;
  let showScheduleFlag = true;

  const [rightPlatformY, setRightPlatformY] = useState<number>(0);
  const [leftPlatformY, setLeftPlatformY] = useState<number>(0);
  const [rightPlatformX, setRightPlatformX] = useState<number>(0);
  const [leftPlatformX, setLeftPlatformX] = useState<number>(0);
  const [rightPlatformHeight, setRightPlatformHeight] = useState<number>(0);
  const [rightPlatformWidth, setRightPlatformWidth] = useState<number>(0);
  const [leftPlatformHeight, setLeftPlatformHeight] = useState<number>(0);
  const [leftPlatformWidth, setLeftPlatformWidth] = useState<number>(0);

  const resizeCanvas = () => {
    if (canvas.current) {
      player.current.x =
        (player.current.x * window.innerWidth) / WINDOW_DIMENSION.width;
      player.current.y =
        (player.current.y * window.innerHeight) / WINDOW_DIMENSION.height;
      canvas.current.width = WINDOW_DIMENSION.width = window.innerWidth;
      WINDOW_DIMENSION.height = window.innerHeight;
      canvas.current.height = window.innerHeight * 2;
      boundary.right = window.innerWidth;

      const leftPlatformSpriteHeight =
        window.innerHeight * platformDimensions.left.heightPercentage;
      const leftPlatformSpriteWidth = Math.ceil(
        leftPlatformSpriteHeight * platformDimensions.left.aspectRatio
      );

      setLeftPlatformX(
        window.innerWidth * 0.5 -
          leftPlatformSpriteWidth * platformDimensions.left.xPercentage
      );

      setLeftPlatformY(
        window.innerHeight * platformDimensions.left.yPercentage
      );

      setLeftPlatformHeight(leftPlatformSpriteHeight);
      setLeftPlatformWidth(leftPlatformSpriteWidth);

      const rightPlatformSpriteHeight =
        window.innerHeight * platformDimensions.right.heightPercentage;
      const rightPlatformSpriteWidth = Math.ceil(
        leftPlatformSpriteHeight * platformDimensions.right.aspectRatio
      );

      setRightPlatformX(
        window.innerWidth * 0.5 -
          rightPlatformSpriteWidth * platformDimensions.right.xPercentage
      );

      setRightPlatformY(
        window.innerHeight * platformDimensions.right.yPercentage
      );

      setRightPlatformHeight(rightPlatformSpriteHeight);
      setRightPlatformWidth(rightPlatformSpriteWidth);
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
    movementSoundTrigger(`${baseAudioUrl}/audio/XMovement.mp3`, 300);
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
    movementSoundTrigger(`${baseAudioUrl}/audio/XMovement.mp3`, 300);
  }

  function Jump() {
    movementSoundTrigger(`${baseAudioUrl}/audio/jump.mp3`, 250);
    audioElement = "jump";
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
        ctx?.drawImage(background, i * imgWidth, 0, imgWidth, imgHeight);
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

      setLeftPlatformX(
        window.innerWidth * 0.5 -
          leftPlatformSpriteWidth * platformDimensions.left.xPercentage
      );

      setLeftPlatformY(
        window.innerHeight * platformDimensions.left.yPercentage
      );

      setLeftPlatformHeight(leftPlatformSpriteHeight);
      setLeftPlatformWidth(leftPlatformSpriteWidth);

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

      setRightPlatformX(
        window.innerWidth * 0.5 -
          rightPlatformSpriteWidth * platformDimensions.right.xPercentage
      );

      setRightPlatformY(
        window.innerHeight * platformDimensions.right.yPercentage
      );

      setRightPlatformHeight(rightPlatformSpriteHeight);
      setRightPlatformWidth(rightPlatformSpriteWidth);

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
      if (audioElement !== "ground") {
        audioElement = "ground";
        movementSoundTrigger(`${baseAudioUrl}/audio/thud.mp3`, 300);
      }
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
      if (audioElement !== "left") {
        audioElement = "left";
        movementSoundTrigger(`${baseAudioUrl}/audio/thump.mp3`, 300);
      }

      if (showScheduleFlag) {
        setShowSchedule(true);
        showScheduleFlag = false;
      }
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
      if (audioElement !== "right") {
        audioElement = "right";
        movementSoundTrigger(`${baseAudioUrl}/audio/thump.mp3`, 300);
      }
      isGrounded = true;
      if (showRuleBookFlag) {
        setShowRuleBook(true);
        showRuleBookFlag = false;
      }
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
      if (audioElement !== "middle") {
        audioElement = "middle";
        movementSoundTrigger(`${baseAudioUrl}/audio/thump.mp3`, 300);
      }
      isGrounded = true;
      if (showAboutFlag) {
        setShowAbout(true);
        showAboutFlag = false;
      }
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
      movementSoundTrigger(`${baseAudioUrl}/audio/thud.mp3`, 300);
      handleAddXp();
      //replace with xp sound
      return;
    }

    isGrounded = false;
    setShowAbout(false);
    setShowRuleBook(false);
    setShowSchedule(false);
    showRuleBookFlag = true;
    showAboutFlag = true;
    showScheduleFlag = true;
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

    if (player.current.x > boundary.right) {
      router.push("/explore/level2");
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

    if (ctx) {
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
    }

    prevPos.current.x = player.current.x;
    prevPos.current.y = player.current.y;

    frameCount = (frameCount + 1) % 5;

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    resizeCanvas();
    ctx.current = canvas.current?.getContext("2d");
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("keydown", (event) =>
      keyboardDownEventHandler(event)
    );
    window.addEventListener("keyup", (event) => keyboardUpEventHandler(event));
    // window.addEventListener("scroll", () => {
    //   setScrollY(window.scrollY);
    // });
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", (event) =>
        keyboardDownEventHandler(event)
      );
      window.removeEventListener("keyup", (event) =>
        keyboardUpEventHandler(event)
      );
      // window.removeEventListener("scroll", () => {
      //   setScrollY(window.scrollY);
      // });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  return (
    <>
      <ExploreNav />
      <AudioPlayer
        mainThemeAudioRef={mainThemeAudioRef}
        mainTheme={`${baseAudioUrl}/audio/Level1MainTheme.mp3`}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      ></AudioPlayer>
      <div className="h-[200vh] relative w-full overflow-clip">
        <div className="hidden">
          <img
            src={`${baseImageUrl}/assets/spriteSheets/ryokoSpriteSheet.png`}
            alt=""
            ref={ryokoSprite}
          />
          <img
            src={`${baseImageUrl}/assets/spriteSheets/background.png`}
            alt=""
            ref={background}
          />
          <img
            src={`${baseImageUrl}/assets/spriteSheets/platformSprite2.png`}
            alt=""
            ref={platformSprite}
          />
        </div>
        <div className="flex w-full justify-center items-center">
          <div
            className="absolute bg-[#d64d00] z-50 h-max w-max top-[20%] text-[#fec3b5] font-PressStart text-center sm:p-12 border-l-4 border-t-4 border-white p-4 rounded-lg"
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
        </div>

        <a
          href={""}
          style={{
            position: "absolute",
            top: `${leftPlatformY}px`,
            left: `${leftPlatformX}px`,
            height: `${leftPlatformHeight}px`,
            width: `${leftPlatformWidth}px`,
          }}
          download
          className="bg-transparent"
        ></a>
        <a
          style={{
            position: "absolute",
            top: `${rightPlatformY}px`,
            left: `${rightPlatformX}px`,
            height: `${rightPlatformHeight}px`,
            width: `${rightPlatformWidth}px`,
          }}
          href={
            "https://drive.google.com/file/d/1H43LJXI4E-HELku71b9NLOBRoDpmxuHk/view?usp=drive_link"
          }
          download
          className="bg-transparent"
        ></a>

        <div
          style={{
            opacity: scrollY > 400 && showAbout ? 1 : 0,
            pointerEvents: scrollY > 400 && showAbout ? "all" : "none",
            transition: "opacity 0.5s ease-in-out",
          }}
          className="absolute z-50  h-[20rem] md:h-[24rem] sm:h-[20rem] sm:w-[32rem] sm:text-xs sm:top-[35%]  md:w-[36rem] md:text-sm w-[22rem] text-[0.6rem]  top-[30%] mx-4 text-opacity-80  bg-[#86d6e9]/30 p-6 xl:top-[45%] xl:left-6 xl:max-w-xl xl:text-base xl:h-[28rem]  text-white font-PressStart justify-evenly text-justify space-y-4 rounded-lg transition-all duration-300 ease-in-out"
        >
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .changeDelay(30)
                .typeString(
                  "Incridea, the national level techno-cultural fest of NMAM Institute of Technology, Nitte, is a vibrant celebration of technical, literary, and cultural activities, spanning over three days and 40+ events to find new horizons.<br/><br/> Now it's time to make your move, as you enter the game world of board and pixels, where you will be met with labyrinths of games and wonders. Roll the Dice, your Destiny Awaits!"
                )

                .start();
            }}
          />

          <span className="absolute bottom-1 right-2 text-xs font-mono">
            Try controlling Ryoko
          </span>
        </div>

        <div
          style={{
            opacity: (scrollY > 400 && showRuleBook) || showSchedule ? 1 : 0,
            pointerEvents:
              (scrollY > 400 && showRuleBook) || showSchedule ? "all" : "none",
            transition: "opacity 0.5s ease-in-out",
          }}
          className="absolute z-50 h-max sm:max-w-lg sm:text-xs sm:top-[35%] md:max-w-xl md:text-sm max-w-md text-xs top-[30%] mx-4 text-opacity-80  bg-[#86d6e9]/30 p-6 xl:top-[45%] xl:left-6 left-12 xl:max-w-xl xl:text-base  text-white font-PressStart justify-evenly text-justify space-y-4 rounded-lg transition-all duration-300 ease-in-out"
        >
          {/* <p>Jello</p> */}
          <div className="flex w-full justify-center">
            <Image
              src={
                showRuleBook
                  ? `${baseImageUrl}/assets/png/ruleBook.png`
                  : `${baseImageUrl}/assets/png/rulebook.png`
              }
              alt="RuleBook"
              width={500}
              height={500}
              className="w-[10rem] h-[15rem] sm:w-[12rem] sm:h-[18rem] md:w-[14rem] md:h-[21rem] xl:w-[20rem] xl:h-[30rem]"
            />
          </div>
          <a
            href={
              showRuleBook
                ? "https://drive.google.com/file/d/1H43LJXI4E-HELku71b9NLOBRoDpmxuHk/view?usp=drive_link"
                : ""
            }
            className="flex w-full justify-center py-4 bg-orange-500 rounded-xl"
            download
          >
            <button className="px-4">
              Download {showRuleBook ? "Rule Book" : "Schedule"}
            </button>
          </a>
        </div>

        <div className="absolute sm:top-[57%] top-[75%] sm:right-12 right-2 z-50 text-white font-bold animate-pulse pointer-events-none">
          <MdArrowRightAlt
            size={80}
            className="text-white justify-center w-full flex"
          />
          <span>Move to Level 2</span>
        </div>
        <canvas ref={canvas} className="h-[200vh] w-full absolute"></canvas>

        <div
          className="sticky h-screen top-0 justify-end items-end flex w-full "
          style={{
            opacity: scrollY > window.innerHeight * 0.5 ? 0.5 : 0,
            pointerEvents: scrollY > window.innerHeight * 0.5 ? "all" : "none",
            transition: "opacity 0.5s ease-in-out z-10",
          }}
        >
          <svg
            width="205"
            height="150"
            viewBox="0 0 1222 888"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none mb-8 mr-8"
          >
            <g
              id="Right"
              onTouchStart={() => {
                if (!actionKeys.includes("ArrowRight"))
                  actionKeys.push("ArrowRight");
              }}
              onTouchEnd={() => {
                if (actionKeys.includes("ArrowRight")) {
                  actionKeys.splice(actionKeys.indexOf("ArrowRight"), 1);
                }
              }}
              onMouseDown={() => {
                if (!actionKeys.includes("ArrowRight"))
                  actionKeys.push("ArrowRight");
              }}
              onMouseUp={() => {
                if (actionKeys.includes("ArrowRight")) {
                  actionKeys.splice(actionKeys.indexOf("ArrowRight"), 1);
                }
              }}
              className="pointer-events-auto select-none z-10"
            >
              <g id="Rectangle 6" filter="url(#filter0_b_95_21)">
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
                if (!actionKeys.includes("ArrowUp")) actionKeys.push("ArrowUp");
              }}
              onTouchEnd={() => {
                if (actionKeys.includes("ArrowUp")) {
                  actionKeys.splice(actionKeys.indexOf("ArrowUp"), 1);
                }
              }}
              onMouseDown={() => {
                if (!actionKeys.includes("ArrowUp")) actionKeys.push("ArrowUp");
              }}
              onMouseUp={() => {
                if (actionKeys.includes("ArrowUp")) {
                  actionKeys.splice(actionKeys.indexOf("ArrowUp"), 1);
                }
              }}
              className="pointer-events-auto select-none z-10"
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
                if (!actionKeys.includes("ArrowLeft"))
                  actionKeys.push("ArrowLeft");
              }}
              onTouchEnd={() => {
                if (actionKeys.includes("ArrowLeft")) {
                  actionKeys.splice(actionKeys.indexOf("ArrowLeft"), 1);
                }
              }}
              onMouseDown={() => {
                if (!actionKeys.includes("ArrowLeft"))
                  actionKeys.push("ArrowLeft");
              }}
              onMouseUp={() => {
                if (actionKeys.includes("ArrowLeft")) {
                  actionKeys.splice(actionKeys.indexOf("ArrowLeft"), 1);
                }
              }}
              className="pointer-events-auto select-none z-10"
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
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
    </>
  );
};

export default ExploreGame;
