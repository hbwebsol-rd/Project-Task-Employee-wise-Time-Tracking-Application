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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AddProjectAction } from "../store/actions/projectActions";

const AddTimesheet = ({ open, setOpen, rows, classes }) => {
  const dispatch = useDispatch();
  const [timesheetDetails, setTimesheetDetails] = useState({
    name: "",
    customerId: "",
    technology: "",
    start: "",
    end: "",
  });
  const schema = yup
    .object({
      name: yup.string().required("Name Required"),
      technology: yup.string().required("Technology required"),
      customerId: yup.string().required("Client Required"),
      start: yup.string().required("Date Required"),
      end: yup.string().required("Date Required"),
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
    dispatch(AddProjectAction(timesheetDetails));
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
            <Typography className={classes.formTitle}>Add Timesheet</Typography>
          </div>
          <TextField
            margin="normal"
            required
            label="Enter Project Name"
            name="name"
            autoComplete="name"
            autoFocus
            className={classes.inputField}
            helperText={errors.name && errors.name.message}
            error={errors.name && errors.name.message}
            {...register("name")}
            onChange={(e) => {
              setTimesheetDetails({
                ...timesheetDetails,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <TextField
            margin="normal"
            required
            name="taskName"
            label="Enter Task Name"
            autoComplete="name"
            autoFocus
            className={classes.inputField}
            helperText={errors.technology && errors.technology.message}
            error={errors.technology && errors.technology.message}
            {...register("technology")}
            onChange={(e) => {
              setTimesheetDetails({
                ...timesheetDetails,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <TextField
            id="date"
            type="date"
            name="date"
            label="Date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.inputField}
            helperText={errors.date && errors.date.message}
            error={errors.date && errors.date.message}
            {...register("date")}
            onChange={(e) => {
              setTimesheetDetails({
                ...timesheetDetails,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <Stack direction="row" spacing={2}>
          <TextField
              type="time"
              name="start"
              label="From"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.inputSelect}
              helperText={errors.start && errors.start.message}
              error={errors.start && errors.start.message}
              {...register("start")}
              onChange={(e) => {
                setTimesheetDetails({
                  ...timesheetDetails,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <TextField
              type="time"
              name="end"
              label="To"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.inputSelect}
              helperText={errors.end && errors.end.message}
              error={errors.end && errors.end.message}
              {...register("end")}
              onChange={(e) => {
                setTimesheetDetails({
                  ...timesheetDetails,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </Stack>

          <TextField
            margin="normal"
            required
            name="note"
            label="Enter Note"
            autoComplete="name"
            autoFocus
            className={classes.inputField}
            helperText={errors.technology && errors.technology.message}
            error={errors.technology && errors.technology.message}
            {...register("technology")}
            onChange={(e) => {
              setTimesheetDetails({
                ...timesheetDetails,
                [e.target.name]: e.target.value,
              });
            }}
          />
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

export default AddTimesheet;
