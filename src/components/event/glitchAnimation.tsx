import React, { useRef } from "react";

const GlitchAnimation =({
  title,
  fontSize,
  mainHeading
} :{
  title:string | number
  fontSize:number
  mainHeading:boolean
}) => {
  const loading_screen = useRef<HTMLDivElement | null>(null);
  const logo_1 = useRef<HTMLDivElement | null>(null);
  const logo_2 = useRef<HTMLDivElement | null>(null);
  const logo_3 = useRef<HTMLDivElement | null>(null);
  const logo_4 = useRef<HTMLDivElement | null>(null);
  const logo_5 = useRef<HTMLDivElement | null>(null);
  const logo_6 = useRef<HTMLDivElement | null>(null);

  const titleClass = "flex items-center justify-center"; 
  let anim1 = `text-[${fontSize+0.10}rem] md:text-[${fontSize+0.10}rem] w-full`;
  let anim2 = `text-[${fontSize+0.05}rem] md:text-[${fontSize+0.05}rem] w-full`;
  let anim3 = `text-[${fontSize}rem] md:text-[${fontSize}rem] w-full`;
  if(mainHeading){
    anim1 = `text-[1.33rem] md:text-[1.33rem] w-full`;
    anim2 = `text-[1.29rem] md:text-[1.29rem] w-full`;
    anim3 = `text-[1.25rem] md:text-[1.25rem] w-full`;
  }
  return (
    <div className="text-[#e7e7e7] vikingHell">
      <div
        ref={(el) => (loading_screen.current = el)}
        className={`relative z-50 w-full text-center flex justify-center items-center`}
      >
        <div>
            <div className="flex items-center justify-center invisible">
                <div
                ref={(el) => (logo_1.current = el)}
                className={`font-semibold text-[#e7e7e7] ${anim1} mix-blend-difference leading-none`}
                >
                {title}
                </div>
            </div>
            <div className={titleClass}>
                <div
                ref={(el) => (logo_1.current = el)}
                className={`absolute font-semibold text-[#e7e7e7] ${anim1} mix-blend-difference leading-none`}
                >
                {title}
                </div>
            </div>
            <div className={titleClass}>
                <div
                ref={(el) => (logo_2.current = el)}
                className={`absolute font-semibold text-[#01ff01] ${anim1} mix-blend-difference leading-none`}
                >
                {title}
                </div>
            </div>
            <div className={titleClass}>
                <div
                ref={(el) => (logo_3.current = el)}
                className={`absolute font-semibold text-[#fc1f1f] ${anim2} mix-blend-difference leading-none`}
                >
                {title}
                </div>
            </div>
            <div className={titleClass}>
                <div
                ref={(el) => (logo_4.current = el)}
                className={`absolute font-semibold text-[#8cf7f7] ${anim2} mix-blend-difference leading-none`}
                >
                {title}
                </div>
            </div>
            <div className={titleClass}>
                <div
                ref={(el) => (logo_5.current = el)}
                className={`absolute font-semibold text-[#4254f8] ${anim3} mix-blend-difference leading-none`}
                >
                {title}
                </div>
            </div>
            <div className={titleClass}>
                <div
                ref={(el) => (logo_6.current = el)}
                className={`absolute font-semibold text-[#ac00ac] ${anim3} mix-blend-difference leading-none`}
                >
                {title}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default GlitchAnimation;