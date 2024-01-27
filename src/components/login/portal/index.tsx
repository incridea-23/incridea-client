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

const HALF_PORTAL_HEIGHT: string = "25px";

const TOP_PORTAL_STYLE: PortalStyle = {
        height: HALF_PORTAL_HEIGHT,
        transform: "translate(-50%) rotate(0deg)",
        top: "0%",
    },
    BOTTOM_PORTAL_STYLE: PortalStyle = {
        height: HALF_PORTAL_HEIGHT,
        transform: "translate(-50%) rotate(180deg)",
        bottom: "0%",
    };

const LoginPortal: FunctionComponent<LoginPortalProps> = ({ isTop, src }) => {
    const PORTAL_STYLE: PortalStyle = isTop
        ? TOP_PORTAL_STYLE
        : BOTTOM_PORTAL_STYLE;

    return (
        <>
            <div
                className="absolute left-2/4 z-50 w-full md:w-[700px]"
                style={{ ...PORTAL_STYLE }}>
                <Image
                    fill={true}
                    src={`${src}1.png`}
                    alt={"portal"}
                    priority
                />
            </div>
            <div
                className={`absolute left-2/4 z-40 w-full md:w-[750px] ${
                    isTop ? "bg-primary-700" : "bg-primary-900"
                }`}
                style={{ ...PORTAL_STYLE }}></div>
            {isTop && (
                // FIXME: make h-20 to h-0 and remove bg-red-500 after adding logic
                <div
                    className="bg-red-500 absolute left-2/4 -translate-x-2/4 -z-40 h-0 w-[70vw] md:w-[500px]"
                    style={{ top: HALF_PORTAL_HEIGHT }}>
                    <FallingElements />
                </div>
            )}
            <div
                className="absolute left-2/4 -z-50 w-full md:w-[700px]"
                style={
                    isTop
                        ? {
                              ...PORTAL_STYLE,
                              top: HALF_PORTAL_HEIGHT,
                          }
                        : {
                              ...PORTAL_STYLE,
                              bottom: HALF_PORTAL_HEIGHT,
                          }
                }>
                <Image
                    fill={true}
                    src={`${src}2.png`}
                    alt={"portal"}
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
