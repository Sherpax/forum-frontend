import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//! TODO: Ahora mismo no comprueba NADA

function SignUp() {
  const datosForm = {
    user_name: "",
    email: "",
    password: "",
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="User Name"
          variant="outlined"
          placeholder="Nombre de usuario"
          error
          helperText="El nombre de usuario no debe estar vacío"
          required
        />
        <TextField
          id="outlined-basic"
          type="email"
          label="Email"
          variant="outlined"
          error
          helperText="Email no válido"
          placeholder="Email"
          required
        />
        <TextField
          id="outlined-basic"
          type="password"
          autoComplete="off"
          label="Password"
          variant="outlined"
          placeholder="Password"
          error
          helperText="El password no debe estar vacío"
          required
        />
        <TextField
          id="outlined-basic"
          type="password"
          autoComplete="off"
          label="Confirm Password"
          variant="outlined"
          placeholder="Confirm Password"
          error
          helperText="La contraseña no coincide"
          required
        />
      </Box>
    </>
  );
}

export default SignUp;
