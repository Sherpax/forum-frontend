import * as React from "react";
import Box from "@mui/material/Box";
import { TextField, Button, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from 'axios'
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";

//! TODO: Ahora mismo no comprueba NADA

function SignUp() {
  const [datosUser, setDatosUser] = React.useState({
    email: "",
    pass: "",
    userName: "",
  });

  const handleChange = (e) => {
    setDatosUser({ ...datosUser, [e.target.name]: e.target.value });
  };

  const sendData = (e) => {
    e.preventDefault();

    const URL = process.env.REACT_APP_URL;

    axios.post(`${URL}/user/register`, datosUser)
    .then(res => {
      if(res.status === StatusCodes.OK){
        console.log(res);
      }
    })
    .catch(error => {
      console.log(error.response.status);
    })

  }

  return (
    <>
      <Box
        component={"form"}
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
        noValidate
        autoComplete="off"
      >
        <Typography variant="h2" padding={3} textAlign={"center"}>
            Sign Up
          </Typography>
        <TextField
          margin="normal"
          id="outlined-basic"
          label="User Name"
          variant="outlined"
          placeholder="Nombre de usuario"
          // helperText="El nombre de usuario no debe estar vacío"
          name="userName"
          value={datosUser.username}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          id="outlined-basic"
          type="email"
          label="Email"
          variant="outlined"
          // helperText="Email no válido"
          placeholder="Email"
          name="email"
          value={datosUser.email}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          id="outlined-basic"
          type="password"
          label="Password"
          auto
          variant="outlined"
          placeholder="Password"
          // helperText="El password no debe estar vacío"
          name="pass"
          value={datosUser.pass}
          onChange={handleChange}
          required
        />
        {/* <TextField
          id="outlined-basic"
          type="password"
          autoComplete="off"
          label="Confirm Password"
          variant="outlined"
          placeholder="Confirm Password"
          helperText="La contraseña no coincide"
          name="password"
          value={datosUser.pass}
          onChange={handleChange}
          required
        /> */}
        <Button
          endIcon={<ExitToAppIcon />}
          type="submit"
          variant="contained"
          color="info"
          onClick={sendData}
          sx={{ marginTop: 3, borderRadius: 4 }}
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
}

export default SignUp;
