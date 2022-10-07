import React from "react";
import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainThread from "./MainThread";
import Swal from "sweetalert2";
import axios from "axios";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";

export default function Home() {

  const navigate = useNavigate()
  const [isLoading, setLoading] = React.useState(true);
  const [thread, setThreads] = React.useState([]);

  React.useEffect(() => {
    const URL = process.env.REACT_APP_URL;

    axios
      .get(`${URL}/thread/getAll`)
      .then((res) => {
        if (res.status === StatusCodes.OK) {
          setThreads(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "Tenemos problemas cargando los hilos",
          icon: "error",
          confirmButtonText: ":(",
        }).then((isConfirm) => {
          if(isConfirm){
            //TODO
            navigate("/")
          }
        })
      });
  }, []);

  if (isLoading) {
    console.log("cargando");
    return <Typography variant="h2" textAlign={"center"}>Loading threads...</Typography>;
  }

  const goThread = (e) => {
    const id = e.target.id
    navigate(`thread/${id}`)
  };

  return (
    <>
      {thread.map((item, index) => {
        return (
          <Box
            key={item.id}
            maxWidth={500}
            height={13}
            maxHeight={23}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"row"}
            margin={"auto"}
            marginTop={5}
            padding={7}
            borderRadius={5}
            flexWrap={"wrap"}
            overflow={"clip"}
            boxShadow={"4px 4px 10px #ccc"}
            sx={{
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}
          >
            <Button
              sx={{ marginTop: -7 }}
              id={item.id}
              key={item.id}
              onClick={goThread}
            >
              {item.title}
            </Button>

            <Typography
              variant="body1"
              marginTop={0}
            >
              {item.description}
            </Typography>
          </Box>
        );
      })}
    </>
  );
}
