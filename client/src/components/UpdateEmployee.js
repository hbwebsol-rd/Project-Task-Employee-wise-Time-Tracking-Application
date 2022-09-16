import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateEmployeeAction } from "../store/actions/employeeActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UpdateEmployee = ({ open, setOpen, row, classes }) => {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee);

  const schema = yup
    .object({
      name: yup.string().required("Name Required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email required"),
      designation: yup.string().required("Designation Required"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    dispatch(UpdateEmployeeAction(row._id, employeeDetails));
    setOpen(false);
  };

  function handleClose() {
    reset();
    setOpen(false);
  }

  useEffect(() => {
    if (employee.updated) {
      setOpen(false);
    }
  }, [employee.updated]);

  useEffect(() => {
    setEmployeeDetails({
      designation: row.designation,
      name: row.name,
      email: row.email,
    });
  }, [row]);
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
            <Typography className={classes.formTitle}>
              Update Employee
            </Typography>
          </div>
          <TextField
            margin="normal"
            required
            label="Employee Name"
            name="name"
            autoComplete="name"
            value={employeeDetails.name}
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
            label="Employee Email"
            name="email"
            value={employeeDetails.email}
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
            label="Employee Designation"
            name="designation"
            value={employeeDetails.designation}
            autoComplete="designation"
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

export default UpdateEmployee;
