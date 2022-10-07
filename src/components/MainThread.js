import React from "react";
import Cookies from "universal-cookie";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import Swal from "sweetalert2";

function MainThread() {
  const URL = process.env.REACT_APP_URL;
  const [open, setOpen] = React.useState(false);
  const { threadId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setLoading] = React.useState(true);

  const [posts, setPosts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  const COOKIES = new Cookies();

  const user_id = COOKIES.get("user_id");

  const [post, setPostData] = React.useState({
    title: "",
    content: "",
    date: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  const handleChange = (e) => {
    setPostData({ ...post, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    (async () => {
      axios
        .get(`${URL}/category/getAll`)
        .then((res) => {
          if (res.status === StatusCodes.OK) {
            setCategories(res.data);
          }
        })
        .then((error) => {
          console.log(error);
        });
    })();
  }, []);

  React.useEffect(() => {
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

  // if (isLoading) {
  //   console.log("cargando posts");
  //   return <Typography textAlign={"center"}>Loading posts...</Typography>;
  // }

  const publishPost = (e) => {
    console.log(post);
    axios
      .post(`${URL}/post/add/${threadId}/${user_id}`, post)
      .then((res) => {
        if (res.status === StatusCodes.CREATED) {
          Swal.fire({
            title: "Success!",
            text: res.data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === StatusCodes.EXPECTATION_FAILED) {
          Swal.fire({
            title: "Error!",
            text: error.data.msg,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
  };

  const goPost = (e) => {
    navigate(`/post/${e.target.id}`);
  };

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
            <Typography
              variant="h6"
              textAlign={"center"}
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {location.state.threadName}
            </Typography>

            <Button
              color="inherit"
              onClick={handleOpen}
              endIcon={<AddIcon />}
              sx={{
                padding: 1,
                width: 140,
                border: "2px solid",
                borderRadius: "10px",
              }}
            >
              New Post
            </Button>

            <Modal
              hideBackdrop={false}
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                maxWidth={450}
                bgcolor={"whitesmoke"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                gap={2}
                margin={"auto"}
                marginTop={10}
                padding={3}
                borderRadius={5}
                boxShadow={"2px 2px 7px #ccc"}
              >
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  fullWidth
                  input={<OutlinedInput label="Tag" />}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categories.title}
                  name="img"
                  label="Category"
                  onChange={handleChange}
                >
                  {categories.map((item, index) => {
                    return (
                      //TODO
                      <MenuItem key={item.id} id={item.id} value={item.title}>
                        {item.title}
                      </MenuItem>
                    );
                  })}
                </Select>
                <TextField
                  variant="outlined"
                  name="title"
                  placeholder="Title"
                  onChange={handleChange}
                  fullWidth
                  required
                ></TextField>
                <TextField
                  variant="outlined"
                  name="content"
                  placeholder="Description"
                  onChange={handleChange}
                  fullWidth
                  required
                ></TextField>
                <Button
                  sx={{ width: 120, border: "2px solid" }}
                  onClick={publishPost}
                >
                  Post
                </Button>
                {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography> */}
              </Box>
            </Modal>
          </Toolbar>
        </AppBar>
      </Box>

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
          overflow={"hidden"}
          boxShadow={"4px 4px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
          >
          <Button
              sx={{ marginTop: -7, marginBottom: 2 }}
              id={item.id}
              key={item.id}
            >
              {item.title}
            </Button>
 
            <Typography variant="body1" sx={{width: "100%", textAlign: "center"}}>
              {item.content}
            </Typography>
          </Box>
        );
      })}
    </>
  );
}

export default MainThread;
