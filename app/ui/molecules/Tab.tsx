import { cn } from "@/app/lib/utils";

interface TabProps {
  tabs: string[];
  currentTab: string;
  handleCurrentTab: (tab: string) => void;
  style?: React.CSSProperties; // Accept the style prop
}

const Tab = ({ tabs, currentTab, handleCurrentTab, style }: TabProps) => {
  return (
    <div className="flex items-center gap-x-10" style={{ ...style, marginLeft: '20px' }}>
      {tabs.map((tab, i) => (
        <button
          key={`${currentTab}-${tab}-${i}`}
          onClick={() => handleCurrentTab(tab)}
          className={cn(
            tab === currentTab
              ? "text-white bg-OWANBE_PRY py-3 px-8 rounded-3xl font-semibold"
              : null,
            "font-[Bricolage Grotesque]" // Apply the Bricolage Grotesque font to all tabs
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tab;
