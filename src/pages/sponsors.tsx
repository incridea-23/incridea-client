import { NextPage } from "next";
import React from "react";
import SponsorCard from "../components/sponsors/sponsorCard";
import { motion, useScroll } from "framer-motion";

const sponsorDetails: {
  name: string;
  tier: string;
  desc: string;
  websiteURL: string;
  imageURL: string;
}[] = [
  {
    name: "sponsor1",
    tier: "official ed-tech sponsor",
    desc: "",
    websiteURL: "https://incridemo.web.app/sponsors",
    imageURL: "/assets/png/bomb.png",
  },
  {
    name: "sponsor2",
    tier: "official ed-tech sponsor",
    desc: "",
    websiteURL: "https://incridemo.web.app/sponsors",
    imageURL: "/assets/png/bomb.png",
  },
  {
    name: "sponsor3",
    tier: "official ed-tech sponsor",
    desc: "",
    websiteURL: "https://incridemo.web.app/sponsors",
    imageURL: "/assets/png/bomb.png",
  },
  {
    name: "sponsor4",
    tier: "official ed-tech sponsor",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore pariatur maxime asperiores quidem praesentium delectus nobis quia fuga laboriosam odit.",
    websiteURL: "https://incridemo.web.app/sponsors",
    imageURL: "/assets/png/bomb.png",
  },
  {
    name: "sponsor5",
    tier: "official ed-tech sponsor",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, id quo. Corporis minus quasi minima aperiam temporibus nostrum, voluptas dolor suscipit error dolores.",
    websiteURL: "https://incridemo.web.app/sponsors",
    imageURL: "/assets/png/bomb.png",
  },
];

const Sponsors: NextPage = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* --mono-blue: #008fff; --mono-pink: #ffb3ff; --mono-red: #ff537a;
      --mono-yellow: #ffffb5; --mono-green: #00ffb5; --mono-tile: #121217; */}
      <div className="pt-16 px-10 flex flex-col items-center justify-center bg-black overflow-clip w-full relative">
        <svg
          className="absolute"
          width="2279"
          height="3163"
          viewBox="0 0 2279 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <motion.path
            style={{ pathLength: scrollYProgress }}
            stroke="white"
            stroke-width="60"
            stroke-linecap="round"
            fill-opacity="0"
            stroke-opacity="1"
            d="M79.0787 79.4622C147.281 79.4622 212.549 107.581 280.585
            114.06C305.666 116.449 320.971 134.211 348.641 134.211C368.855
            134.211 400.346 137.615 419.739 142.576C446.754 149.486 466.139
            192.312 495.779 204.168C527.516 216.863 565.427 217.133 595.012
            233.064C611.83 242.119 620.525 251.861 641.397 261.198C692.121
            283.891 744.062 295.708 793.097 324.312C885.064 377.959 976.754
            436.457 1071.78 487.038C1144.52 525.755 1211.77 573.644 1283.94
            612.505C1315.5 629.498 1349.42 640.61 1380.89 658.129C1413.39
            676.224 1437.78 704.553 1470.62 721.242C1518.53 745.592 1566.18
            777.147 1612.81 804.886C1700.72 857.177 1783.08 915.545 1871.35
            966.472C1913.46 990.768 1946.23 1026.45 1987.69 1051.26C2019.57
            1070.34 2051.24 1085.49 2080.46 1108.67C2108.73 1131.09 2137.54
            1163.31 2171.71 1175.96C2201.3 1186.92 2205.49 1328.9 2193
            1356.56C2184.05 1376.37 2179.46 1400.79 2168.67 1419.29C2157.21
            1438.93 2143.59 1451.11 2134.83 1473.28C2109.62 1537.04 2049.17
            1585.7 2009.74 1641.33C1973.76 1692.09 1920.04 1742.51 1870.59
            1779.72C1782.18 1846.26 1687.62 1905.36 1593.8 1964.12C1530.46
            2003.79 1460.42 2031.38 1398.38 2073.24C1346.74 2108.08 1298.2
            2144.69 1244.4 2176.27C1225.28 2187.49 1199.83 2194.1 1182.42
            2207.07C1155.76 2226.94 1132.56 2249.84 1104.1 2267.9C1052.63
            2300.57 997.834 2340.76 956.584 2385.76C937.88 2406.17 913.079
            2425.83 898.793 2449.64C888.493 2466.8 886.884 2485.59 872.559
            2501.35C849.353 2526.87 852.675 2539.02 841.383 2567.88C831.177
            2593.96 819.948 2619.64 809.826 2645.82C794.396 2685.74 763.322
            2712.36 745.952 2750C736.728 2769.98 724.682 2813.67 722.379
            2835.92C717.57 2882.41 700.314 2923.44 719.338 2970.13C727.008
            2988.96 740.851 2996.8 756.978 3005.87C795.647 3027.62 826.776
            3064.15 866.096 3083.81"
            // d="M0,0 C85.18079376220703,103.9546890258789 97.80850219726562,90.41950225830078 211.03419494628906,152.5554962158203 C213.01400756835938,153.64199829101562 215.01800537109375,154.75100708007812 217.0449981689453,155.8820037841797"
          />
        </svg>
        {/* <path
          stroke="url(#__lottie_element_26)"
          stroke-linecap="round"
          stroke-linejoin="miter"
          stroke-miterlimit="0"
          d=" M0,0 C85.18079376220703,103.9546890258789 97.80850219726562,90.41950225830078 211.03419494628906,152.5554962158203 C213.01400756835938,153.64199829101562 215.01800537109375,154.75100708007812 217.0449981689453,155.8820037841797"></path> */}

        <div className="text-red-50 mt-10">
          <h1 className="text-5xl text-center mb-3">SPONSORS</h1>
          <p className="text-3xl">Big names backing an extraordinary fest.</p>
        </div>
        <div className="relative py-3 md:py-16 min-h-[93vh] md:px-14 lg:px-20 flex flex-col gap-9 w-full">
          {sponsorDetails.map((sponsor, index) => (
            <SponsorCard sponsor={sponsor} isEven={index % 2 === 0} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sponsors;
