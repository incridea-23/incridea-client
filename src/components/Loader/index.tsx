import { useEffect, useState, type FC } from "react";
import Image from "next/image";
import styles from "./loader.module.css";
import { useRouter } from "next/router";

const Loader: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    function startTimer() {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          document.body.classList.remove("remove-scrolling");
        }, 1000);
      }, 3000);
    }

    window.scrollTo(0, 0);
    router.events.on("routeChangeStart", () => {
      window.scrollTo(0, 0);
      document.body.classList.add("remove-scrolling");
      setIsLoading(true);
      setOpen(true);
    });

    router.events.on("routeChangeComplete", () => {
      startTimer();
    });

    router.events.on("routeChangeError", () => {
      startTimer();
    });
    return () => {
      setIsLoading(false);
      setOpen(false);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      {isLoading ? (
        <div
          className={`absolute h-full w-fh-full overflow-hidden no-scrollbar z-[9999]`}
        >
          <div className="fixed h-screen w-screen">
            <Image
              className={`${
                open ? styles.mountbl : styles.unmountbl
              } absolute object-cover h-screen w-full object-center `}
              src={`/assets/loader/cloudbl.png`}
              alt="cloud-bg"
              height={1080}
              width={1920}
            />
            <Image
              className={`${
                open ? styles.mounttr : styles.unmounttr
              } absolute object-cover h-screen w-full object-center `}
              src={`/assets/loader/cloudtr.png`}
              alt="cloud-bg"
              height={1080}
              width={1920}
            />
            <div className="h-screen w-full flex flex-col justify-center items-center">
              <Image
                className={`${styles.fadeinlogo} animate-pulse w-44 h-auto`}
                src={"/assets/png/logo-black.png"}
                alt="logo"
                height={250}
                width={250}
              />
              <Image
                className={`${styles.fadeinlogo} animate-pulse w-auto h-auto`}
                src={"/assets/loader/dodLogo.png"}
                alt="logo"
                height={250}
                width={250}
              />
            </div>
            <div className="absolute top-0 left-0  h-screen w-full px-4 flex items-center justify-center ">
              <div className={`pointer-events-none ${styles.animateMagnifier}`}>
                <Image
                  src={`/assets/loader/magnifier.png`}
                  className="w-16 h-auto"
                  height={100}
                  width={100}
                  alt="magnifier"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`absolute h-full w-full bg-transparent overflow-hidden no-scrollbar z-[9999] ${styles.fadeloader}`}
        >
          <div className="fixed h-screen w-screen">
            <Image
              className={`${styles.unmountblsecond} absolute object-cover h-screen w-screen object-center `}
              src={`/assets/loader/cloudbl.png`}
              alt="cloud-bg"
              height={1000}
              width={1000}
            />
            <Image
              className={`${styles.unmounttrsecond} absolute object-cover h-screen w-screen object-center `}
              src={`/assets/loader/cloudtr.png`}
              alt="cloud-bg"
              height={1000}
              width={1000}
            />
            <div
              className={`h-screen w-screen flex flex-col justify-center items-center `}
            >
              <Image
                className={`${styles.fadelogo} w-44 h-auto`}
                src={"/assets/png/logo-black.png"}
                alt="logo"
                height={250}
                width={250}
              />
              <Image
                className={`${styles.fadelogo} w-auto h-auto`}
                src={"/assets/loader/dodLogo.png"}
                alt="logo"
                height={250}
                width={250}
              />
            </div>
            <div
              className={`${styles.fadelogo} absolute top-0 left-0  h-screen w-screen flex items-center justify-center `}
            >
              <div className={`pointer-events-none ${styles.animateMagnifier}`}>
                <Image
                  src={`/assets/loader/magnifier.png`}
                  className="w-16 h-auto"
                  height={100}
                  width={100}
                  alt="magnifier"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;
