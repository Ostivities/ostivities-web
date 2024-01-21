import { TableHeaderProps } from "@/app/lib/types/components";
import { cn } from "@/app/lib/utils";
import { FilterIcon, SortIcon } from "@/public/svgs";

const TableHeader = <T, K extends keyof T>({
  columns,
}: TableHeaderProps<T, K>): JSX.Element => {
  const headers = [
    ...columns,
    { label: "Action", key: "action" } as (typeof columns)[number],
  ]?.map((column, index) => {
    const isActionKey = column.key === "action";
    return (
      <th
        className={cn(
          "whitespace-nowrap text-[0.9375rem] font-BricolageGrotesqueMedium text-OWANBE_TABLE_TITLE pb-3",
          isActionKey ? "w-[10%]" : "pl-7"
        )}
        key={`heading-${index}-${column.label}`}
      >
        <span
          className={cn(
            "flex gap-x-2 items-center",
            isActionKey ? "pl-10" : ""
          )}
        >
          {column.label}
          {column.hasSorting ? <SortIcon /> : null}
          {column.hasFilter ? <FilterIcon /> : null}
        </span>
      </th>
    );
  });

  return (
    <thead>
      <tr className="border-b">{headers}</tr>
    </thead>
  );
};

export default TableHeader;
