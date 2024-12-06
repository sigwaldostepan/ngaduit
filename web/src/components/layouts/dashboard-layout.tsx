import * as React from "react";
import { Header, Sidebar } from "../elements";
import { MobileNav } from "../elements/mobile-nav";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex items-start min-h-[calc(100vh-73px)]">
        <Sidebar />
        <main className="flex flex-col items-start w-full min-h-[calc(100vh-73px)] px-4 py-6">
          {children}
          <div className="min-h-screen"></div>
          <div className="min-h-screen"></div>
        </main>
        <MobileNav />
      </div>
    </>
  );
};
