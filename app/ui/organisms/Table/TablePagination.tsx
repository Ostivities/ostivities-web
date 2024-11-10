import { cn } from "@/app/lib/utils";
import React from "react";

const TablePagination = () => {
  const pagination = [1, 2, "Next"];
  return (
    <div className="pt-[1.1875rem] border-t flex flex-col md:flex-row gap-y-3 md:gap-y-0 justify-between items-center">
      <p className="font-BricolageGrotesqueSemiBold text-[#152738]">
        Showing 1 - 10 of 25 total entries
      </p>
      <div className="flex items-center gap-x-2">
        {pagination.map((currentNo, i) => (
          <button
            key={`current-pagination-${currentNo}`}
            className={cn(
              "font-BricolageGrotesqueBold text-white px-3 py-1 rounded-sm",
              i === 0 ? "bg-OWANBE_PRY" : "bg-OWANBE_BTN_INACTIVE"
            )}
          >
            {currentNo}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TablePagination;
