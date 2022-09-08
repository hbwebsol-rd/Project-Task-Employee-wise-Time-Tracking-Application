import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from "../views/view-css";
import AddProject from "../components/AddProject";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useDispatch, useSelector } from "react-redux";
import { DeleteData } from "../utils/fetch-sevice";
import Loading from "../components/Loading";
import { GetFetch } from "../store/actions/projectActions";
import UpdateProject from "../components/UpdateProject";
import SearchIcon from '@mui/icons-material/Search';


function Projects() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.project.loading)
    const items = useSelector(state => state.project.projects)

    const [rows, setRows] = useState(items);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [updateModal, setUpdateModal] = useState(false)
    const [updateRow, setUpdateRow] = useState({})

    useEffect(() => {
        console.log("project", items)
        dispatch(GetFetch('project'));
    }, [])
    useEffect(()=> {
        setRows(items)
    }, [items])

    const handleChangePage = (event, newPage) => {
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
        dispatch(DeleteData(`project/${id}`))
    };

    const editData = (row) => {
        setUpdateRow(row);
        setUpdateModal(true)
    }

    return (
        <div className={classes.pageRoot}>
            <AddProject open={open} setOpen={setOpen} classes={classes} />
            <UpdateProject open={updateModal} setOpen={setUpdateModal} row={updateRow} classes={classes} />
            <TableContainer component={Paper} className={classes.tableContainer}>
                <div className={classes.titleContainer}>
                    <TextField
                        id="standard-basic"
                        placeholder="Search"
                        variant="outlined"
                        size='small'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button className={classes.addButton} onClick={() => setOpen(true)}>
                        {<ControlPointIcon fontSize='small' sx={{ mr: '5px' }} />}
                        Add Project
                    </Button>
                </div>
                <Table aria-label="caption table">
                    <TableHead style={{ backgroundColor: '#F5F3FF', height: '90px' }}>
                        <TableRow>
                            <TableCell align="left" className={classes.tableCell} >Id</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Project Name</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Client Name</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Technology</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Start Date</TableCell>
                            <TableCell align="left" className={classes.tableCell}>End Date</TableCell>
                            <TableCell align="center" className={classes.tableCell}>Action</TableCell>
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
                                            <TableCell align="left" >{row.customerName}</TableCell>
                                            <TableCell align="left" >{row.technology}</TableCell>
                                            <TableCell align="left" >{row.start}</TableCell>
                                            <TableCell align="left" >{row.end}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    aria-label="edit"
                                                    style={{ color: '#3525B5' }}
                                                    onClick={() => editData(row)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="delete"
                                                    style={{ color: '#FF6161' }}
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
export default Projects