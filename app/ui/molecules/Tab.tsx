"use client";

import { useState } from "react";

const Tab = ({
  tabs,
  currentPage,
}: {
  tabs: string[];
  currentPage: string;
}) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div>
      {tabs.map((tab, i) => (
        <div key={`${currentPage}-${tab}-${i}`}>{tab}</div>
      ))}
    </div>
  );
};

export default Tab;
