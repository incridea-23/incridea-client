import Image from 'next/image';
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Landing() {

    const landingContainer = useRef(null);
    const [pageLoader, setPageLoader] = useState<boolean>(true)

    useGSAP(() => {
        gsap.to(landingContainer.current,{ 
            scale:13, 
            translateY: 450, 
            translateX:-50,
            opacity:0,
            duration: 3,
            delay: 0.5, 
            ease: "power4.in", 
            onComplete() { setPageLoader(false) } 
        });
    }, { scope: landingContainer });

    return (
        <main className="flex min-h-screen w-full bg-gradient-to-t from-primary-600 via-primary-500 to-primary-300 overflow-hidden">
            {
                pageLoader && <section ref={landingContainer} className="relative flex min-h-screen w-full bg-black">
                    <Image src={'/assets/landing/WebUIInc24.png'} alt="UI Incridea 2024" width={1920} height={1080} className='image w-full h-full object-cover object-bottom sm:object-center absolute top-0 left-0' />
                    <Image src={'/assets/landing/Lottery.svg'} alt='Lottery' width={1920} height={1080} className='image w-full h-full object-cover object-bottom sm:object-center absolute top-0 left-0' />
                </section>
            }
        </main>
    )
}