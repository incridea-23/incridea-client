import React, { FunctionComponent } from "react";
import FallingElements from "@/src/pages/fallingElements";
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
                className={`absolute left-2/4 -translate-x-2/4 z-50 h-[110px] w-[115vw] md:w-[750px]`}
                style={isTop ? { top: "-25px" } : { bottom: "-15px" }}>
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
                className={`absolute left-2/4 -translate-x-2/4 z-40 h-[50px] w-[85vw] md:w-[490px] ${
                    isTop
                        ? "bg-[#7449d8]"
                        : "bg-gradient-to-r from-[#2c1387] to-[#8c2ef3]"
                }`}
                style={isTop ? { top: "-25px" } : { bottom: "-15px" }}></div>

            {isTop && (
                <div className="absolute left-2/4 -translate-x-2/4 -z-40 h-0 w-[65vw] md:w-[490px]">
                    <FallingElements />
                </div>
            )}

            <div
                className={`absolute left-2/4 -translate-x-2/4 -z-50 h-[110px] w-[115vw] md:w-[750px]`}
                style={isTop ? { top: "-25px" } : { bottom: "-15px" }}>
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
