import React from "react";

export interface TableColumn<T> {
  key: keyof T | string;
  title: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
}

function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyText = "Không có dữ liệu",
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400">
              {columns.map((col, index) => (
                <th key={index} className="px-5 py-3.5 text-left">
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {loading && (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center">
                  <div className="flex items-center justify-center gap-3 text-gray-400">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    Đang tải dữ liệu...
                  </div>
                </td>
              </tr>
            )}

            {!loading && data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-gray-400 text-sm">
                  {emptyText}
                </td>
              </tr>
            )}

            {!loading &&
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50/50 transition-colors">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-5 py-4 text-sm text-gray-600">
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
