import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../CopyRight/CopyRight";
import {  addProduct, registerUser, updateDetails } from "../../Service/axiosService";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutline } from "@mui/icons-material";
import { useUserContext } from "../../ContextApi/UserContext";
// import BasicDatePicker from "../DatePicker/DatePicker";
import FileUploadField from "../FileUpload/FileUploadField";
import { useEffect } from "react";
const defaultTheme = createTheme();

export default function AddForm(props) {
  const { handleClose , busList , setBusList , updateBusRow , setUpdateBusRow } = props;
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { userName, setUserName } = useUserContext();
  const initialStates = {
            name: "",
            description: "",
            size: 0,
            price: 0,
            color: "",
            category: "",
            image: "",
            createdAt: "",
            updatedAt: "",
            __v: 0
  };
  const [updateData,setUpdateData] = useState(updateBusRow.length > 0 ? updateBusRow[0] : initialStates);
  // const [journeyDate,setJourneyDate] = useState(dayjs().format('MM/DD/YYYY'));
  // const [depature,setDepature] = useState(dayjs().format('MM/DD/YYYY'));
  // console.log("Journey Date : ", updateData.length);

  const onChanges = (event) => {
    console.log("Event : ", event.target.value);
    setUpdateData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value
    }));
    console.log(updateData);
  };

  const onFileChange = (event) => {
    console.log("EventNew : ", event.target.files[0]);
    setUpdateData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.files[0]
    }));
    console.log(updateData);
};
  

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    const requestBody = {
      name: data.get("name"),
      description: data.get("description"),
      size: data.get("size"),
      price: data.get("price"),
      color: data.get("color"),
      category: data.get("category"),
      image: data.get("image"),
    };
    console.log(requestBody);
    try {
      if(!updateData._id){
      const response = await addProduct(requestBody);
      if (response.status === 201 || response.status === 200) {
        setMessage("Details Added successfully");
        setBusList((prevData)=>[...prevData, {...requestBody , 
          _id : response.data.data._id ,
           createdAt : response.data.data.createdAt ,
           updatedAt : response.data.data.updatedAt ,
           __v : response.data.data.__v,
           seatsBooked : response.data.data.seatsBooked,
           status: response.data.data.status
          }].reverse());
        console.log("Bus List : ", busList.reverse());
        setMessageType("success");
        setTimeout(() => {
          setMessage("");
          handleClose();
        }, 3000);
      }} else {
        console.log("updateDataUp:",updateData);
      const response = await updateDetails(updateData._id , updateData);
      console.log("Response New: ", response);
      if (response.status === 201 || 200) {
        setMessage(response.data.message);
        setBusList(busList.map((item) => item._id === updateData._id ? updateData : item));
        console.log("Bus List : ", busList.reverse());
        setMessageType("success");
        setTimeout(() => {
          setMessage("");
          handleClose();
        }, 3000);
      }}
    } catch (error) {
      console.error(error);
      setMessage(error.response.data.message);
      setMessageType("error");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {message != "" && (
        <Alert
          icon={<CheckCircleOutline fontSize="inherit" />}
          severity={messageType}
        >
          {message}
        </Alert>
      )}
      <Container
        component="main"
        maxWidth="md"
        style={{ border: "2px solid black", borderRadius: "15px" , backgroundColor: "white"}}
      >
        <h2 style={{ textAlign: "center", marginBottom: "-60px" }}>
          Add Details
        </h2>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            encType="multipart/form-data"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={updateData ? updateData.name : ""}
                  onChange={(e)=>onChanges(e)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="size"
                  label="Size"
                  name="size"
                  value={updateData? updateData.size : ""}
                  onChange={(e)=>onChanges(e)}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  value={updateData? updateData.price : ""}
                  onChange={(e)=>onChanges(e)}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="color"
                  label="Color"
                  type="text"
                  value={updateData? updateData.color : ""}
                  onChange={(e)=>onChanges(e)}
                  id="color"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="category"
                  label="Category"
                  value={updateData? updateData.category : ""}
                  onChange={(e)=>onChanges(e)}
                  type="text"
                  id="category"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FileUploadField onFileChange={onFileChange}/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  type="text-area"
                  value={updateData? updateData.description : ""}
                  onChange={(e)=>onChanges(e)}
                  id="description"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
