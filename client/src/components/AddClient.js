import { Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddClientAction } from "../store/actions/clientActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AddEmployee = ({ open, setOpen, classes }) => {
  const [clientDetails, setClientDetails] = useState({ name: "", email: "" });
  const dispatch = useDispatch();
  const client = useSelector((state) => state.client);

  const schema = yup
    .object({
      name: yup.string().required("Name Required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email required"),
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
    dispatch(AddClientAction(clientDetails));
    reset();
    setOpen(false);
  };

  function handleClose() {
    reset();
    setOpen(false);
  }

  useEffect(() => {
    if (client.updated) {
      setOpen(false);
    }
  }, [client.updated]);

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
            <Typography className={classes.formTitle}>Add Client</Typography>
          </div>
          <TextField
            margin="normal"
            required
            label="Enter Client Name"
            name="name"
            autoComplete="name"
            helperText={errors.name && errors.name.message}
            error={errors.name && errors.name.message}
            {...register("name")}
            autoFocus
            className={classes.inputField}
            onChange={(e) => {
              setClientDetails({
                ...clientDetails,
                [e.target.name]: e.target.value,
              });
            }}
          />

          <TextField
            margin="normal"
            required
            label="Enter Client Email"
            name="email"
            autoComplete="email"
            helperText={errors.email && errors.email.message}
            error={errors.email && errors.email.message}
            {...register("email")}
            autoFocus
            className={classes.inputField}
            onChange={(e) => {
              setClientDetails({
                ...clientDetails,
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

export default AddEmployee;
