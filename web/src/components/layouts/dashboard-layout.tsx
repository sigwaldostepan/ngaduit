import * as React from "react";
import { Header, Sidebar } from "../elements";
import { MobileNav } from "../elements/mobile-nav";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Header />
      <main className="flex items-start min-h-[calc(100vh-73px)]">
        <Sidebar />
        <div className="flex flex-col items-start">{children}</div>
        <MobileNav />
      </main>
    </>
  );
};
