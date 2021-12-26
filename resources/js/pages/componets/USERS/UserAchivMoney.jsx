import React, { useState, useEffect, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';


const columns = [
  { id: 'Name', label: '名前', minWidth: 170 },
  {
    id: 'Date',
    label: '日付',
    minWidth: 170,
    align: 'right',

  },
  {
    id: 'Cash',
    label: 'お金',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(Name, Date, Cash) {
//   const density = population / size;
  return { Name, Date, Cash };
}

const rows = [
  createData('India', '2022-01-12', 3287263),
  createData('China', '2021-12-31', 9596961),
  createData('Italy', '2021-12-11', 301340),
  createData('United States', '2021-11-29', 9833520),
  createData('Canada', '2021-11-29', 9984670),
  createData('Australia', '2021-11-28', 7692024),
  createData('Germany', '2021-11-28', 357578),
  createData('Ireland', '2021-11-28', 70273),
  createData('Mexico', '2021-11-27', 1972550),
  createData('Japan', '2021-11-27', 377973),
  createData('France', '2021-11-26', 640679),
  createData('United Kingdom', '2021-11-25', 242495),
  createData('Russia', '2021-11-24', 17098246),
  createData('Nigeria', '2021-11-24', 923768),
  createData('Brazil', '2021-11-24', 8515767),
];

export default function UserAchivMoney() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getCashFlowData = () => {
    axios
        .get('/api/categories')
        .then(response => {
            setCategories(response.data);
        })
        .catch(() => {
            console.log('通信に失敗しました');
        });
  }
  return (
    <Paper sx={{ width: '50%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
          <TableRow>
              <TableCell align="center" colSpan={5}>
                過去の実績と報酬
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
