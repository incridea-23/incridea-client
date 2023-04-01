import Image from "next/image";
import { FC } from "react";
import styles from "@/src/styles/Gallery.module.css"

type NoiseProps = {
    imgSrc : string
}

const Noise:FC<NoiseProps> = ({imgSrc}) => {
    return(
        <div className="flex mx-4 h-[300px] min-w-[500px] relative">
            <Image
                src={imgSrc}
                fill
                className={styles.incridea}
                loading="lazy"
                alt="incridea"
            />
            <svg width="500" height="300" viewBox="0 0 500 300">
                <filter id="turbulence-1">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.001"
                        numOctaves="2"
                        data-filterid="3"
                    />
                    <feDisplacementMap
                        xChannelSelector="R"
                        yChannelSelector="G"
                        in="SourceGraphic"
                        scale="25"
                    />
                </filter>

                <filter id="turbulence-2">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.0015"
                        numOctaves="2"
                        data-filterid="3"
                    />
                    <feDisplacementMap
                        xChannelSelector="R"
                        yChannelSelector="G"
                        in="SourceGraphic"
                        scale="25"
                    />
                </filter>

                <filter id="turbulence-3">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.002"
                        numOctaves="2"
                        data-filterid="3"
                    />
                    <feDisplacementMap
                        xChannelSelector="R"
                        yChannelSelector="G"
                        in="SourceGraphic"
                        scale="25"
                    />
                </filter>

                <filter id="turbulence-4">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.0025"
                        numOctaves="2"
                        data-filterid="3"
                    />
                    <feDisplacementMap
                        xChannelSelector="R"
                        yChannelSelector="G"
                        in="SourceGraphic"
                        scale="25"
                    />
                </filter>

                <filter id="turbulence-5">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.003"
                        numOctaves="2"
                        data-filterid="3"
                    />
                    <feDisplacementMap
                        xChannelSelector="R"
                        yChannelSelector="G"
                        in="SourceGraphic"
                        scale="25"
                    />
                </filter>
            </svg>
        </div>
    )
}

export default Noise;