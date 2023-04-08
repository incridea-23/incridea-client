import React from "react";

function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen sm:pt-28 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-[#001d67]  to-[#040c2b] text-gray-100 p-5 sm:p-10">
      {children}
    </div>
  );
}

export default Dashboard;
