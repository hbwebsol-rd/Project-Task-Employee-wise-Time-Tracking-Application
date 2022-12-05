import {
  Button,
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

const SelectDateModal = ({ open, setOpen, classes }) => {
  const dispatch = useDispatch();
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    customerId: "",
    technology: "",
    start: "",
    end: "",
  });
  const schema = yup
    .object({
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
    dispatch(AddProjectAction(projectDetails));
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
            <Typography className={classes.formTitle}>Select Dates</Typography>
          </div>
          <Stack direction="row" spacing={2}>
            <TextField
              id="date"
              type="date"
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
                setProjectDetails({
                  ...projectDetails,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <TextField
              id="date"
              type="date"
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
                setProjectDetails({
                  ...projectDetails,
                  [e.target.name]: e.target.value,
                });
              }}
            />
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
              submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SelectDateModal;
