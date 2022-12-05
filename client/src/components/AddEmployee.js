import { Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AddEmployeeAction } from "../store/actions/employeeActions";

const AddEmployee = ({ open, setOpen, classes }) => {
  const [employeeDetails, setEmployeeDetails] = useState({
    designation: "",
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const schema = yup
    .object({
      name: yup.string().required("Name Required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email required"),
      designation: yup.string().required("Designation Required"),
      password: yup.string().required("Password Required").min(8, "Password length should be at least 8 characters"),
    })
    .required("required");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    dispatch(AddEmployeeAction(employeeDetails));
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
            <Typography className={classes.formTitle}>Add Employee</Typography>
          </div>
          <TextField
            margin="normal"
            required
            label="Enter Employee Name"
            name="name"
            autoComplete="name"
            helperText={errors.name && errors.name.message}
            error={errors.name && errors.name.message}
            {...register("name")}
            autoFocus
            className={classes.inputField}
            onChange={(e) => {
              setEmployeeDetails({
                ...employeeDetails,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <TextField
            margin="normal"
            required
            label="Enter Employee Email"
            name="email"
            autoComplete="email"
            helperText={errors.email && errors.email.message}
            error={errors.email && errors.email.message}
            {...register("email")}
            autoFocus
            className={classes.inputField}
            onChange={(e) => {
              setEmployeeDetails({
                ...employeeDetails,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <TextField
            margin="normal"
            required
            label="Enter Employee Designation"
            name="designation"
            autoComplete="name"
            helperText={errors.designation && errors.designation.message}
            error={errors.designation && errors.designation.message}
            {...register("designation")}
            autoFocus
            onChange={(e) => {
              setEmployeeDetails({
                ...employeeDetails,
                [e.target.name]: e.target.value,
              });
            }}
            className={classes.inputField}
          />
          <TextField
            margin="normal"
            required
            label="Enter Password"
            name="password"
            type="password"
            autoComplete="password"
            helperText={errors.password && errors.password.message}
            error={errors.password && errors.password.message}
            {...register("password")}
            autoFocus
            onChange={(e) => {
              setEmployeeDetails({
                ...employeeDetails,
                [e.target.name]: e.target.value,
              });
            }}
            className={classes.inputField}
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

export default AddEmployee;
