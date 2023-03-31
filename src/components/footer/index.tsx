// @refresh reset

import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import React from "react";

function Footer() {
  const { RiveComponent: Footer } = useRive({
    src: `assets/rive/footer.riv/`,
    stateMachines: ["State Machine 1"],
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.BottomCenter,
    }),
  });
  return <Footer className="w-screen  h-[50vh] lg:h-screen " />;
}

export default Footer;
