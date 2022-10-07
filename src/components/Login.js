import { Button, TextField, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import Cookies from 'universal-cookie';

function Login(props) {
  const navigate = useNavigate();

  const [dataEmailOrName, setEmailOrDate] = React.useState();
  const [password, setPassword] = React.useState();

  const handleChangeEmailName = (e) => {
    setEmailOrDate(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: dataEmailOrName,
      pass: password,
    };

    const URL = process.env.REACT_APP_URL;
    
    axios
      .post(`${URL}/user/login`, userData)
      .then((res) => {
        console.log(res.data);
        if (res.status === StatusCodes.OK) {
          const cookies = new Cookies();
          cookies.set('user_id', res.data.id_user, { path: '/',  sameSite: true, httpOnly: false });
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error.response.status);
      });

    console.log(userData);
  };

  const goSignUpPage = (e) => {

    navigate("/register");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          margin={"auto"}
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h2" padding={3} textAlign={"center"}>
            Login
          </Typography>
          <TextField
            margin="normal"
            variant="outlined"
            placeholder="Email or Username"
            onChange={handleChangeEmailName}
            required
          ></TextField>
          <TextField
            margin="normal"
            variant="outlined"
            autoComplete="off"
            type={"password"}
            placeholder="Password"
            onChange={handleChangePassword}
            required
          ></TextField>

          <Button
            endIcon={<LoginOutlinedIcon />}
            type="submit"
            variant="contained"
            color="success"
            sx={{ marginTop: 3, borderRadius: 4 }}
          >
            Login
          </Button>

          <Typography
            variant="body1"
            paddingTop={5}
            paddingBottom={3}
            textAlign={"center"}
          >
            Don't have an account?
          </Typography>
          <Button sx={{ marginTop: -3 }} onClick={goSignUpPage}>
            Sign Up
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Login;
