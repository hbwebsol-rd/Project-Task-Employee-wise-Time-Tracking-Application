import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { TablePagination } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStyles } from "../views/view-css";
import AddEmployee from "../components/AddEmployee";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import UpdateEmployee from "../components/UpdateEmployee";
import {
  GetAllEmployeesAction,
  DeleteEmployeeAction,
} from "../store/actions/employeeActions";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmDelete from "../components/ConfirmDelete";

function Employee() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.employee.employees);
  const loading = useSelector((state) => state.employee.loading);

  const [rows, setRows] = useState(items);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateRow, setUpdateRow] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(() => {
    dispatch(GetAllEmployeesAction());
  }, []);

  useEffect(() => {
    setRows(items);
  }, [items]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleDeleteConfirm = (row) => {
    setDeleteModal(true);
    setUpdateRow(row);
  };

  const editData = (row) => {
    setUpdateRow(row);
    setUpdateModal(true);
  };

  return (
    <div className={classes.pageRoot}>
      <AddEmployee open={open} setOpen={setOpen} classes={classes} />
      <UpdateEmployee
        open={updateModal}
        setOpen={setUpdateModal}
        row={updateRow}
        classes={classes}
      />
      <ConfirmDelete
        open={deleteModal}
        setOpen={setDeleteModal}
        classes={classes}
        onConfirm={() => dispatch(DeleteEmployeeAction(updateRow._id))}
      />
      <TableContainer component={Paper} className={classes.tableContainer}>
        <div className={classes.titleContainer}>
          <TextField
            id="standard-basic"
            placeholder="Search"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button className={classes.addButton} onClick={() => setOpen(true)}>
            {<ControlPointIcon fontSize="small" sx={{ mr: "5px" }} />}
            Add Employee
          </Button>
        </div>
        <Table aria-label="caption table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="left" className={classes.tableCell}>
                Id
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                Name
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                Designation
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                Email
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <TableCell colSpan={5}>
              <Loading />
            </TableCell>
          ) : (
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => (
                  <TableRow key={row._id}>
                    <TableCell align="left">{i + 1}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.designation}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="edit"
                        style={{ color: "#3525B5" }}
                        onClick={() => editData(row)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        style={{ color: "Red" }}
                        onClick={() => handleDeleteConfirm(row)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
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
export default Employee;
