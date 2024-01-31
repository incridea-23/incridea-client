import React, { FunctionComponent } from "react";
import FallingElements from "../fallingElements";
import Image from "next/image";

type LoginPortalProps = {
  isTop: boolean;
};

type PortalStyle = {
  height: string;
  top?: string;
  bottom?: string;
};

const LoginPortal: FunctionComponent<LoginPortalProps> = ({ isTop }) => {
  return (
    <>
      <div
        className={`absolute pointer-events-none left-2/4 ${
          isTop ? "-top-[25px]" : "-bottom-[20px]"
        } -translate-x-2/4 z-50 h-[110px] w-[115vw] md:w-[750px]`}>
        <Image
          fill={true}
          src={
            isTop
              ? "/assets/png/loginPortalT.png"
              : "/assets/png/loginPortalB.png"
          }
          alt={"portal"}
          className="pointer-events-none"
          priority
        />
      </div>

      <div
        className={`absolute left-2/4 ${
          isTop ? "-top-[25px]" : "-bottom-[20px]"
        } -translate-x-2/4 z-40 h-[50px] w-[75vw] md:w-[450px] backdrop-blur-[100px] pointer-events-none`}></div>

      {isTop && (
        <>
          <div className="absolute left-2/4 -translate-x-2/4 -z-40 h-0 w-[65vw] md:w-[440px]">
            <FallingElements isBomb={false} />
          </div>
          <div className="absolute left-2/4 -translate-x-2/4 z-30 h-0 w-[65vw] md:w-[440px]">
            <FallingElements isBomb={true} />
          </div>
        </>
      )}

      <div
        className={`absolute pointer-events-none left-2/4 ${
          isTop ? "-top-[25px]" : "-bottom-[20px]"
        } -translate-x-2/4 -z-50 h-[110px] w-[115vw] md:w-[750px]`}>
        <Image
          fill={true}
          src={
            !isTop
              ? "/assets/png/loginPortalT.png"
              : "/assets/png/loginPortalB.png"
          }
          alt={"portal"}
          className="pointer-events-none"
          priority
        />
      </div>
    </>
  );
};

export default LoginPortal;
