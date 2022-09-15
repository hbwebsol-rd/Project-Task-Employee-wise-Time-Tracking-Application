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

const EditProfile = ({ open, setOpen, user, classes }) => {
  const [userDetails, setUserDetails] = useState({ });

  useEffect(() => {
    setUserDetails({
      name: user.name,
      email: user.email,
      phone: user.phoneNumber,
    });
  }, [user]);

  const schema = yup
    .object({
      name: yup.string().required("Name Required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email required"),
      designation: yup.string().required("Designation Required"),
      phone: yup.string().required("Phone Required"),
      gender: yup.string().required("Gender Required"),
    })
    .required("required");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // setOpen(false);
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
                })
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
                })
            }}
          />
          <TextField
            margin="normal"
            required
            label="Phone Number"
            name="phone"
            value={userDetails.phone}
            autoComplete="phone"
            helperText={errors.phone && errors.phone.message}
            error={errors.phone && errors.phone.message}
            {...register("phone")}
            autoFocus
            className={classes.inputField}
            onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  [e.target.name]: e.target.value,
                })
            }}
          />
          <FormControl className={classes.inputField}>
            <InputLabel size="large" id="status-label">
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
              <MenuItem value="other">Other</MenuItem>
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
