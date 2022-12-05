import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllEmployeesAction } from "../store/actions/employeeActions";
import { GetAllProjectsAction } from "../store/actions/projectActions";
import { AddTaskAction } from "../store/actions/taskActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AddTask = ({ open, setOpen, classes }) => {
  const employeeData = useSelector((state) => state.employee.employees);
  const projectData = useSelector((state) => state.project.projects);
  const role = useSelector((state) => state.login.role);
  const dispatch = useDispatch();

  const [employees, setEmployees] = useState(employeeData);
  const [projects, setProjects] = useState(projectData);
  const [taskDetails, setTaskDetails] = useState({
    taskName: "",
    employeeId: "",
    projectId: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    { if(role==1){
      dispatch(GetAllEmployeesAction());
    dispatch(GetAllProjectsAction());
    }}
  }, []);

  useEffect(() => {
    setEmployees(employeeData);
    setProjects(projectData);
  }, [employeeData, projectData]);

  const schema = yup
    .object({
      taskName: yup.string().required("Task name Required"),
      projectId: yup.string().required("Project required"),
      employeeId: yup.string().required("Employee Required"),
      priority: yup.string().required("Required"),
      status: yup.string().required("Required"),
    })
    .required("required");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    dispatch(AddTaskAction(taskDetails));
    reset();
    setOpen(false);
  };
  function handleClose() {
    reset();
    setOpen(false);
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={classes.formRoot}
        >
          <div style={{ width: "100%" }}>
            <Typography className={classes.formTitle}>Add Task</Typography>
          </div>
          <FormControl className={classes.inputField}>
            <InputLabel id="project-label">Select Project</InputLabel>
            <Select
              labelId="project-label"
              name="projectId"
              id="select"
              label="Select Project"
              helperText={errors.projectId && errors.projectId.message}
              error={errors.projectId && errors.projectId.message}
              {...register("projectId")}
              onChange={(e) => {
                setTaskDetails({
                  ...taskDetails,
                  [e.target.name]: e.target.value,
                });
              }}
            >
              {projects.map((project, i) => {
                return (
                  <MenuItem key={i} value={project._id}>
                    {project.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            label="Enter Task Name"
            name="taskName"
            autoComplete="name"
            autoFocus
            className={classes.inputField}
            helperText={errors.taskName && errors.taskName.message}
            error={errors.taskName && errors.taskName.message}
            {...register("taskName")}
            onChange={(e) => {
              setTaskDetails({
                ...taskDetails,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <FormControl className={classes.inputField}>
            <InputLabel id="employee-label">Select Employee</InputLabel>
            <Select
              labelId="employee-label"
              name="employeeId"
              id="select"
              label="Select Employee"
              helperText={errors.employeeId && errors.employeeId.message}
              error={errors.employeeId && errors.employeeId.message}
              {...register("employeeId")}
              onChange={(e) => {
                setTaskDetails({
                  ...taskDetails,
                  [e.target.name]: e.target.value,
                });
              }}
            >
              {employees.map((employee, i) => {
                return (
                  <MenuItem key={i} value={employee._id}>
                    {employee.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2}>
            <FormControl className={classes.inputSelect}>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="select"
                name="priority"
                label="Priority"
                helperText={errors.priority && errors.priority.message}
                error={errors.priority && errors.priority.message}
                {...register("priority")}
                onChange={(e) => {
                  setTaskDetails({
                    ...taskDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.inputSelect}>
              <InputLabel size="large" id="status-label">
                Status
              </InputLabel>
              <Select
                labelId="status-label"
                id="select"
                name="status"
                label="Status"
                helperText={errors.status && errors.status.message}
                error={errors.status && errors.status.message}
                {...register("status")}
                onChange={(e) => {
                  setTaskDetails({
                    ...taskDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <div>
            <Button
              sx={{ color: "#FF6161", border: "#FF6767" }}
              className={classes.formButton}
              onClick={() => setOpen(false)}
            >
              CANCEL
            </Button>
            <Button
              sx={{ color: "#3525B5", border: "#FF6767" }}
              type="submit"
              className={classes.formButton}
            >
              SAVE
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddTask;
