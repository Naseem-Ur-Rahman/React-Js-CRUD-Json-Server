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
  Grid,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const StudentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([]);
  // Fetching Single Student Data/ View Operation
  const singleStudentData = async () => {
    const API_URL = "http://localhost:3001/students";
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      // console.log(response.data);
      setStudentData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    singleStudentData();
  });

  // Handling Delete in View 
  const handleDelete = async (id) => {
    const API_URL = "http://localhost:3001/students";
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("Data Deleted Successfully");
      navigate("/");
    } catch (error) {
      console.log("Something Wrong");
    }
  };

  const goBack = () => {
    navigate("/");
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Box textAlign="center" p={2} backgroundColor="red">
          <Typography variant="h4">Student List</Typography>
        </Box>
        <Grid
          item
          xs={12}
          md={6}
          justify="center"
          alignItems="center"
          justifyContent="center"
        >
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "yellow" }}>
                <TableCell align="center">Student ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{studentData.id}</TableCell>
                <TableCell align="center">{studentData.stuname}</TableCell>
                <TableCell align="center">{studentData.stuemail}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton>
                      <Link to={`/edit/${studentData.id}`}>
                        <ModeEditIcon color="primary" />
                      </Link>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => {
                        handleDelete(studentData.id);
                      }}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="error"
              size="medium"
              onClick={goBack}
            >
              Go Back
            </Button>
          </Box>
        </Grid>
      </TableContainer>
    </>
  );
};

export default StudentView;
