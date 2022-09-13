import React, { useState } from "react";
import axios from "axios";
import { Typography, Box, Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  let navigate = useNavigate();
  const [addStudent, setAddStudent] = useState({
    stuname: "",
    stuemail: "",
    studesignation: "",
  });
  // Handling Student Form / Create Operation
  const onTextFieldChange = async (event) => {
    const { name, value } = event.target;
    setAddStudent({
      ...addStudent,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const API_URL = "http://localhost:3001/students";
    if (addStudent.stuname === "") {
      alert("Name Required");
    } else if (addStudent.stuemail === "") {
      alert("Email Required");
    } else if (addStudent.studesignation === "") {
      alert("Student Designation Required");
    } else {
      try {
        await axios.post(`${API_URL}`, addStudent);
        alert("Data Added Successfully");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <>
      <Box textAlign="center" backgroundColor="red" p={2} mb={2}>
        <Typography variant="h2" color="white">
          CRUD With API (React Js)
        </Typography>
      </Box>
      <Grid container justifyContent="center" alignItems="center" mt={6}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} backgroundColor="green" mb={2}>
            <Typography variant="h4">Add Student</Typography>
          </Box>
          <form action="" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  fullWidth
                  id="stuname"
                  label="Name"
                  onChange={(event) => {
                    onTextFieldChange(event);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="stuemail"
                  type="email"
                  name="stuemail"
                  variant="outlined"
                  fullWidth
                  id="stuemail"
                  label="Email"
                  onChange={(event) => {
                    onTextFieldChange(event);
                  }}
                />
                <Grid item xs={12} mt={2}>
                  <TextField
                    autoComplete="studesignation"
                    name="studesignation"
                    variant="outlined"
                    fullWidth
                    id="studesignation"
                    label="Designation"
                    onChange={(event) => {
                      onTextFieldChange(event);
                    }}
                  />
                </Grid>
              </Grid>
              <Box m={2} display="flex" flexDirection="space-between">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={formSubmit}
                >
                  Add
                </Button>
              </Box>
              <Box m={2} display="flex" flexDirection="space-between">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={goBack}
                >
                  Go Back
                </Button>
              </Box>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentForm;
