import "./Card.css";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import axios from "axios";
import swal from "sweetalert";
import { DeletePost } from "../../redux/action/PostAction";
import { useDispatch } from "react-redux";


export default function Card({ post }) {
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
              const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
              console.log(id);
              dispatch(DeletePost(id))
              swal("Poof! Your Data has been deleted!", {
                icon: "success",
              });
            } catch (error) {}
          } else {
            swal("Your Data is safe!");
          }
        });
      };
  return (
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
        <div className="editicon">
          <EditLocationAltIcon sx={{ color: "white" }} />
        </div>
      </div>
    </div>
  );
}
