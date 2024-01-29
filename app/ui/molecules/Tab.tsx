"use client";

import { cn } from "@/app/lib/utils";
import { useCallback, useState } from "react";

const Tab = ({
  tabs,
  currentPage,
}: {
  tabs: string[];
  currentPage: string;
}) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const handleCurrentTab = useCallback((tab: string) => {
    setCurrentTab(tab);
  }, []);

  return (
    <div className="flex items-center gap-x-10">
      {tabs.map((tab, i) => (
        <button
          key={`${currentPage}-${tab}-${i}`}
          onClick={() => handleCurrentTab(tab)}
          className={cn(
            tab === currentTab
              ? "text-white bg-OWANBE_PRY py-3 px-8 rounded-3xl font-semibold"
              : ""
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tab;
