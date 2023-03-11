// @refresh reset
import { type NextPage } from 'next';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import Navbar from '../components/navbar';

const Home: NextPage = () => {
  const { RiveComponent } = useRive({
    src: `assets/rive/wave.riv/`,
    stateMachines: ['State Machine 1'],
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.BottomCenter,
    }),
  });

  return (
    <div className="overflow-x-hidden">
      <div className="bg-gradient-to-b from-[#A4E4FD] to-[#006DC5]">
        <Navbar />
        <RiveComponent className="w-auto h-screen " />
      </div>
      <div className="bg-gradient-to-b h-[200vh] from-[#5CA3AD] to-[#1b5b94]">
        {/* Body */}
      </div>
    </div>
  );
};

export default Home;
