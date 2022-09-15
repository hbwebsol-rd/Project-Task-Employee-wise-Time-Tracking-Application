import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { FormControl, IconButton, Input, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from "../views/view-css";
import AddEmployee from "../components/AddEmployee";
import { TablePagination } from "@material-ui/core";

const createData = (id, project, task, date, time) => ({
    id,
    project,
    task,
    date,
    time,
    isEditMode: false
});

const CustomTableCell = ({ row, name, onChange }) => {
    const { isEditMode } = row;
    return (
        <TableCell align="left" >
            {isEditMode ? (
                <Input
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}

                />
            ) : (
                row[name]
            )}
        </TableCell>
    );
};

function Employee() {
    const classes = useStyles();
    const [rows, setRows] = useState([
        createData(' 101', 'Project 1', 'Task 1', '15 Aug', '8 Hr'),
        createData(' 102', 'Project 2', 'Task 2', '16 Aug', '8 Hr'),
        createData(' 103', 'Project 3', 'Task 3', '17 Aug', '8 Hr'),
        createData(' 104', 'Project 4', 'Task 4', '18 Aug', '8 Hr'),
        createData(' 105', 'Project 5', 'Task 5', '22 Aug', '8 Hr'),
    ]);
    const [previous, setPrevious] = React.useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [employee, setEmployee] = useState();
    const [date, setDate] = useState();

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    }

    const onToggleEditMode = id => {
        setRows(() => {
            return rows.map(row => {
                if (row.id === id) {
                    return { ...row, isEditMode: !row.isEditMode };
                }
                return row;
            });
        });
    };

    const onChange = (e, row) => {
        if (!previous[row.id]) {
            setPrevious(state => ({ ...state, [row.id]: row }));
        }
        const value = e.target.value;
        const name = e.target.name;
        const { id } = row;
        const newRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setRows(newRows);
    };

    const handleDelete = index => {
        const list = [...rows];
        list.splice(index, 1);
        setRows(list);
    };

    return (
        <div className={classes.pageRoot}>
            <AddEmployee open={open} setOpen={setOpen} classes={classes} />
            <TableContainer component={Paper} className={classes.tableContainer}>
                <div className={classes.titleContainer}>
                    <FormControl sx={{width:'12rem '}}>
                        <InputLabel size='small' id="status-label" className={classes.tableButton}>Select Employee</InputLabel>
                        <Select
                            labelId="status-label"
                            id="select"
                            label="select employee"
                            size='small'
                            onChange={(e)=> setEmployee(e.target.value)}
                            className={classes.tableButton}
                        >
                            <MenuItem value='Saurabh '>Saurabh</MenuItem>
                            <MenuItem value='Moiz'>Moiz</MenuItem>
                            <MenuItem value='Taha'>Taha</MenuItem>
                        </Select>
                    </FormControl>
                    <div>
                        <TextField
                            id="date"
                            type='date'
                            label="Date From"
                            variant="outlined"
                            size='small'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ mr: '10px' }}
                            onChange={(e)=> setDate(e.target.value)}
                            className={classes.tableButton}
                        />
                        <TextField
                            id="date"
                            type='date'
                            label="Date To"
                            variant="outlined"
                            size='small'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.tableButton}
                        />
                    </div>
                </div>
                <div className={classes.tableHeadContainer}>
                    <Typography className={classes.tableCell}>Employee Name :  {employee}</Typography>
                    <Typography className={classes.tableCell}>Date :  {date}</Typography>
                    <Typography className={classes.tableCell}>Total Spent Time :</Typography>
                </div>
                <Table aria-label="caption table">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell align="left" className={classes.tableCell} >Id</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Project</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Task</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Date</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Spent Time</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => (
                                <TableRow key={row.id}>
                                    <CustomTableCell {...{ row, name: "id", onChange }} />
                                    <CustomTableCell {...{ row, name: "project", onChange }} />
                                    <CustomTableCell {...{ row, name: "task", onChange }} />
                                    <CustomTableCell {...{ row, name: "date", onChange }} />
                                    <CustomTableCell {...{ row, name: "time", onChange }} />
                                    <TableCell >
                                        <IconButton
                                            aria-label="edit"
                                            style={{ color: '#3525B5' }}
                                            onClick={() => onToggleEditMode(row.id)}
                                        >
                                            {row.isEditMode ? <DoneAllIcon sx={{ color: 'Green' }} /> : <EditIcon />}
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            style={{ color: '#FF6161' }}
                                            onClick={() => handleDelete(i)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[2, 3, 5]}
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
export default Employee