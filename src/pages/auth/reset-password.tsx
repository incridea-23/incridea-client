import LoginPortal from "@/src/components/login/portal";
import ResetPassword from "../../components/form/resetPassword";
import { NextPage } from "next";
import Image from "next/image";
import { baseImageUrl } from "@/src/utils/url";

const Reset: NextPage = () => {
  return (
    <>
      <div className="h-16 bg-[#6a5fd7]"></div>

      <Image
        fill={true}
        className="object-cover mt-16"
        src={`${baseImageUrl}/assets/svg/loginBG.svg`}
        alt={"loginBG"}
        quality={100}
        priority
      />

      <div
        className={`relative min-h-[93vh] flex flex-col justify-between [transform-style:preserve-3d] [perspective:500px] overflow-hidden`}
      >
        <LoginPortal isTop={true} />

        <div className="absolute px-3 py-3 overflow-y-auto min-w-[80vw] max-w-[80vw] sm:min-w-[350px] sm:max-w-[350px] max-h-[75vh] lg:max-h-[76vh] bg-gradient-to-b from-[#1f2e97] to-[#090d4b] rounded-md top-2/4 left-2/4 origin-bottom transition-all ease-suck-in shadow-[0_0_18px_1px_#141e73] md:shadow-[0_0_20px_2px_#141e73] text-accent-200 -translate-x-2/4 -translate-y-2/4">
          <div className={`shrink-0 flex items-center justify-center`}>
            <div className="p-3 py-5 grow">
              <ResetPassword />
            </div>
          </div>
        </div>

        <LoginPortal isTop={false} />
      </div>
    </>
  );
};

export default Reset;
