import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateProfile } from "../store/actions/profileActions";

const EditProfile = ({ open, setOpen, user, classes }) => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    setUserDetails({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      gender: ' '
    });
  }, [user]);

  const schema = yup
    .object({
      name: yup.string().required("Name Required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email required"),
      phoneNumber: yup.string().required("Phone Required"),
      gender: yup.string().required("Gender Required"),
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
    dispatch(UpdateProfile(userDetails))
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
            <Typography className={classes.formTitle}>Edit Profile</Typography>
          </div>
          <TextField
            margin="normal"
            required
            label="Name"
            name="name"
            value={userDetails.name}
            autoComplete="name"
            helperText={errors.name && errors.name.message}
            error={errors.name && errors.name.message}
            {...register("name")}
            autoFocus
            className={classes.inputField}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <TextField
            margin="normal"
            required
            label="Email"
            name="email"
            value={userDetails.email}
            autoComplete="email"
            helperText={errors.email && errors.email.message}
            error={errors.email && errors.email.message}
            {...register("email")}
            autoFocus
            className={classes.inputField}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <TextField
            margin="normal"
            required
            label="Phone Number"
            name="phone"
            value={userDetails.phoneNumber}
            autoComplete="phone"
            helperText={errors.phoneNumber && errors.phoneNumber.message}
            error={errors.phoneNumber && errors.phoneNumber.message}
            {...register("phoneNumber")}
            autoFocus
            className={classes.inputField}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <FormControl className={classes.inputField}>
            <InputLabel id="status-label">
              Gender
            </InputLabel>
            <Select
              labelId="status-label"
              id="select"
              label="Gender"
              name="gender"
              error={errors.gender && errors.gender.message}
              {...register("gender")}
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  [e.target.name]: e.target.value,
                })
            }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          <div>
            <Button
              sx={{ color: "#FF6161", border: "#FF6767" }}
              className={classes.formButton}
              onClick={() => setOpen(false)}
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              sx={{ color: "#3525B5", border: "#3525B5" }}
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

export default EditProfile;
