import TeamCard from "@/src/components/pages/about/TeamCard";
import { baseImageUrl } from "@/src/utils/url";
import { NextPage } from "next";
import { VikingHell, pressStart } from "../_app";

const Team: NextPage = () => {
  return (
    <div className="pt-32 pb-10 min-h-screen bg-[#7628d0] flex flex-col gap-y-8">
      <div className="px-4">
        <h1
          className={`text-2xl lg:text-4xl font-bold text-white text-center font-PressStart`}
        >
          Incridea&apos;s Technical Team
        </h1>
        <p className="text-lg lg:text-2xl font-bold text-white text-center bodyFont mt-5">
          Meet the developers
        </p>
      </div>
      <div className="flex justify-center flex-wrap gap-10 max-w-[80rem] mx-auto px-2">
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
    name: "Swasthik Shetty",
    role: "Team Lead | Full Stack",
    instagram: "https://www.youtube.com/watch?v=wh9QLjk3M2k&t=380s",
    github: "https://github.com/swasthikshetty10/",
    linkedin: "https://www.linkedin.com/in/swasthikshetty10/",
    image: "/team/swasthik.jpg",
    quote: "My code is broke? or am I?",
    avatar: "",
  },
  {
    name: "Aniruddha Upadhya K",
    role: "Frontend",
    instagram: "https://www.youtube.com/watch?v=wh9QLjk3M2k&t=380s",
    github: "https://github.com/Aniruddha-Upadhya-K",
    linkedin: "https://www.linkedin.com/in/aniruddha-upadhya/",
    image: "/team/aniruddha.jpg",
    quote: "I cooked and I will cook more 😎",
    avatar: "",
  },
  {
    name: "Nagaraj Pandith",
    role: "Full Stack",
    instagram: "https://www.instagram.com/nagarajpandithh",
    github: "https://github.com/nagarajpandith",
    linkedin: "https://www.linkedin.com/in/nagaraj-pandith/",
    image: "/team/nagaraj.jpg",
    quote: '"Apdi Pode Pode Pode, Apdi Pode" - Martin Luther King Jr.',
    avatar: "",
  },
  {
    name: "Satwik Prabhu",
    role: "Full Stack",
    instagram: "https://www.instagram.com/satwikprabhu",
    github: "https://github.com/satwikrprabhu",
    linkedin: "https://www.linkedin.com/in/satwikprabhu",
    image: "/team/satwik.jpg",
    quote: "I stalk you know!",
    avatar: "",
  },

  {
    name: "Srivatsa R Upadhya",
    role: "Backend",
    instagram: "https://www.youtube.com/watch?v=wh9QLjk3M2k&t=380s",
    github: "https://github.com/SrivatsaRUpadhya",
    linkedin:
      "https://www.linkedin.com/in/srivatsa-r-upadhya-060373227?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    image: "/team/srivatsa.jpg",
    quote: "Use vim!",
    avatar: "",
  },
  {
    name: "Aaron Jevil Nazareth",
    role: "Full Stack",
    instagram:
      "https://www.instagram.com/aaron_naz25?igsh=MTB3dHlvZGE5OHl4bQ==",
    github: "https://github.com/jevil25",
    linkedin:
      "https://www.linkedin.com/in/aaron-nazareth-6580311b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    image: "/team/aaron.jpg",
    quote:
      "If we're not meant to have midnight snacks, why is there a light in the fridge?",
    avatar: "",
  },
  {
    name: "Nandan R Pai",
    role: "Frontend",
    instagram: "https://www.instagram.com/nandanpi__/",
    github: "https://github.com/nandanpi",
    linkedin: "https://www.linkedin.com/in/nandanpai09",
    image: "/team/nandan.jpg",
    quote: "My touch is the solution to all problems 🥰",
    avatar: "",
  },
  {
    name: "Prabhu Omkar",
    role: "Frontend",
    instagram: "https://www.youtube.com/watch?v=wh9QLjk3M2k&t=380s",
    github: "https://github.com/Prabhuomkar9",
    linkedin: "https://www.linkedin.com/in/prabhuomkar9/",
    image: "/team/omkar.jpg",
    quote: "I spill milk over my keyboard oftenly",
    avatar: "",
  },
  {
    name: "Kausthubh J Rao",
    role: "Frontend",
    instagram: "https://www.instagram.com/_.kaxsthxbh._/",
    github: "https://github.com/exgene",
    linkedin: "https://www.linkedin.com/in/kausthubh-j-rao-348444258/",
    image: "/team/kausthubh.jpg",
    quote: "CHIPI CHIPI CHAPA CHAPA",
    avatar: "",
  },
  {
    name: "Keerthan NS",
    role: "Full Stack",
    instagram: "https://www.instagram.com/keerthan_ns",
    github: "https://github.com/keerthan-ns",
    linkedin: "https://www.linkedin.com/in/keerthan-n-s/",
    image: "/team/keerthan.jpg",
    quote:
      "Think maintaining a relationship is hard? Try resolving merge conflicts in Git!",
    avatar: "",
  },
  {
    name: "Adithya Rao K",
    role: "Frontend",
    instagram: "https://www.youtube.com/watch?v=wh9QLjk3M2k&t=380s",
    github: "https://github.com/Adithya11811",
    linkedin: "https://www.linkedin.com/in/adithya-rao-k-537394229/",
    image: "/team/adithya.jpg",
    quote: "Code is like humor. When you have to explain it, it's bad.",
    avatar: "",
  },
  {
    name: "Shashank B N",
    role: "Backend",
    instagram: "https://www.youtube.com/watch?v=wh9QLjk3M2k&t=380s",
    github: "https://github.com/Athena-2003",
    linkedin: "https://www.linkedin.com/in/shashank-b-n-947978173/",
    image: "/team/shashank2.jpg",
    quote: "Arch btw, Vim btw, Skill issues 420/69",
    avatar: "",
  },
  {
    name: "Rakshith Vijay",
    role: "Frontend",
    instagram: "https://www.instagram.com/rakshithx09?igsh=cmgwZThzZWpqYmI4",
    github: "https://github.com/rakshithx09",
    linkedin: "https://www.youtube.com/watch?v=wh9QLjk3M2k&t=380s",
    image: "/team/rakshith.jpg",
    quote: "Don't come near my daughter",
    avatar: "",
  },
  {
    name: "Amrith R Naik",
    role: "Frontend",
    instagram: "https://www.instagram.com/_a_m_r_i_t_h_?igsh=bnQ1bnhrNWU3dm4y",
    github: "https://github.com/amrith-r-naik",
    linkedin: "https://www.youtube.com/watch?v=wh9QLjk3M2k&t=380s",
    image: "/team/amrith.jpg",
    quote:
      "Man alone asks the question 'To be or not to be?' All other creatures live.",
    avatar: "",
  },
  {
    name: "Satvik S Nayak",
    role: "Frontend",
    instagram: "https://www.instagram.com/_static.n/",
    github: "https://github.com/satviknayak",
    linkedin: "https://www.linkedin.com/in/satviksnayak/",
    image: "/team/satvik.jpg",
    quote: "Go Beyond Plus Ultra",
    avatar: "",
  },
  {
    name: "Anirudh Karanth",
    role: "Backend",
    instagram: "https://www.youtube.com/watch?v=wh9QLjk3M2k&t=380s",
    github: "https://github.com/AnirudhKaranth",
    linkedin: "https://www.linkedin.com/in/anirudh-k-492474231/",
    image: "/team/anirudh.jpg",
    quote: "That's what she said",
    avatar: "",
  },

  {
    name: "Karthik Shetty",
    role: "Frontend",
    instagram:
      "https://www.instagram.com/karthikshetty555?igsh=dWR0MzJsbnI4Nzdh",
    github: "https://github.com/KarthikShetty5",
    linkedin: "https://www.linkedin.com/in/karthik-shetty-951191248/",
    image: "/team/karthik.jpg",
    quote: "Turning ideas into reality, one line of code at a time",
    avatar: "",
  },
  {
    name: "Bhavya Nayak",
    role: "Frontend",
    instagram: "https://www.instagram.com/bhv_nayak?igsh=MXBueW1nY2oxMjgwNA==",
    github: "https://github.com/BhavyaNayak04",
    linkedin: "https://www.linkedin.com/in/bhavya-nayak-b52a7a27a",
    image: "/team/bhavya.jpg",
    quote: "Hello World!!!",
    avatar: "",
  },
  {
    name: "Varun Pai M D",
    role: "Frontend",
    instagram: "https://www.instagram.com/varunpai7",
    github: "https://www.github.com/varunpai314",
    linkedin: "https://www.linkedin.com/in/varunpaimd",
    image: "/team/varun.jpg",
    quote:
      "Do not go gentle into that good night; Old age should burn and rave at close of day. Rage, rage against the dying of the light.",
    avatar: "",
  },
  {
    name: "Rohan M P",
    role: "Backend",
    instagram: "https://www.instagram.com/rohan_m_p_/",
    github: "https://github.com/rohanmp2912",
    linkedin: "https://www.linkedin.com/in/rohan-m-p-656b16266/",
    image: "/team/rohan.jpg",
    quote:
      "Doesn't matter if i made it to tech team, ill still have class monitor wali face",
    avatar: "",
  },

  {
    name: "M Sayeem Ahmed",
    role: "Backend",
    instagram: "https://www.instagram.com/ahmedmsayeem/",
    github: "https://github.com/9964728107",
    linkedin: "https://www.linkedin.com/in/m-sayeem-ahmed-651a7b254/",
    image: "/team/sayeem.jpg",
    quote: "Damn, Block theory of time is quite scary!",
    avatar: "",
  },
  {
    name: "Sourav Bangera",
    role: "Video Editor",
    instagram: "https://www.instagram.com/souravbangera_/",
    github: "https://www.youtube.com/watch?v=wh9QLjk3M2k&t=380s",
    linkedin: "https://www.linkedin.com/in/sourav-bangera-278a45227/",
    image: "/team/sourav.jpg",
    quote: "Should have taken arts",
    avatar: "",
  },
  {
    name: "Vasoon R Rai",
    role: "Frontend",
    instagram: "https://www.instagram.com/_rai_vasoon_20?igsh=MXNnNWxhOWEwbnplbA%3D%3D&utm_source=qr",
    github: "https://www.youtube.com/watch?v=wh9QLjk3M2k&t=380s",
    linkedin: "https://www.linkedin.com/in/sourav-bangera-278a45227/",
    image: "/team/vasoon_ltxcjr.jpg",
    quote: "Designers shooting for usable is like a chef shooting for edible.",
    avatar: "",
  },
  {
    name: "Yuvraj Bhardawaj",
    role: "Frontend",
    instagram: "hhttps://www.youtube.com/watch?v=wh9QLjk3M2k&t=380s",
    github: "https://github.com/YuvrajBhardawaj",
    linkedin: "https://www.linkedin.com/in/yuvraj-bhardawaj-3b12a6237",
    image: "",
    quote: "Radhe Radhe",
    avatar: "/team/yuvraj_k4q3vq.jpg",
  }
];
