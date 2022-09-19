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
import AddProject from "../components/AddProject";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import {
  DeleteProjectAction,
  GetAllProjectsAction,
} from "../store/actions/projectActions";
import UpdateProject from "../components/UpdateProject";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmDelete from "../components/ConfirmDelete";
import moment from "moment";

function Projects() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.project.loading);
  const items = useSelector((state) => state.project.projects);

  const [rows, setRows] = useState(items);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateRow, setUpdateRow] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(GetAllProjectsAction());
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
      <AddProject open={open} setOpen={setOpen} classes={classes} />
      <UpdateProject
        open={updateModal}
        setOpen={setUpdateModal}
        row={updateRow}
        classes={classes}
      />
      <ConfirmDelete
        open={deleteModal}
        setOpen={setDeleteModal}
        row={updateRow}
        onConfirm={() => dispatch(DeleteProjectAction(updateRow._id))}
        classes={classes}
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
            Add Project
          </Button>
        </div>
        <Table className={classes.table} aria-label="caption table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="left" className={classes.tableCell}>
                Id
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                Project Name
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                Client Name
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                Technology
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                Start Date
              </TableCell>
              <TableCell align="left" className={classes.tableCell}>
                End Date
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
                    <TableCell align="left">{i + 1}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.customerName}</TableCell>
                    <TableCell align="left">{row.technology}</TableCell>
                    <TableCell align="left">
                      {moment(`${row.start}`).format("Do MMMM YYYY")}
                    </TableCell>
                    <TableCell align="left">
                      {moment(`${row.end}`).format("Do MMMM YYYY")}
                    </TableCell>
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
