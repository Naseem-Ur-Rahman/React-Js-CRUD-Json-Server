import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const StudentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateStudent, setUpdateStudent] = useState({
    stuname: "",
    stuemail: "",
    studesignation: "",
  });
  // Handling Student Edit / Update Operation
  const singleStudentUpdate = async () => {
    const API_URL = "http://localhost:3001/students";
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      // console.log(response.data);
      setUpdateStudent(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    singleStudentUpdate();
  }, [id]);

  const { stuname, stuemail, studesignation } = updateStudent;
  const onTextFieldChange = (event) => {
    const { name, value } = event.target;
    setUpdateStudent({
      ...updateStudent,
      [name]: value,
    });
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    const API_URL = "http://localhost:3001/students";
    if (updateStudent.stuname === "") {
      alert("Name Required");
    } else if (updateStudent.stuemail === "") {
      alert("Email Required");
    } else if (updateStudent.studesignation === "") {
      alert("Student Designation Required");
    } else {
      try {
        await axios.put(`${API_URL}/${id}`, updateStudent);
        alert("Data Updated Successfully");
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
            <Typography variant="h4">Edit Student</Typography>
          </Box>
          <form action="" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="stuname"
                  variant="outlined"
                  fullWidth
                  id="stuname"
                  label="Name"
                  autoFocus
                  value={stuname}
                  onChange={(event) => {
                    onTextFieldChange(event);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="stuemail"
                  variant="outlined"
                  fullWidth
                  id="stuemail"
                  label="Email"
                  autoFocus
                  value={stuemail}
                  onChange={(event) => {
                    onTextFieldChange(event);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="studesignation"
                  variant="outlined"
                  fullWidth
                  id="studesignation"
                  label="Designation"
                  autoFocus
                  value={studesignation}
                  onChange={(event) => {
                    onTextFieldChange(event);
                  }}
                />
              </Grid>
              <Box m={2} display="flex">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={formSubmit}
                >
                  Update
                </Button>
              </Box>
              <Box m={2} display="flex">
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

export default StudentEdit;
