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
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import {
  DeleteProjectAction,
} from "../store/actions/projectActions";
import ConfirmDelete from "../components/ConfirmDelete";
import moment from "moment";
import SelectDateModal from "../components/SelectDateModal";
import AddTimesheet from "../components/AddTimesheet";
import UpdateTimesheet from "../components/UpdateTimesheet";
import { GetAllTimesheetAction } from "../store/actions/timesheetActions";

function Projects() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.project.loading);
  const items = useSelector((state) => state.timesheet.timesheet);

  const [rows, setRows] = useState(items);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateRow, setUpdateRow] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [active, setActive] = useState("today");

  useEffect(() => {
    dispatch(GetAllTimesheetAction());
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
  const todayTasks = () => {
    setActive("today");
  };
  const yesterdayTasks = () => {
    setActive("yesterday");
  };
  const customTasks = () => {
    setActive("custom");
    setDateModal(true);
  };

  return (
    <div className={classes.pageRoot}>
      <AddTimesheet
        open={open}
        setOpen={setOpen}
        rows={rows}
        classes={classes}
      />
      <UpdateTimesheet
        open={updateModal}
        setOpen={setUpdateModal}
        row={updateRow}
        rows={rows}
        classes={classes}
      />
      <ConfirmDelete
        open={deleteModal}
        setOpen={setDeleteModal}
        row={updateRow}
        onConfirm={() => dispatch(DeleteProjectAction(updateRow._id))}
        classes={classes}
      />
      <SelectDateModal
        open={dateModal}
        setOpen={setDateModal}
        classes={classes}
      />
      <TableContainer component={Paper} className={classes.tableContainer}>
        <div className={classes.titleContainer}>
          <div>
            <button
              className={
                active === "today"
                  ? classes.activeButton
                  : classes.tablesheetButtons
              }
              onClick={() => todayTasks()}
            >
              TODAY
            </button>
            <button
              className={
                active === "yesterday"
                  ? classes.activeButton
                  : classes.tablesheetButtons
              }
              onClick={() => yesterdayTasks()}
            >
              YESTERDAY
            </button>
            <button
              className={
                active === "custom"
                  ? classes.activeButton
                  : classes.tablesheetButtons
              }
              onClick={() => customTasks()}
            >
              CUSTOM
            </button>
          </div>
          <Button className={classes.addButton} onClick={() => setOpen(true)}>
            {<ControlPointIcon fontSize="small" sx={{ mr: "2px" }} />}
            Add Timesheet
          </Button>
        </div>
        <Table className={classes.table} aria-label="caption table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="left" className={classes.tableCell}>
                Project
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                Task
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                Date
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                Time
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                Note
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <TableCell colSpan={7}>
              <Loading />
            </TableCell>
          ) : (
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => (
                  <TableRow key={row._id}>
                    <TableCell align="left">{row.projectName}</TableCell>
                    <TableCell align="left">{row.taskName}</TableCell>
                    <TableCell align="left">
                      {moment(`${row.created_date}`).format("Do MMMM YYYY")}
                    </TableCell>
                    <TableCell align="left">
                      {row.timeOnTask}
                    </TableCell>
                    <TableCell align="left">No Notes found</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit"
                        style={{ color: "#3525B5" }}
                        onClick={() => editData(row)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        style={{ color: "#FF6161" }}
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
export default Projects;
