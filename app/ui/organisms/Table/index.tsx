import { TableProps } from "@/app/lib/types/components";
import TableHeader from "./TableHeader";
import TableRows from "./TableRow";
import TablePagination from "./TablePagination";

const Table = <T, K extends keyof T>({ data, columns }: TableProps<T, K>) => {
  return (
    <div className="flex flex-col flex-grow justify-between overflow-x-auto">
      <table className="w-full table-auto flex-shrink">
        <TableHeader columns={columns} />
        <TableRows data={data} columns={columns} />
      </table>

      <TablePagination />
    </div>
  );
};

export default Table;
