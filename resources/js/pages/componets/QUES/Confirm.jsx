import * as React from 'react';
import { Grid } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

{/*
function createData(category, title, detail) {
    return { category, title, detail };
}

const rows = [
    createData(storedCategory, storedTiltle, storedDetail)
];

*/}

function Confirm(props) {
    const storedCategory = localStorage.getItem('category')
    const storedTiltle = localStorage.getItem('title')
    const storedDetail = localStorage.getItem('detail')

    return (
        <Grid container>
            <TableContainer component={Paper}>
                <Table aria-label="Customer Input Data">
                    <TableHead>
                        <TableRow>
                            <TableCell>項目</TableCell>
                            <TableCell>入力内容</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            key={storedCategory}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {storedCategory}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">{storedTiltle}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">{storedDetail}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default Confirm