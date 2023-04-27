import { QRCodeScanner } from "@/src/components/pages/dashboard/organizer/QRCodeScanner";
import React from "react";

function Pronite() {
  return (
    <div className="w-full min-h-screen p-5 flex justify-center items-center pt-20">
      <div className="max-w-sm">
        <QRCodeScanner intent="pronite" />
      </div>
    </div>
  );
}

export default Pronite;
