import { Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdatePassword } from "../store/actions/profileActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ChangePassword = ({ open, setOpen, classes }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const profile = useSelector((state) => state.profile);
  useEffect(() => {
    if (profile.updated) {
      setOpen(false);
    }
  }, [profile.updated]);

  const schema = yup
    .object({
      password: yup.string().required("Field Required"),
      oldPassword: yup.string().required("Password Required"),
      confirmPassword: yup.string().required("Field Required"),
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
    dispatch(UpdatePassword(password));
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
            <Typography className={classes.formTitle}>
              Change Password
            </Typography>
          </div>
          <TextField
            margin="normal"
            required
            label="Enter Old Password"
            name="oldPassword"
            helperText={errors.oldPassword && errors.oldPassword.message}
            error={errors.oldPassword && errors.oldPassword.message}
            {...register("oldPassword")}
            autoFocus
            className={classes.inputField}
            onChange={(e) => {
              setPassword({
                ...password,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <TextField
            margin="normal"
            required
            label="Enter New Password"
            name="password"
            helperText={errors.password && errors.password.message}
            error={errors.password && errors.password.message}
            {...register("password")}
            autoFocus
            className={classes.inputField}
            onChange={(e) => {
              setPassword({
                ...password,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <TextField
            margin="normal"
            required
            label="Confirm Password"
            name="confirmPassword"
            helperText={errors.confirmPassword && errors.confirmPassword.message}
            error={errors.confirmPassword && errors.confirmPassword.message}
            {...register("confirmPassword")}
            autoFocus
            className={classes.inputField}
            onChange={(e) => {
              setPassword({
                ...password,
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
              sx={{ color: "#3525B5", border: "#3525B5" }}
              type='submit'
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

export default ChangePassword;
