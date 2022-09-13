import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import StudentList from "../components/StudentList";

const Home = () => {
  return (
    <>
      <Box textAlign="center" backgroundColor="red" p={2} mb={2}>
        <Typography variant="h2" color="white">
          CRUD With API (React Js)
        </Typography>
      </Box>
      <Grid
        container
        justify="center"
        spacing={4}
        alignContent="center"
        justifyContent="center"
      >
        <Grid item md={8} xs={12}>
          <StudentList />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
