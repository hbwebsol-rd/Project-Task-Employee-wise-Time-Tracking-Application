import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from "../views/view-css";
import AddClient from "../components/AddClient";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useDispatch, useSelector } from "react-redux";
import { DeleteData } from "../utils/fetch-sevice";
import Loading from "../components/Loading";
import UpdateClient from "../components/UpdateClient";
import { GetFetch } from "../store/actions/clientActions";


function Client() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const items = useSelector(state => state.client.clients)
    const loading = useSelector(state => state.loading)

    const [rows, setRows] = useState(items);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [updateModal, setUpdateModal] = useState(false)
    const [updateRow, setUpdateRow] = useState({})

    useEffect(() => {
        console.log('client', items)
        dispatch(GetFetch('customer'));
      }, [])

    const handleChangePage = (event,newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    }

    const handleDelete = (index, id) => {
        const list = [...rows];
        list.splice(index, 1);
        setRows(list);
        dispatch(DeleteData(`customer/${id}`))
    };

    const editData = (row) => {
        setUpdateRow(row);
        setUpdateModal(true)
    }

    return (
        <div className={classes.pageRoot}>
            <AddClient open={open} setOpen={setOpen} classes={classes} />
            <UpdateClient open={updateModal} setOpen={setUpdateModal} row={updateRow} classes={classes} />
            <TableContainer component={Paper} className={classes.tableContainer}>
                <div className={classes.titleContainer}>
                    <TextField id="standard-basic" label="Search Client" variant="outlined" size='small' />
                    <Button className={classes.addButton} onClick={() => setOpen(true)}>
                        {<ControlPointIcon fontSize='small' sx={{ mr: '5px' }} />}
                        Add Client
                    </Button>
                </div>
                <Table aria-label="caption table">
                    <TableHead style={{ backgroundColor: '#F5F3FF' }}>
                        <TableRow>
                            <TableCell align="left" className={classes.tableCell} >ID</TableCell>
                            <TableCell align="left" className={classes.tableCell}>NAME</TableCell>
                            <TableCell align="left" className={classes.tableCell}>EMAIL</TableCell>
                            <TableCell align="left" className={classes.tableCell}>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    {loading ? <Loading /> :
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => (
                                    <>
                                        <TableRow key={row._id}>
                                            <TableCell align="left" >{row._id}</TableCell>
                                            <TableCell align="left" >{row.name}</TableCell>
                                            <TableCell align="left" >{row.email}</TableCell>
                                            <TableCell >
                                                <IconButton
                                                    aria-label="edit"
                                                    style={{ color: '#3525B5' }}
                                                    onClick={() => editData(row)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="delete"
                                                    style={{ color: 'Red' }}
                                                    onClick={() => handleDelete(i, row._id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))}
                        </TableBody>}
                </Table>
                <TablePagination
                    rowsPerPageOptions={[2, 5, 10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
}
export default Client