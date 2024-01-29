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
    return Math.floor(Math.random() * (60-40)) + 40;
};

const FallingElement: React.FC<srcProps> = ({ src, size }: srcProps) => {
    const [localSrc, setLocalSrc] = useState(src);
    const [left, setLeft] = useState<number>(0);

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
                className={`absolute bottom-0 animate-free-fall ${localSrc === "bomb.png" ? "z-[900]": "z-50"}`}
                style={{
                    
                    left: `${localSrc !== "explodeGif.gif" ? left : left-15}%`,
                    width: `${localSrc !== "explodeGif.gif" ? size.width : 170}px`,
                    height: `${localSrc !== "explodeGif.gif" ? size.height : 170}px`,
                }}>
                 {localSrc != "" ? <Image 
                    src={`/assets/png/${localSrc}`}
                    alt={""}
                    /* fill={true} */
                    width={localSrc !== "explodeGif.gif" ? size.width : 170}
                    height={localSrc !== "explodeGif.gif" ? size.height :170}
                />: null}   
                


            </div>
            
        </>
    );
};

export default FallingElement;
