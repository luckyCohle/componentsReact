import { useState, useEffect } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  sortable?: boolean;
  sortKey?: keyof T;
  onRowSelect?: (selectedRows: T[]) => void;
  rowSortable?: boolean;
}

function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  sortable = false,
  sortKey,
  onRowSelect,
  rowSortable = false,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortingKey, setSortingKey] = useState<keyof T | undefined>(sortKey);
  const [displayData, setDisplayData] = useState<T[]>(data);

  // Reset displayData when incoming data changes
  useEffect(() => {
    setDisplayData(data);
  }, [data]);

  const handleRowSelect = (row: T) => {
    let updated: T[];
    if (selectedRows.includes(row)) {
      updated = selectedRows.filter((r) => r !== row);
    } else {
      updated = [...selectedRows, row];
    }
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  const handleColumnSort = (key: keyof T) => {
    if (!sortable) return;
    setSortingKey(key);
    const sorted = [...displayData].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (aVal === bVal) return 0;
      if (aVal == null) return -1;
      if (bVal == null) return 1;
      return (aVal as any) > (bVal as any) ? 1 : -1;
    });
    setDisplayData(sorted);
  };

  const handleRowShift = (dir: "up" | "down", curIdx: number) => {
    if (
      (dir === "up" && curIdx === 0) ||
      (dir === "down" && curIdx === displayData.length - 1)
    ){
      return;
    }
    const dataArray = [...displayData];
    const el = dataArray[curIdx];
    dataArray.splice(curIdx, 1);
    dataArray.splice(dir === "up" ? curIdx - 1 : curIdx + 1, 0, el);
    setDisplayData(dataArray);
  };

  if (loading) return <p>Loading...</p>;
  if (data.length === 0) return <p>No data available</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border rounded-xl border-gray-300">
        <thead>
          <tr>
            {selectable && (
              <th className="border px-3 py-2 text-center">Select</th>
            )}
            {rowSortable && (
              <th className="border px-3 py-2 text-center">Manual Sort</th>
            )}
            {columns.map((column, index) => (
              <th
                key={index}
                onClick={() => handleColumnSort(column.key)}
                className="border px-3 py-2 cursor-pointer text-center"
              >
                {column.header}
                {sortable && column.sortable && sortingKey === column.key && (
                  <FaArrowCircleDown className="inline ml-1" />
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {displayData.map((item, rowIndex) => (
            <tr key={item["id"] ?? rowIndex} className="hover:bg-gray-50">
              {selectable && (
                <td className="border px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item)}
                    onChange={() => handleRowSelect(item)}
                  />
                </td>
              )}
              {rowSortable && (
                <td className="border px-3 py-2 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <IoIosArrowDropupCircle
                      onClick={() => handleRowShift("up", rowIndex)}
                      className="cursor-pointer"
                    />
                    <IoIosArrowDropdownCircle
                      onClick={() => handleRowShift("down", rowIndex)}
                      className="cursor-pointer"
                    />
                  </div>
                </td>
              )}
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="border px-3 py-2 text-center">
                  {String(item[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
