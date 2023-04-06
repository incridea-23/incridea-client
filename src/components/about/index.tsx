import { titleFont } from "@/src/utils/fonts";
import { FC } from "react";
import TextAnimation from "../animation/text";

const About: FC = () => {
  return (
    <section
      data-scroll
      data-scroll-speed="5"
      className="text-white mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8 mb-72">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-2xl">
          <TextAnimation
            text="About Incridea"
            className={`${titleFont.className}`}
            textStyle="text-xl font-semibold lg:text-3xl"
          />
          <div className="text-sm lg:text-lg mt-4 space-y-2">
            <p>
              Incridea, a four-day National-Level extravaganza will play host to
              over 60 events, spanning the technical, non-technical, and
              cultural spheres, replete with cultural soirées and pronites,
              promising to be an experience of a lifetime.
            </p>
            <p>
              The stunning marine world, with all its wonders and marvels, will
              be unveiled before your very eyes, as you revel in the vivacity of
              these momentous days, forging memories that shall be etched in
              your minds forevermore.
            </p>
          </div>
        </div>

        <div className="text-center my-auto">Mascot Here</div>
      </div>
    </section>
  );
};

export default About;
