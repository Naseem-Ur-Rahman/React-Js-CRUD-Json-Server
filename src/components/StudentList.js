import React from "react";
import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState, useEffect } from "react";

const StudentList = () => {
  const [studentsData, setStudentsData] = useState([]);
  // FectChing All Data
  const getStudentsData = async () => {
    const API_URL = "http://localhost:3001/students";
    try {
      const response = await axios.get(`${API_URL}`);
      setStudentsData(response.data);
    } catch (error) {
      console.log("Something Wrong");
    }
  };
  useEffect(() => {
    getStudentsData();
  }, []);

  // Handling Delete Operation
  const handleDelete = async (id) => {
    const API_URL = "http://localhost:3001/students";
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("Data Deleted Successfully");
      let newStudentsData = studentsData.filter((item) => {
        return item.id !== id;
      });
      setStudentsData(newStudentsData);
    } catch (error) {
      console.log("Something Wrong");
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box
          textAlign="center"
          p={2}
          style={{ backgroundColor: "red" }}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h4">Student List</Typography>
          <Button variant="contained" href="add/student">
            Add Student
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161", color: "white" }}>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Designation</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsData.map((student, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{student.stuname}</TableCell>
                  <TableCell align="center">{student.stuemail}</TableCell>
                  <TableCell align="center">{student.studesignation}</TableCell>
                  <TableCell align="left">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Tooltip title="View">
                        <IconButton>
                          <Link to={`/view/${student.id}`}>
                            <Visibility color="primary"></Visibility>
                          </Link>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit" display="flex">
                        <IconButton>
                          <Link to={`/edit/${student.id}`}>
                            <ModeEditIcon style={{ color: "green" }} />
                          </Link>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" display="flex">
                        <IconButton
                          onClick={() => {
                            handleDelete(student.id);
                          }}
                        >
                          <DeleteIcon style={{ color: "red" }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentList;
