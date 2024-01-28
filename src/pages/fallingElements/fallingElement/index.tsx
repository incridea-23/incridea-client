import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";

type srcProps = {
    src: string;
    size: { width: number; height: number };
};

const getPosition: () => number = () => {
    /* used to generate the point from where the element should fall */
    /* in a range of 0% to 100% of portal width */
    return Math.floor(Math.random() * (90 - 10)) + 10;
};

const FallingElement: React.FC<srcProps> = ({ src, size }: srcProps) => {
    const [localSrc, setLocalSrc] = useState(src);
    const [left, setLeft] = useState<number | null>(null);

    useEffect(() => {
        setLeft(getPosition());
    }, []);
    useEffect(()=>{
        localSrc==="explodeGif.gif" ? setTimeout(()=>{setLocalSrc("")},1000): null;
    },[localSrc])
    return (
        <>
            <div
                onClick={() => { localSrc === "bomb.png" ? setLocalSrc("explodeGif.gif") : null }}
                className={`absolute bottom-0 animate-free-fall`}
                style={{
                    left: `${left}%`,
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                }}>
                 {localSrc != "" ? <Image
                    src={`/assets/png/${localSrc}`}
                    alt={""}
                    width={size.width}
                    height={size.height}
                />: null}   
                


            </div>
            
        </>
    );
};

export default FallingElement;
