import React, { FunctionComponent } from "react";
import FallingElements from "@/src/pages/fallingElements";
import Image from "next/image";

type LoginPortalProps = {
    isTop: boolean;
    src: string;
};

type PortalStyle = {
    height: string;
    transform: string;
    top?: string;
    bottom?: string;
};

const PORTAL_HEIGHT: number = 50;

const TOP_PORTAL_STYLE: PortalStyle = {
        height: `${PORTAL_HEIGHT / 2}px`,
        transform: "translate(-50%) rotate(180deg)",
        top: "0%",
    },
    BOTTOM_PORTAL_STYLE: PortalStyle = {
        height: `${PORTAL_HEIGHT / 2}px`,
        transform: "translate(-50%) rotate(0deg)",
        bottom: "0%",
    };

const LoginPortal: FunctionComponent<LoginPortalProps> = ({ isTop, src }) => {
    const PORTAL_STYLE: PortalStyle = isTop
        ? TOP_PORTAL_STYLE
        : BOTTOM_PORTAL_STYLE;

    return (
        <>
            <div
                className={`left-2/4 absolute -z-50 w-full md:w-[600px]`}
                style={
                    isTop
                        ? {
                              ...PORTAL_STYLE,
                              top: `${PORTAL_HEIGHT / 2}px`,
                          }
                        : {
                              ...PORTAL_STYLE,
                              bottom: `${PORTAL_HEIGHT / 2}px`,
                          }
                }>
                <Image
                    fill={true}
                    src={`${src}1.png`}
                    alt={"Portal"}
                    className={"pointer-events-none"}
                    priority
                />
            </div>
            {/* FIXME: give position correctly */}
            {/* <div className="bg-red-400 relative rotate-90 h-[95vw] w-6">
                {isTop && <FallingElements />}
            </div> */}
            <div
                className={`left-2/4 absolute z-50 w-full md:w-[600px]`}
                style={{ ...PORTAL_STYLE }}>
                <Image
                    fill={true}
                    src={`${src}2.png`}
                    alt={"Portal"}
                    className={"pointer-events-none"}
                    priority
                />
            </div>

            {/* FIXME: Add the same logic as the bottom code to the above thing if posiible */}
            {/* <div className="flex justify-center items-center w-full h-[50px] md:h-16 xl:h-20 mb-2">
                <div
                    className={`relative bg-gray-600 h-[95vw] w-6 sm:h-[580px] sm:w-7 md:h-[700px] md:w-9 lg:h-[940px] xl:h-[1200px] rounded-[50%] ${
                        isTop ? "rotate-90" : "-rotate-90"
                    } relative before:content-[''] after:content-[''] before:absolute after:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 after:top-0 after:right-0 after:bottom-0 after:left-0 before:rounded-[50%] after:rounded-[50%] before:border-l-[4px] before:border-solid before:border-l-[dodgerblue] bg-gradient-to-r from-blue-500 to-transparent before:z-[3] after:border-r-[4px] after:border-solid after:border-r-[dodgerblue] after:shadow-[0_0_40px_dodgerblue] after:z-0`}>
                    {isTop && <FallingElements />}
                </div>
            </div> */}
        </>
    );
};

export default LoginPortal;
