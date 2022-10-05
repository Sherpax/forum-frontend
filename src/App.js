import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* <Route index path="/" element={<ForumHome />}> */}
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
