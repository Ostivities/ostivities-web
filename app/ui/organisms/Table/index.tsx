import { TableProps } from "@/app/lib/types/components";
import TableHeader from "./TableHeader";
import TableRows from "./TableRow";

const Table = <T, K extends keyof T>({ data, columns }: TableProps<T, K>) => {
  return (
    <div className="min-h-[27rem] flex-grow">
      <table className="w-full table-auto overflow-x-auto">
        <TableHeader columns={columns} />
        <TableRows data={data} columns={columns} />
      </table>
    </div>
  );
};

export default Table;
