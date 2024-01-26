import React from "react";
import Image from "next/image";

type srcProps = {
    src: string;
    size: { width: number; height: number };
};
const getPosition = () => {
    /* used to generate the point from where the element should fall */
    /* in a range of 0% to 100% of portal width */
    return { position: Math.floor(Math.random() * (90 - 10 + 1)) + 10 };
};

const FallingElement: React.FC<srcProps> = ({ src, size }: srcProps) => {
    return (
        <>
            <div
                className={`absolute animate-[fall_10s_linear_forwards]`}
                style={{
                    top: `${getPosition().position}%`,
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                }}>
                <Image
                    src={`/assets/png/${src}`}
                    alt={src}
                    width={size.width}
                    height={size.height}
                />
            </div>
        </>
    );
};

export default FallingElement;
