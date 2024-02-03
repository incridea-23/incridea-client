import React, { useState } from "react";

const ToolTip = ({
  text,
  classValue,
}: {
  text: string;
  classValue: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    if (!isVisible && !isClicked) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (isVisible && !isClicked) {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    setIsVisible(false);
  };

  return (
    <div
      className="absolute w-full h-full group top-0 z-[50] tracking-wide font-VikingHell flex justify-center items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <p
        className={`${
          isVisible ? "visible" : "invisible"
        } md:w-[130px] w-[60px] py-2 px-4 text-white rounded-md z-50 absolute ${classValue}`}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default ToolTip;
