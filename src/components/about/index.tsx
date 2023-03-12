import { titleFont } from '@/src/utils/fonts';
import { FC } from 'react';
import TextAnimation from '../animation/text';

const About: FC = () => {
  return (
    <section className="text-white mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-2xl">
          <TextAnimation
            text="About Incridea"
            className={`${titleFont.className}`}
            textStyle='text-xl font-semibold lg:text-3xl'
          />

          <p className="text-sm lg:text-lg mt-4">
            Never gonna give you up, Never gonna let you down, Never gonna run
            around and desert you. Never gonna make you cry. Never gonna say
            goodbye. Never gonna tell a lie and hurt you. Never gonna give you
            up, Never gonna let you down, Never gonna run around and desert you.
            Never gonna make you cry. Never gonna say goodbye. Never gonna tell
            a lie and hurt you.
          </p>
        </div>

        <div className="text-center my-auto">Mascot Here</div>
      </div>
    </section>
  );
};

export default About;
