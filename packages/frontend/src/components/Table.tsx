interface TableProps {
  columns: string[];
  rows?: React.ReactNode[][];
}

export default function Table({ columns, rows }: TableProps) {
  return (
    <table className="w-full border border-border">
      <thead>
        <tr className="text-main">
          {columns.map((column, i) => (
            <th key={i} className="border border-border p-2">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row, i) => (
          <tr key={i}>
            {row.map((value, j) => (
              <td key={j} className="border border-border p-2">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
