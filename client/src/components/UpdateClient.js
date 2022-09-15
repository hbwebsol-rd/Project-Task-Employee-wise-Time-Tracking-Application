import { Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateClientAction } from "../store/actions/clientActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UpdateClient = ({ open, setOpen, row, classes }) => {
  const [clientDetails, setClientDetails] = useState({});
  const dispatch = useDispatch();
  const client = useSelector((state) => state.client);

  useEffect(() => {
    if (client.updated) {
      setOpen(false);
    }
  }, [client.updated]);

  useEffect(() => {
    setClientDetails({ name: row.name, email: row.email });
  }, [row]);

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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    dispatch(UpdateClientAction(row._id, clientDetails));
    setOpen(false);
  };

  function handleClose() {
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
            <Typography className={classes.formTitle}>Update Client</Typography>
          </div>
          <TextField
            margin="normal"
            required
            label="Client Name"
            name="name"
            autoComplete="name"
            value={clientDetails.name}
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
            label="Client Email"
            name="email"
            value={clientDetails.email}
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

export default UpdateClient;
