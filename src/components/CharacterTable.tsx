import React from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import './CharacterTable.css';

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
};
interface Props {
  data: Character[];
  onRowClick: (id: number) => void;
}

export const CharacterTable: React.FC<Props> = ({ data, onRowClick }) => {
  const columns: ColumnDef<Character>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "species", header: "Species" },
    { accessorKey: "gender", header: "Gender" },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">
    <table className="character-table">
      <thead>
        {table.getHeaderGroups().map((group) => (
          <tr key={group.id}>
            {group.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} onClick={() => onRowClick(row.original.id)}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}   style={{cursor:"pointer"}}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};
