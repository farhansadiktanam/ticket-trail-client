import DashboardSidebar from "@/components/DashboardSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-[#080c16]">
      <DashboardSidebar />
      <main className="flex-1 min-w-0 p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
