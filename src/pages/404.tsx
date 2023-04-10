import { NextPage } from 'next';
import diver from "@/public/assets/svg/driver_lost.svg";
import Image from "next/image";
import { titleFont } from "@/src/utils/fonts";
import Button from '../components/button';
import Link from 'next/link';

const Page404: NextPage = () => {

    const titleText : string = "Lost at sea...of 404";
    const bodyText : string = "Let's steer you back to smoother waters.";

  return (
    <div className="flex flex-col justify-center items-center">
        <div className="flex z-10 justify-center items-center h-[65vh] mt-8">
            <Image src={ diver } alt="404" width={400} height={400} />
        </div>
        <div className='flex flex-col justify-center items-center mb-10'>
            <h1 className={`${titleFont.className} text-xl text-white transition-colors duration-300 flex justify-center items-center text-center mx-2`}>{ titleText }</h1>
            <h1 className={`${titleFont.className} text-lg text-white transition-colors duration-300 flex justify-center items-center text-center mx-2`}>{ bodyText } </h1>
            <Link href={'/'} as="/">
                <Button
                    className="mt-4"
                    intent={"primary"}
                >
                    HOME
                </Button>
            </Link>
        </div>
    </div>
  );
};

export default Page404;