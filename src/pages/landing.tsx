import Image from 'next/image';
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from '../components/button';
import Link from 'next/link';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import Head from 'next/head';

export default function Landing() {

    const landingContainer = useRef(null);
    const [pageLoader, setPageLoader] = useState<boolean>(true)

    const navItems = [
        { href:'/events', target:'Events' },
        { href:'/pronite', target:'Pronite' },
        { href:'/gallery', target:'Gallery' },
        { href:'/contact-us', target:'Contact Us' },
    ] 

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
        <>
        <Head>
            <title>Incridea - Dice of Destiny</title>
        </Head>
        <main className="flex relative min-h-screen w-full bg-gradient-to-t from-primary-900 via-primary-800 to-primary-600 overflow-hidden ">
            {
                pageLoader && <section ref={landingContainer} className="flex min-h-screen w-full bg-black z-[999] absolute top-0 left-0">
                    <Image src={'/assets/landing/WebUIInc24.png'} alt="UI Incridea 2024" width={1920} height={1080} className='image w-full h-full object-cover object-center absolute top-0 left-0' />
                    <Image src={'/assets/landing/Lottery.svg'} alt='Lottery' width={1920} height={1080} className='image w-full h-full object-cover object-center absolute top-0 left-0' />
                    {/* <video src='/assets/landing/tv-static.mp4' className='absolute top-[38%] left-[44%] w-40 h-auto mix-blend-screen' autoPlay loop muted></video> */}
                </section>
            }

            <div className='flex flex-col items-center justify-center w-full h-fit mt-20 sm:mt-40 text-white font-VikingHell'>
                <h1 className='text-5xl sm:text-6xl'>Incridea</h1>
                <h2 className='text-3xl sm:text-4xl gap-x-6 sm:gap-x-8 flex'>
                    <span>Dice</span><span>of</span><span>Destiny</span>
                </h2>
            </div>

            <div className='flex justify-center absolute bottom-20 xl:bottom-28 left-1/2 -translate-x-1/2'>
                <Button intent={'primary'} className='h-fit m-8 px-4 sm:px-12' size={'xlarge'}>Register</Button>
                <Button intent={'ghost'} className='h-fit m-8 px-4 sm:px-12' size={'xlarge'}>Explore</Button>                    
            </div>
            
            <div className='flex flex-col w-fit h-fit absolute bottom-48 xl:bottom-32 -right-8'>
                <h3 className='text-2xl sm:text-4xl text-white font-VikingHell text-center mb-0 sm:mb-4'>Menu</h3>
                {
                    navItems.map((e,i)=>(
                        <Link key={i} href={e.href}>
                            <Button className='my-4 w-60 sm:w-80 justify-end px-16' size={'xlarge'}>{e.target}</Button>
                        </Link>
                    ))
                }
            </div>
            
            <footer className='absolute w-full text-gray-200 bottom-0'>
                    <p className="text-center p-5 text-sm">
                        <Link className="flex justify-center items-center tracking-normal transition-all hover:tracking-widest hover:text-gray-300" href="/team">
                            Made with <BsFillSuitHeartFill className="mx-2" /> by Technical Team
                        </Link>
                        © Incridea 2023
                    </p>
            </footer>

        </main>
        </>
    )
}