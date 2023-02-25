import "./Card.css";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import axios from "axios";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DeletePost, updatePost } from "../../redux/action/PostAction";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

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
export default function Card({ post }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const DeleteData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${id}`
          );
          dispatch(DeletePost(id));
          swal("Poof! Your Data has been deleted!", {
            icon: "success",
          });
        } catch (error) {}
      } else {
        swal("Your Data is safe!");
      }
    });
  };
  const EditModalOpen = (obj) => {
    setData(obj);
    handleOpen();
    setValue("title", obj.title);
    setValue("description", obj.body);
  };
  const onSubmit = async (post) => {
    const obj = {
      id: data.id,
      userId: data.userId,
      title: post.title,
      body: post.description,
    }
    try {
      const update = await axios.patch(
        `https://jsonplaceholder.typicode.com/posts/postId=${data.id}`,
        { obj }
      );
     
      dispatch(updatePost(obj));
      handleClose();
    } catch (error) {
      setError("Something Went Wrong")
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                style={{ width: "100%" }}
                id="filled-textarea"
                label="Enter Tittle"
                multiline
                variant="filled"
                {...register("title", { required: true })}
              />
              <TextField
                style={{ width: "100%", marginTop: "2rem" }}
                id="filled-multiline-static"
                label="Enter Description"
                multiline
                rows={4}
                variant="filled"
                {...register("description", { required: true })}
              />
              {error && <span className="error">{error}</span>}
              {errors && <span className="error">{errors}</span>}
              <div className="AddData">
                <Button
                  type="submit"
                  variant="contained"
                  className="addButton"
                  //   onClick={AddData}
                  style={{ marginTop: "2rem" }}
                >
                  UPDATE DATA
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <div key={post.id} className="post">
        <h2>{post?.title}</h2>
        <p>{post?.body}</p>
        <div className="icone">
          <div
            className="deleteicone"
            onClick={(e) => {
              DeleteData(post.id);
            }}
          >
            <DeleteIcon sx={{ color: "white" }} />
          </div>
          <div
            className="editicon"
            onClick={() => {
              EditModalOpen(post);
            }}
          >
            <EditLocationAltIcon sx={{ color: "white" }} />
          </div>
        </div>
      </div>
    </>
  );
}
