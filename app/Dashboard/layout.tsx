"use client";

import { useState } from "react";
import Sidebar from "../ui/molecules/Sidebar";
import Navbar from "../ui/organisms/Navbar";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleMenuCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar setCollapsed={handleMenuCollapse} />
      <aside className="flex-grow flex">
        <Sidebar collapsed={collapsed} /> layout
      </aside>
    </main>
  );
};

export default Layout;
