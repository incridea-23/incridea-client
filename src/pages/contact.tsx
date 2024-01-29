import { NextPage } from 'next';
import { MdCall, MdMail } from 'react-icons/md';

const Contact: NextPage = () => {
  return (
    <div className="px-4 md:px-6 pt-32 min-h-screen text-white bg-gradient-to-b from-[#46aacf]  via-[#075985] to-[#2d6aa6]">
      <div className="mx-auto max-w-4xl">
        <h2 className={`titleFont text-white text-center text-4xl md:text-5xl`}>
          Contact Us
        </h2>
        <h5 className="bodyFont text-center mt-5 md:mt-7 text-base md:text-xl max-w-7xl mx-auto">
          Any queries should be directed to the student organizers and college
          staff at the following contact information:
        </h5>
        <div className="bodyFont md:px-10 px-5 md:mt-8 mt-6 max-w-7xl mx-auto bg-white/20 rounded-sm md:py-7 py-4">
          <div className="font-semibold md:text-2xl text-base flex items-center space-x-2">
            <MdMail />
            <a>Mail</a>
          </div>
          <p className="mt-2">
            <a
              href="mailto:incridea@nmamit.in"
              className="mt-2 hover:underline"
            >
              {' '}
              incridea@nmamit.in
            </a>
          </p>
          <div className="font-semibold md:text-2xl text-base mt-5 flex items-center space-x-2">
            <MdCall />
            <a>Phone Numbers</a>
          </div>
          <p className="mt-2">
            Phone: +91{' '}
            <a href="tel:9448815186" className="hover:underline">
              94488 15186
            </a>{' '}
            or +91{' '}
            <a href="tel:9620788383" className="hover:underline">
              96207 88383
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
