import React from "react";

function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-auto bg-gradient-to-t from-black  to-blue-900 text-gray-100 p-5 sm:p-10">
      {children}
    </div>
  );
}

export default Dashboard;
