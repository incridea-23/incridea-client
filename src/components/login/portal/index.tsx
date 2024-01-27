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
                <div className="bg-red-500 absolute left-2/4 -translate-x-2/4 -z-40 h-0 w-[70vw] md:w-[500px]">
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
        </>
    );
};

export default LoginPortal;
