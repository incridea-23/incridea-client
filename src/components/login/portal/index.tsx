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
                className={`absolute left-2/4 -translate-x-2/4 z-50 h-[100px] w-[115vw] md:w-[750px]`}
                style={isTop ? { top: "-25px" } : { bottom: "-15px" }}>
                <Image
                    fill={true}
                    src={
                        isTop
                            ? "/assets/png/portalv71.png"
                            : "/assets/png/portalv72.png"
                    }
                    alt={"portal"}
                    priority
                />
            </div>

            {/* <div
                className={`absolute left-2/4 -translate-x-2/4 z-40 h-20 w-full md:w-[750px] bg-black`}
                style={isTop ? { top: "-25px" } : { bottom: "-15px" }}></div> */}

            {isTop && (
                <div className="absolute left-2/4 -translate-x-2/4 -z-40 h-1 bg-red-500 w-[65vw] md:w-[400px]">
                    <FallingElements />
                </div>
            )}

            <div
                className={`absolute left-2/4 -translate-x-2/4 -z-50 h-[100px] w-[115vw] md:w-[750px]`}
                style={isTop ? { top: "-25px" } : { bottom: "-15px" }}>
                <Image
                    fill={true}
                    src={"/assets/png/portalv7.png"}
                    alt={"portal"}
                    priority
                />
            </div>
        </>
    );
};

export default LoginPortal;
