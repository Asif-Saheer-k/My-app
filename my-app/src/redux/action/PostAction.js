import {
  FETCH_DATA,
  FETCH_DATA_FAILED,
  FETCH_DATA_SUCCESS,
  ADD_DATA,
  DELETE_DATA,
} from "../data/Data";
import axios from "axios";

export const fetchPosts = () => async (dispatch) => {
  dispatch({ type: FETCH_DATA });
  try {
    const data = await axios.get("https://jsonplaceholder.typicode.com/posts");
    dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_DATA_FAILED, payload: error.message });
  }
};

export const AddPost = (posts) => (dispatch) => {
  dispatch({ type: ADD_DATA, payload: posts });
};
export const DeletePost = (id) => (dispatch, getState) => {
  const { PostReducers } = getState();

  const newArr = PostReducers.posts.filter((object) => {
    return object.id !== id;
  });

  dispatch({ type: DELETE_DATA, payload: newArr });
};
