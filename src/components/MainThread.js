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
  const { threadId } = useParams()
  const navigate = useNavigate()
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

  const goPost = (e) => {
    navigate(`/post/${e.target.id}`)
  }

  return (
    <>
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
      {posts.map((item, index) => {
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
            onClick={goPost}
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
        )
      })}
    </>
  );
}

export default MainThread;
