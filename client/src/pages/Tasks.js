import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Button, IconButton, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from "../views/view-css";
import AddTask from "../components/AddTask";
import TaskPopUp from "../components/TaskPopUp";
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const createData = (projectId, projectName, taskId, taskName, userName, status, priority, timeOnTask) => ({
    id: projectId,
    projectName,
    taskId,
    taskName,
    userName,
    status,
    priority,
    timeOnTask,
    isEditMode: false
});

const StatusType = ({ row, name }) => {
    if (row[name] === 'Completed') {
        return <Typography sx={{ width: '110px', py: '2px', frontSize: '2px', backgroundColor: '#67EA52', color: '#ffffff', textAlign: 'center', borderRadius: '10px' }}>Completed</Typography>
    }
    if (row[name] === 'Pending') {
        return <Typography sx={{ width: '110px', py: '2px', frontSize: '2px', backgroundColor: '#FF6767', color: '#ffffff', textAlign: 'center', borderRadius: '10px' }}>Pending</Typography>
    }
    if (row[name] === 'In Progress') {
        return <Typography sx={{ width: '110px', py: '2px', frontSize: '2px', backgroundColor: '#FF9E67', color: '#ffffff', textAlign: 'center', borderRadius: '10px' }}>In Progress</Typography>
    }
    return <Typography>{row[name]}</Typography>
}

const CustomTableCell = ({ row, name, onChange }) => {
    const { isEditMode } = row;
    return (
        <TableCell align="left" >
            {isEditMode ? (
                <>
                    {
                        name === 'id' ? row[name] : <Input
                            value={row[name]}
                            name={name}
                            onChange={e => onChange(e, row)}

                        />
                    }
                </>
            ) : (
                <>
                    {name !== "status" ? row[name] : <StatusType row={row} name={name} />}
                </>
            )}
        </TableCell>
    );
};

function Tasks() {
    const classes = useStyles();
    const [rows, setRows] = useState([
        createData(101, 'Project 1', 1001, 'Header', 'Saurabh', 'Completed', 'Low', 3),
        createData(102, 'Project 2', 1002, 'Body', 'Taha', 'In Progress', 'Low', 5),
        createData(103, 'Project 3', 1003, 'Form', 'Moiz', 'Pending', 'Medium', 6.0),
        createData(104, 'Project 4', 1004, 'Register', 'SSKY', 'Completed', 'High', 4.3),
        createData(105, 'Project 5', 1005, 'Deploy', 'Rahul', 'In Progress', 'High', 3.9),
    ]);
    const [previous, setPrevious] = React.useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [pop, setPop] = useState(false);

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
            <AddTask open={open} setOpen={setOpen} classes={classes} />
            <TaskPopUp pop={pop} setPop={setPop} classes={classes} />
            <TableContainer component={Paper} className={classes.tableContainer} >
                <div className={classes.titleContainer}>
                    <TextField id="standard-basic" label="Search Task" variant="outlined" size='small' />
                    <Button className={classes.addButton} onClick={() => setOpen(true)}>{<ControlPointIcon fontSize='small' sx={{ mr: '10px' }} />} Add TASK</Button>
                </div>
                <Table aria-label="caption table" className={classes.table}>
                    <TableHead style={{ backgroundColor: '#F5F3FF' }}>
                        <TableRow>
                            <TableCell align="left" className={classes.tableCell}>PROJECT ID</TableCell>
                            <TableCell align="left" className={classes.tableCell}>PROJECT NAME</TableCell>
                            <TableCell align="left" className={classes.tableCell}>TASK ID</TableCell>
                            <TableCell align="left" className={classes.tableCell}>TASK NAME</TableCell>
                            <TableCell align="left" className={classes.tableCell}>CUSTOMER NAME</TableCell>
                            <TableCell align="left" className={classes.tableCell}>STATUS</TableCell>
                            <TableCell align="left" className={classes.tableCell}>PRIORITY</TableCell>
                            <TableCell align="left" className={classes.tableCell}>TIME ON TASK</TableCell>
                            <TableCell align="left" className={classes.tableCell}>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => (
                                <TableRow key={row.id}>
                                    <CustomTableCell {...{ row, name: "id", onChange }} />
                                    <CustomTableCell {...{ row, name: "projectName", onChange }} />
                                    <CustomTableCell {...{ row, name: "taskId", onChange }} />
                                    <CustomTableCell {...{ row, name: "taskName", onChange }} />
                                    <CustomTableCell {...{ row, name: "userName", onChange }} />
                                    <CustomTableCell {...{ row, name: "status", onChange }} />
                                    <CustomTableCell {...{ row, name: "priority", onChange }} />
                                    <CustomTableCell {...{ row, name: "timeOnTask", onChange }} />
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
                                            style={{ color: 'Red' }}
                                            onClick={() => handleDelete(i)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="view"
                                            style={{ color: '#67D1FF' }}
                                            onClick={() => setPop(true)}
                                        >
                                            <PlagiarismIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
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
export default Tasks