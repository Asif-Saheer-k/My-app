import React, { useState } from "react";
import "./Header.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AddPost } from "../../redux/action/PostAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  hight: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Header({ lastId, posts }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const AddData = async () => {
    if (title && description) {
      const obj = {
        userId: 1,
        id: lastId + 1,
        title: title,
        body: description,
      };
      try {
        const { data } = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          obj
        );
        posts.push(data);
        dispatch(AddPost(posts));
        handleClose();
      } catch (error) {
        setError("Something Went Wrong");
      }
    } else {
      setError("Please Update Field");
    }
  };
  return (
    <header>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <form>
              <TextField
                style={{ width: "100%" }}
                id="filled-textarea"
                label="Enter Tittle"
                multiline
                variant="filled"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <TextField
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                style={{ width: "100%", marginTop: "2rem" }}
                id="filled-multiline-static"
                label="Enter Description"
                multiline
                rows={4}
                variant="filled"
              />
              {error && <span className="error">{error}</span>}
              <div className="AddData">
                <Button
                  variant="contained"
                  className="addButton"
                  onClick={AddData}
                  style={{ marginTop: "2rem" }}
                >
                  ADD DATA
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <div className="title">
        <h1>ALL POST</h1>
      </div>
      <div className="button-style">
        <Button style={{ backgroundColor: "white" }} onClick={handleOpen}>
          ADD POST
        </Button>
      </div>
    </header>
  );
}

export default Header;
