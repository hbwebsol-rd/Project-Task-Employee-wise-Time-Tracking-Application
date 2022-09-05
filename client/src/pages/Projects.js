import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Button, IconButton, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from "../views/view-css";
import AddProject from "../components/AddProject";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const createData = (projectId, projectName, userName, startDate, endDate) => ({
    id: projectId,
    projectName,
    userName,
    startDate,
    endDate,
    isEditMode: false
});

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
                row[name]
            )}
        </TableCell>
    );
};

function Projects() {
    const classes = useStyles();
    const [rows, setRows] = useState([
        createData(101, 'Project 1', 'Saurabh', '5th Jan', '28 Feb'),
        createData(102, 'Project 2', 'Taha', '25th Jan', '30th March'),
        createData(103, 'Project 3', 'Moiz', '14th Dec', '10th August'),
        createData(104, 'Project 4', 'SSKY', '10th June', 'Ongoing'),
        createData(105, 'Project 5', 'Rahul', '11th August', 'Ongoing'),
    ]);
    const [previous, setPrevious] = React.useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);

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
            <AddProject open={open} setOpen={setOpen} classes={classes} />
            <TableContainer component={Paper} className={classes.tableContainer}>
                <div className={classes.titleContainer}>
                    <TextField id="standard-basic" label="Search Project" variant="outlined" size='small' />
                    <Button className={classes.addButton} onClick={() => setOpen(true)}>{<ControlPointIcon fontSize='small' sx={{ mr: '10px' }} />}Add Project</Button>
                </div>
                <Table aria-label="caption table">
                    <TableHead style={{ backgroundColor: '#F5F3FF' }}>
                        <TableRow>
                            <TableCell align="left" className={classes.tableCell}>ID</TableCell>
                            <TableCell align="left" className={classes.tableCell}>NAME</TableCell>
                            <TableCell align="left" className={classes.tableCell}>CUSTOMER NAME</TableCell>
                            <TableCell align="left" className={classes.tableCell}>START DATE</TableCell>
                            <TableCell align="left" className={classes.tableCell}>END DATE</TableCell>
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
                                    <CustomTableCell {...{ row, name: "userName", onChange }} />
                                    <CustomTableCell {...{ row, name: "startDate", onChange }} />
                                    <CustomTableCell {...{ row, name: "endDate", onChange }} />
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
export default Projects