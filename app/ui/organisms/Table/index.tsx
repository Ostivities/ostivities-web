"use client";

import { TableProps } from "@/app/lib/types/components";
import TableHeader from "./TableHeader";
import TableRows from "./TableRow";
import TablePagination from "./TablePagination";
import { ReactNode, useCallback, useState } from "react";
// import TableSearch from "./TableSearch";

const Table = <T, K extends keyof T>({
  data,
  columns,
  // Btn,
  TableTop = null,
  action = "view",
}: TableProps<T, K> & {
  Btn?: ReactNode;
  TableTop?: ReactNode;
  action?: "view" | "download";
}) => {
  const [sortBy, setSortBy] = useState<(typeof columns)[number]["key"]>(
    columns[0]["key"]
  );

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSortandFilter = useCallback(
    (column: (typeof columns)[number]) => {
      const { key } = column;
      if (key === sortBy) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortBy(key);
        setSortOrder("asc");
      }
    },
    [sortOrder, sortBy]
  );

  const sortedData = data.slice().sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (sortOrder === "asc") {
      return (aValue as string).localeCompare(bValue as string);
    } else {
      return (bValue as string).localeCompare(aValue as string);
    }
  });

  return (
    <div className="flex flex-col flex-grow justify-between overflow-x-auto">
      {/* <div className="flex flex-col md:flex-row justify-between w-full">
        <TableSearch />

        {Btn}
      </div> */}
      {TableTop}
      <table className="w-full table-auto flex-shrink mt-8 md:mt-11">
        <TableHeader
          handleSortandFilter={handleSortandFilter}
          columns={columns}
        />
        <TableRows data={sortedData} columns={columns} action={action} />
      </table>

      <div className="flex-grow" />

      <TablePagination />
    </div>
  );
};

export default Table;
