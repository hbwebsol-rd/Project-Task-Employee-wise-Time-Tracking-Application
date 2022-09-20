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
  import { GetAllClientsAction } from "../store/actions/clientActions";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import { UpdateProjectAction } from "../store/actions/projectActions";
  import moment from "moment";
  
  const UpdateProject = ({ open, setOpen, row, classes }) => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.client.clients);
  
    const [clients, setClients] = useState(items);
    const [projectDetails, setProjectDetails] = useState({})
  
    useEffect(() => {
      dispatch(GetAllClientsAction());
    }, []);  
    useEffect(() => {
      setClients(items);
    }, [items]);
    useEffect(() => {
        setProjectDetails({ name: row.name, customerId: row._id, technology: row.technology, start: moment(row.start).format('YYYY-MM-DD'), end: moment(row.end).format('YYYY-MM-DD') })
    }, [row])
  
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
      dispatch(UpdateProjectAction(row._id, projectDetails));
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
              <Typography className={classes.formTitle}>Update Project</Typography>
            </div>
            <TextField
              margin="normal"
              required
              label="Enter Project Name"
              name="name"
              value={projectDetails.name}
              autoComplete="name"
              autoFocus
              className={classes.inputField}
              helperText={errors.name && errors.name.message}
              error={errors.name && errors.name.message}
              {...register("name")}
              onChange={(e) => {
                setProjectDetails({
                  ...projectDetails,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <FormControl className={classes.inputField}>
              <InputLabel id="priority-label">Select Client</InputLabel>
              <Select
                labelId="priority-label"
                name="customerId"
                value={projectDetails.customerId}
                id="select"
                label="Select client"
                helperText={errors.customerId && errors.customerId.message}
                error={errors.customerId && errors.customerId.message}
                {...register("customerId")}
                onChange={(e) => {
                  setProjectDetails({
                    ...projectDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                {clients.map((client, i) => {
                  return <MenuItem key={i} value={client._id}>{client.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              name="technology"
              value={projectDetails.technology}
              label="Technology"
              autoComplete="name"
              autoFocus
              className={classes.inputField}
              helperText={errors.technology && errors.technology.message}
              error={errors.technology && errors.technology.message}
              {...register("technology")}
              onChange={(e) => {
                setProjectDetails({
                  ...projectDetails,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                id="date"
                type="date"
                name="start"
                value={projectDetails.start}
                label="Start date"
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
                value={projectDetails.end}
                label="End date"
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
                SAVE
              </Button>
            </div>
          </form>
        </Modal>
      </>
    );
  };
  
  export default UpdateProject;
  