import React from "react";
import { Box } from "@mui/system";
import { Typography, Button, AppBar, Toolbar, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";

function MainThread() {
  const { threadId } = useParams();

  const [isLoading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const URL = process.env.REACT_APP_URL;

    axios
      .get(`${URL}/post/get/${threadId}`)
      .then((res) => {
        if (res.status === StatusCodes.OK) {
          setPosts(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  }, []);

  if (isLoading) {
    console.log("cargando posts");
    return <Typography textAlign={"center"}>Loading posts...</Typography>;
  }

  console.log(threadId);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default MainThread;
