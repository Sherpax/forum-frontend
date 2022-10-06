import React from "react";
import {useNavigate, useParams} from 'react-router-dom'
import axios from "axios";
import {ReasonPhrases,
StatusCodes,
getReasonPhrase,
getStatusCode,
} from "http-status-codes";

function MainThread() {

    const {threadId} = useParams()

    const [isLoading, setLoading] = React.useState(true);
    const [posts, setPosts] = React.useState([]);
  
    React.useEffect(() => {
      const URL = process.env.REACT_APP_URL;
  
      axios
        .get(`${URL}/post/getAll`)
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
      return <h2>Loading posts...</h2>;
    }

    console.log(threadId);

  return (
    <>
      <h1>Hey</h1>
    </>
  );
}

export default MainThread;
