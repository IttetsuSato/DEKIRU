import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';

function createData(id, name, rank, business, value, sex, number) {
  return {
    name,
    rank,
    business,
    time : "2022/01/01",
    detail: [
      {
        id, 
        value,
        sex,
        number,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.rank}</TableCell>
        <TableCell align="right">{row.business}</TableCell>
        <TableCell align="right">{row.time}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                詳細
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">評価</TableCell>
                    <TableCell align="right">性別</TableCell>
                    <TableCell align="right">対応回数</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.detail.map((detailRow) => (
                    <TableRow key={detailRow.id}>
                      <TableCell component="th" scope="row" align="right">
                        {detailRow.value}
                      </TableCell>
                      <TableCell align="right">{detailRow.sex}</TableCell>
                      <TableCell align="right">{detailRow.number}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
//(name, rank, business, value, sex)
// history: PropTypes.arrayOf(
//   PropTypes.shape({
//     amount: PropTypes.number.isRequired,
//     customerId: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired,
//   }),
// ).isRequired,
Row.propTypes = {
  row: PropTypes.shape({
    rank: PropTypes.string.isRequired,
    business: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};
//(name, rank, business, value, sex)
const rows = [
  createData(1, 'あみ', 'ゴールド', '医者', 4.5, '女','100'),
  createData(2,'のりゆき', 'シルバー', '介護', 3.7, '男','50'),
  createData(3, 'ななし','ブロンズ','介護', 4.0, 'その他', '70'),
];

export default function QuestionAnsUser() {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="right">回答できる人</TableCell>
            <TableCell align="right">名前</TableCell>
            <TableCell align="right">ランク</TableCell>
            <TableCell align="right">職業&nbsp;</TableCell>
            <TableCell align="right">時間&nbsp;</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
