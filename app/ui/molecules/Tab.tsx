import { cn } from "@/app/lib/utils";

const Tab = ({
  tabs,
  currentTab,
  handleCurrentTab,
}: {
  tabs: string[];
  currentTab: string;
  handleCurrentTab: (tab: string) => void;
}) => {
  return (
    <div className="flex items-center gap-x-10">
      {tabs.map((tab, i) => (
        <button
          key={`${currentTab}-${tab}-${i}`}
          onClick={() => handleCurrentTab(tab)}
          className={cn(
            tab === currentTab
              ? "text-white bg-OWANBE_PRY py-3 px-8 rounded-3xl font-semibold"
              : null
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tab;
