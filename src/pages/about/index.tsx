import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Banner from "../../components/AboutUs/Banner";

const About = () => {
  return (
    <div className="page-container flex flex-col md:gap-16 gap-8">
      <div className="min-h-screen flex flex-col md:gap-16 gap-8">
        <Banner
          video={"https://vimeo.com/883551016?share=copy"}
          text=""
          credits=""
        />
        <span className="text-base md:text-lg xl:text-xl text-secondary-100">
          <div className="flex md:flex-row flex-col justify-between items-center gap-8">
            <Image
              src="/assets/png/logo-black.png"
              alt="image"
              loading="lazy"
              className="object-contain h-full object-center top-0 md:w-1/3 w-3/4"
              height={500}
              width={500}
            />
            <div className="max-w-3xl">
              Incridea is a colossal national-level techno-cultural fest with an
              audience pool spread among{" "}
              <span className="font-bold">200 colleges</span> all across India.
              The fest holds the values abbreviated in the name, i.e.{" "}
              <span className="font-bold">Innovate, Create and Ideate</span> at
              the highest standard possible by becoming a symbol of technology,
              passion, culture and conviction among students. Incridea is
              conducted with the help of many services and technology created
              and operated by students, making it one of the most indigenous
              college fests with resources and capabilities beyond expectations.
              <br />
              <br />
              Pronites of Incridea has seen a wide range of popular and talented
              artists, DJs, and bands. The fest constitutes over{" "}
              <span className="font-bold">40+ events</span> and expected
              footfall of around <span className="font-bold">45,000</span>,
              making it one of the most happening fests in the region. With
              grand successes over the years and a flair for perfection, we
              intend to make Incridea &apos;24 and grand success and the best
              one so far.
            </div>
          </div>
        </span>
      </div>

      <Banner
        video={"https://vimeo.com/883551016?share=copy"}
        text=""
        credits=""
      />

      <span className="text-base md:text-lg xl:text-xl text-secondary-100">
        <div className="flex md:flex-row flex-col justify-between items-center gap-8">
          <Image
            src="/assets/png/nitteLogoWhite.png"
            alt="image"
            loading="lazy"
            className="object-contain h-full object-center top-0 md:w-1/3 w-3/4"
            height={500}
            width={500}
          />
          <div className="max-w-3xl">
            Nitte Mahalinga Adyantaya Memorial Institute of Technology (NMAMIT),
            Nitte, established in 1986 and recognized by the All-India Council
            for Technical Education, New Delhi, has been a constituent college
            of Nitte (Deemed to be University), Mangaluru, since June 2022.
            NMAMIT is placed in the Rank band 101-150 in the National
            Institutional Ranking Framework (NIRF) 2023 by the Ministry of
            Education, Government of India. NMAMIT, the off-campus centre of
            Nitte DU located at Nitte Village, has active collaborations with
            several international universities and organizations for faculty and
            student exchanges, research, internships and placements.
            <br />
            <br />
            The Institute offers UG engineering program in fifteen disciplines,
            PG program M.Tech. in seven disciplines & MCA program. All the
            departments have qualified research guides for students interested
            in taking up research work leading to Ph.D. For details, visit{" "}
            <a
              href="https://nmamit.nitte.edu.in/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              www.nmamit.nitte.edu.in
            </a>
          </div>
        </div>
      </span>
    </div>
  );
};

export default About;
