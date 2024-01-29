import { QRCodeScanner } from "@/src/components/pages/dashboard/organizer/QRCodeScanner";
import React from "react";

function Pronite() {
  return (
    <div className="w-full min-h-screen p-5  bg-gradient-to-br from-[#001d67]  to-[#040c2b] flex flex-col justify-center items-center pt-20">
      <h2 className="mb-8 titleFont text-white md:text-4xl text-3xl">Pronite Scanner</h2>
      <div className="max-w-sm">
        <QRCodeScanner intent="pronite" />
      </div>
    </div>
  );
}

export default Pronite;
