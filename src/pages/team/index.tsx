import TeamCard from "@/src/components/pages/about/TeamCard";
import { baseImageUrl } from "@/src/utils/url";
import { NextPage } from "next";
import { VikingHell } from "../_app";

const Team: NextPage = () => {
  return (
    <div className="pt-28 pb-10 min-h-screen bg-[#7628d0]">
      <div className="px-4">
        <h1
          className={`text-3xl lg:text-5xl font-bold text-white text-center ${VikingHell.className}`}
        >
          Incridea&apos;s Code Wizards
        </h1>
        <p className="text-lg lg:text-2xl font-bold text-white text-center bodyFont mb-10">
          Meet the developers
        </p>
      </div>
      <div className="flex justify-center flex-wrap gap-10 max-w-7xl mx-auto px-2">
        {TeamMembers.map((member) => (
          <TeamCard
            key={member.name}
            name={member.name}
            role={member.role}
            image={member.image}
            linkedin={member.linkedin}
            instagram={member.instagram}
            github={member.github}
            quote={member.quote}
            avatar={member.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;

const TeamMembers = [
  {
    "name": "Adithya Rao K",
    "role":"",
    "instagram": "",
    "github": "https://github.com/Adithya11811",
    "linkedin": "https://www.linkedin.com/in/adithya-rao-k-537394229/",
    "image": "/team/adithya.jpg",
    "quote": "Code is like humor. When you have to explain it, it's bad.",
    "avatar": ""
  },
  {
    "name": "Anirudh Karanth",
    "role":"",
    "instagram": "",
    "github": "https://github.com/AnirudhKaranth",
    "linkedin": "https://www.linkedin.com/in/anirudh-k-492474231/",
    "image": "/team/anirudh.jpg",
    "quote": "That's what she said",
    "avatar": ""
  },
  {
    "name": "Satvik S Nayak",
    "role":"",
    "instagram": "https://www.instagram.com/_static.n/",
    "github": "https://github.com/satviknayak",
    "linkedin": "https://www.linkedin.com/in/satviksnayak/",
    "image": "/team/satvik.jpg",
    "quote": "Go Beyond Plus Ultra",
    "avatar": ""
  },
  {
    "name": "A Omkar G Prabhu",
    "role":"",
    "instagram": "",
    "github": "https://github.com/Prabhuomkar9",
    "linkedin": "https://www.linkedin.com/in/prabhuomkar9/",
    "image": "/team/omkar.jpg",
    "quote": "I spill milk over my keyboard oftenly",
    "avatar": ""
  },
  {
    "name": "Srivatsa R Upadhya",
    "role":"",
    "instagram": "",
    "github": "https://github.com/SrivatsaRUpadhya",
    "linkedin": "https://www.linkedin.com/in/srivatsa-r-upadhya-060373227?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    "image": "/team/srivatsa.jpg",
    "quote": "Use vim!",
    "avatar": ""
  },
  {
    "name": "Karthik Shetty",
    "role":"",
    "instagram": "https://www.instagram.com/karthikshetty555?igsh=dWR0MzJsbnI4Nzdh",
    "github": "https://github.com/KarthikShetty5",
    "linkedin": "https://www.linkedin.com/in/karthik-shetty-951191248/",
    "image": "/team/karthik.jpg",
    "quote": "Turning ideas into reality, one line of code at a time",
    "avatar": ""
  },
  {
    "name": "Kausthubh J Rao",
    "role":"",
    "instagram": "https://www.instagram.com/_.kaxsthxbh._/",
    "github": "https://github.com/exgene",
    "linkedin": "https://www.linkedin.com/in/kausthubh-j-rao-348444258/",
    "image": "/team/kausthubh.jpg",
    "quote": "CHIPI CHIPI CHAPA CHAPA",
    "avatar": ""
  },
  {
    "name": "Rakshith Vijay",
    "role":"",
    "instagram": "https://www.instagram.com/rakshithx09?igsh=cmgwZThzZWpqYmI4",
    "github": "https://github.com/rakshithx09",
    "linkedin": "",
    "image": "/team/rakshith.jpg",
    "quote": "just put a random quote bruh\" put this as the quote",
    "avatar": ""
  },
  {
    "name": "Bhavya Nayak",
    "role":"",
    "instagram": "https://www.instagram.com/bhv_nayak?igsh=MXBueW1nY2oxMjgwNA==",
    "github": "https://github.com/BhavyaNayak04",
    "linkedin": "www.linkedin.com/in/bhavya-nayak-b52a7a27a",
    "image": "/team/bhavya.jpg",
    "quote": "Hello World!!!",
    "avatar": ""
  },
  {
    "name": "Nagaraj Pandith",
    "role":"",
    "instagram": "https://www.instagram.com/nagarajpandithh",
    "github": "https://github.com/nagarajpandith",
    "linkedin": "https://www.linkedin.com/in/nagaraj-pandith/",
    "image": "/team/nagaraj.jpg",
    "quote": "Apdi Pode Pode Pode, Apdi Pode\" - Martin Luther King Jr.",
    "avatar": ""
  },
  {
    "name": "Rohan M P",
    "role":"",
    "instagram": "https://www.instagram.com/rohan_m_p_/",
    "github": "https://github.com/rohanmp2912",
    "linkedin": "https://www.linkedin.com/in/rohan-m-p-656b16266/",
    "image": "/team/rohan.jpg",
    "quote": "Passionate web developer dedicated to turning ideas into interactive experiences, I aspire to make a lasting impact in the digital realm.",
    "avatar": ""
  },
  {
    "name": "KEERTHAN NS",
    "role":"",
    "instagram": "https://www.instagram.com/keerthan_ns",
    "github": "https://github.com/keerthan-ns",
    "linkedin": "https://www.linkedin.com/in/keerthan-n-s/",
    "image": "/team/keerthan.jpg",
    "quote": "Think maintaining a relationship is hard? Try resolving merge conflicts in Git!",
    "avatar": ""
  },
  {
    "name": "M Sayeem Ahmed",
    "role":"",
    "instagram": "https://www.instagram.com/ahmedmsayeem/",
    "github": "https://github.com/9964728107",
    "linkedin": "https://www.linkedin.com/in/m-sayeem-ahmed-651a7b254/",
    "image": "/team/sayeem.jpg",
    "quote": "Damn, Block theory of time is quite scary!",
    "avatar": ""
  },
  {
    "name": "Aaron Jevil Nazareth",
    "role":"",
    "instagram": "https://www.instagram.com/aaron_naz25?igsh=MTB3dHlvZGE5OHl4bQ==",
    "github": "https://github.com/jevil25",
    "linkedin": "https://www.linkedin.com/in/aaron-nazareth-6580311b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    "image": "/team/aaron.jpg",
    "quote": "If we're not meant to have midnight snacks, why is there a light in the fridge?",
    "avatar": ""
  },
  {
    "name": "Aniruddha Upadhya K",
    "role":"",
    "instagram": "https://www.youtube.com/watch?v=wh9QLjk3M2k&t=380s",
    "github": "https://github.com/Aniruddha-Upadhya-K",
    "linkedin": "https://www.linkedin.com/in/aniruddha-upadhya/",
    "image": "/team/aniruddha.jpg",
    "quote": "This isnt chat gpt generated...",
    "avatar": ""
  },
  {
    "name": "Amrith R Naik",
    "role":"",
    "instagram": "https://www.instagram.com/_a_m_r_i_t_h_?igsh=bnQ1bnhrNWU3dm4y",
    "github": "https://github.com/amrith-r-naik",
    "linkedin": "",
    "image": "/team/amrith.jpg",
    "quote": "Man alone asks the question 'To be or not to be?' All other creatures live.",
    "avatar": ""
  },
  {
    "name": "Satwik Prabhu",
    "role":"",
    "instagram": "www.instagram.com/satwikprabhu",
    "github": "www.github.com/satwikrprabhu",
    "linkedin": "https://www.linkedin.com/in/satwikprabhu",
    "image": "/team/satwik.jpg",
    "quote": "I stalk you know!",
    "avatar": ""
  },
  {
    "name": "Varun Pai M D",
    "role":"",
    "instagram": "varunpai7",
    "github": "github.com/varunpai314",
    "linkedin": "linkedin.com/in/varunpaimd",
    "image": "/team/varun.jpg",
    "quote": "Do not go gentle into that good night; Old age should burn and rave at close of day. Rage, rage against the dying of the light.",
    "avatar": ""
  },
  {
    "name": "Nandan R Pai",
    "role":"",
    "instagram": "https://www.instagram.com/nandanpi__/",
    "github": "https://github.com/nandanpi",
    "linkedin": "https://www.linkedin.com/in/nandanpai09",
    "image": "/team/nandan.jpg",
    "quote": "My touch is the solution to all problems",
    "avatar": ""
  }
];
