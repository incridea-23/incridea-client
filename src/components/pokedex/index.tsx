import Image from "next/image"

const Pokedex = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <Image
        src="/assets/svg/dextop.svg"
        alt={'dexmid'}
        width={2499}
        height={1837}
        className="w-full lg:h-[25vh] lg:mb-10 aspect-[2499/1837] absolute z-0"
      />
      {/* <div className=" w-8/12 md:w-5/12 xl:w-1/3  mt-40 bg-[#E1FDFA] h-20 z-20 relative"></div> */}
      <Image
        src="/assets/svg/dexbot.svg"
        alt={'dexmid'}
        width={2499}
        height={1837}
        className="w-full lg:h-[25vh] mt-64 aspect-[2499/1837] absolute z-10"
      />
    </div>
  )
}
export default Pokedex

//      <div className=" w-8/12 md:w-5/12 xl:w-1/3  mt-40 bg-[#E1FDFA] h-20 z-20 relative"></div>