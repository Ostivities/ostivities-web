"use client";

import { usePathname, useRouter } from "next/navigation";

import { TableProps } from "@/app/lib/types/components";

import { useCallback } from "react";
import Button from "@/app/ui/atoms/Button";
import { cn } from "@/app/lib/utils";

const TableRows = <T, K extends keyof T>({
  data,
  columns,
  action,
}: TableProps<T, K> & { action?: "view" | "download" }): JSX.Element => {
  const columnData = [
    ...columns,
    { action: "" } as unknown as (typeof columns)[number],
  ];
  const router = useRouter();
  const pathname = usePathname();

  const navigateToPage = useCallback(
    (id: string | number) => router.push(pathname + "/" + id),
    [pathname, router]
  );

  const rows = data?.map((row, index) => {
    return (
      <tr key={`row-${index}`}>
        {columnData?.map((column, rowIndex) => {
          return (
            <td
              key={`cell-${rowIndex}`}
              className={cn(
                "py-4 pl-7 font-normal whitespace-nowrap text-OWANBE_TABLE_CELL"
              )}
            >
              {row[column.key] as string}
              {columnData.length - 1 === rowIndex ? (
                action === "view" ? (
                  <Button
                    label="View"
                    size="sm"
                    onClick={() => navigateToPage(index)}
                  />
                ) : (
                  <Button
                    label="Download"
                    size="sm"
                    variant="outline"
                    onClick={() => console.log(index)}
                  />
                )
              ) : null}
            </td>
          );
        })}
      </tr>
    );
  });

  return <tbody className="border-separate border-spacing-y-8">{rows}</tbody>;
};

export default TableRows;
