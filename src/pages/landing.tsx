import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from '../components/button';
import Link from 'next/link';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import Parallax from 'parallax-js';


export default function Landing() {

    const landingContainer = useRef(null);
    const Logo = useRef(null)
    const [pageLoader, setPageLoader] = useState<boolean>(true)

    useGSAP(() => {
        gsap.to(landingContainer.current, {
            scale: 13,
            translateY: 500,
            translateX: 150,
            duration: 2.5,
            delay: 0.5,
            ease: "power4.in",
            onComplete() { gsap.to(landingContainer.current, { opacity: 0, duration: 1 }); setTimeout(() => { setPageLoader(false) }, 1000); gsap.from(Logo.current,{ delay:0.2, duration:2, scale:2, opacity:0.6 }) }
        });
    }, { scope: landingContainer });

    return (
        <main className="flex relative min-h-screen w-full overflow-hidden justify-center">
            {
                pageLoader && <section ref={landingContainer} className="flex min-h-screen w-full bg-black z-[999] absolute top-0 left-0">
                    <Image src={'/assets/landing/landing@2x.png'} alt="UI Incridea 2024" width={1920*2} height={1080*2} className='image w-full h-full object-cover object-center absolute top-0 left-0' />
                </section>
            }
            <div ref={Logo} className='flex w-[320px] md:w-[480px] lg:w-[640px] h-fit z-50 mt-16 md:mt-28'>
                <Image src={'/assets/home/DoD.png'} width={640} height={640} alt='Dice of Destiny' className='object-center object-contain' />
            </div>
            <HomeUi />
            <Menu />
            <HomeFooter />
        </main>
    )
}

const HomeFooter = () => {
    return (
        <footer className='absolute w-full text-gray-200 bottom-0'>
            <p className="text-center p-5 text-sm">
                <Link className="flex justify-center items-center tracking-normal transition-all hover:tracking-widest hover:text-gray-300" href="/team">
                    Made with <BsFillSuitHeartFill className="mx-2" /> by Technical Team
                </Link>
                © Incridea 2023
            </p>
        </footer>
    )
}

const Menu = () => {

    const navItems = [
        { href: '/events', target: 'Events' },
        { href: '/pronite', target: 'Pronite' },
        { href: '/gallery', target: 'Gallery' },
        { href: '/contact-us', target: 'Contact Us' },
    ]

    return (
        <div className='flex flex-col absolute bottom-0 left-0 w-full h-full justify-center items-center'>
            <div className='flex justify-center static sm:absolute bottom-28 left-1/2 sm:-translate-x-1/2'>
                <Button intent={'primary'} className='h-fit m-8 px-4 sm:px-12' size={'xlarge'}>Register</Button>
                <Button intent={'ghost'} className='h-fit m-8 px-4 sm:px-12' size={'xlarge'}>Explore</Button>
            </div>
            <div className='flex flex-col w-fit h-fit static md:absolute bottom-48 xl:bottom-32 -right-8'>
                <h3 className='text-2xl sm:text-4xl hidden sm:block text-white font-VikingHell text-center mb-0 sm:mb-4'>Menu</h3>
                {
                    navItems.map((e, i) => (
                        <Link key={i} href={e.href}>
                            <Button className='my-2 md:my-4 w-52 md:w-80 justify-center md:justify-end px-12 md:px-16' size={'xlarge'}>{e.target}</Button>
                        </Link>
                    ))
                }
            </div>
            
        </div>
    )
}

const HomeUi = () => {

    useLayoutEffect(()=>{
        const scene = document.getElementById("scene") as HTMLElement

        let parallaxInstance = new Parallax(scene,{relativeInput: true});
    })

    return (
        <section id="scene" className='absolute w-full h-screen'>

            <Image src={'/assets/home/bg.png'} alt='Gradient' width={1920} height={1080} className='w-full h-full object-center object-cover absolute bottom-0 left-0' />
            <Image data-depth="0.5" src={'/assets/home/moon.png'} alt='Gradient' width={1920} height={1080} className='w-full h-full object-center object-cover opacity-60 absolute bottom-0 left-0' />
            <Image data-depth="0.4" src={'/assets/home/stars.png'} alt='Gradient' width={1920} height={1080} className='w-full h-full object-center object-cover absolute bottom-0 left-0' />
            <div data-depth="0.3" className="flex w-full h-screen abolute bottom-0 right-0 justify-end">
                <Image src={'/assets/home/portal.png'} alt='Portal' width={1920} height={1080} className="scale-110 object-bottom" />
            </div>
            <div data-depth="0.2" className="flex w-full h-screen abolute bottom-0 left-0 justify-end">
                <Image  src={'/assets/home/ryoko.png'} id="Ryoko" alt='Ryoko looking at portal' width={1920} height={1080} className="object-bottom" />
            </div>
        </section>
    )
}