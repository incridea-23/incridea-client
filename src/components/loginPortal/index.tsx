import React from "react";

interface ILoginPortalProps {
    isTop: boolean;
}

const LoginPortal: React.FC<ILoginPortalProps> = ({
    isTop,
}: ILoginPortalProps) => {
    return (
        <div className="flex justify-center items-center w-full h-[50px] md:h-16 xl:h-20">
            {/*Portal is rotated +/- 90deg*/}
            <div
                className={`bg-gray-600 h-80 w-6 sm:h-[580px] sm:w-7 md:h-[700px] md:w-9 lg:h-[940px] xl:h-[1200px] rounded-[50%] ${
                    isTop ? "rotate-90" : "-rotate-90"
                } relative before:content-[''] after:content-[''] before:absolute after:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 after:top-0 after:right-0 after:bottom-0 after:left-0 before:rounded-[50%] after:rounded-[50%] before:border-l-[4px] before:border-solid before:border-l-[dodgerblue] bg-gradient-to-r from-blue-500 to-transparent before:z-[3] after:border-r-[4px] after:border-solid after:border-r-[dodgerblue] after:shadow-[0_0_40px_dodgerblue] after:z-0`}>
                <div className="absolute h-full w-2/4 bg-red-900 top-2/4 -translate-y-2/4 z-[2]"></div>
            </div>
        </div>
    );
};

export default LoginPortal;
