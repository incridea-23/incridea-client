import React from "react";

function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-br from-[#001d67]  to-[#040c2b] text-gray-100  pt-24 sm:p-10 sm:pt-20 bodyFont">
      {children}
    </div>
  );
}

export default Dashboard;
