'use client'

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@nextui-org/react";

const columns = [
  {
    key: "evento",
    label: "Evento",
  },
  {
    key: "options",
    label: "",
  },
];

export default function App() {

  const [page, setPage] = useState(1);
  const rowsPerPage = 15;


  const [cis, setCIS] = useState([])
  const pages = Math.ceil(cis.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return cis.slice(start, end);
  }, [page, cis]);

  useEffect(() => {
    const getCI = async () => {
      const response = await axios.get('api/contrainteligencia')
      setCIS(response.data)
    }
    getCI()
  }, [])

  return (

    <Table isStriped
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            // color='secondary'
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) =>
              <TableCell className="text-xs">{getKeyValue(item, columnKey)}</TableCell>
            }
          </TableRow>
        )}
      </TableBody>
    </ Table>
  );
}
