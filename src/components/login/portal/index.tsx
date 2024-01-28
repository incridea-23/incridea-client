import React, { FunctionComponent } from "react";
import FallingElements from "@/src/pages/fallingElements";
import Image from "next/image";

type LoginPortalProps = {
    isTop: boolean;
    src: string;
};

type PortalStyle = {
    height: string;
    top?: string;
    bottom?: string;
};

const LoginPortal: FunctionComponent<LoginPortalProps> = ({ isTop, src }) => {
    return (
        <>
            <div
                className={`absolute left-2/4 -translate-x-2/4 z-50 w-[110vw] md:w-[700px]`}
                style={isTop ? { top: "-25px" } : { bottom: "-15px" }}>
                <Image
                    fill={true}
                    src={`${src}1.png`}
                    alt={"portal"}
                    priority
                />
            </div>

            {/* <div
                className={`absolute left-2/4 -translate-x-2/4 z-40 w-full md:w-[750px] bg-black`}
                style={isTop ? TOP_PORTAL_STYLE : BOTTOM_PORTAL_STYLE}></div> */}

            {isTop && (
                <div className="absolute left-2/4 -translate-x-2/4 -z-40 h-0 w-[70vw] md:w-[500px]">
                    <FallingElements />
                </div>
            )}

            <div
                className={`absolute left-2/4 -translate-x-2/4 -z-50 h-[100px] w-[110vw] md:w-[700px]`}
                style={isTop ? { top: "-25px" } : { bottom: "-15px" }}>
                <Image fill={true} src={`${src}.png`} alt={"portal"} priority />
            </div>
        </>
    );
};

export default LoginPortal;
