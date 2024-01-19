import React from "react";

interface ILPProps {
    isTop: boolean;
}

const LoginPortal: React.FC<ILPProps> = ({ isTop }: ILPProps) => {
    return (
        <div className="flex justify-center items-center w-full h-[58px]">
            {/*Portal is rotated +/- 90deg*/}
            <div
                className={`bg-gray-600 h-80 w-5 rounded-[50%] ${
                    isTop ? "rotate-90" : "-rotate-90"
                } relative before:content-[''] after:content-[''] before:absolute after:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 after:top-0 after:right-0 after:bottom-0 after:left-0 before:rounded-[50%] after:rounded-[50%] before:border-l-[4px] before:border-solid before:border-l-[dodgerblue] bg-gradient-to-r from-blue-500 to-transparent before:z-[3] after:border-r-[4px] after:border-solid after:border-r-[dodgerblue] after:shadow-[0_0_40px_dodgerblue] after:z-0`}></div>
        </div>
    );
};

export default LoginPortal;
