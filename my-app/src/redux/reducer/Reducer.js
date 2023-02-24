import { combineReducers } from 'redux';
import {FETCH_DATA,FETCH_DATA_FAILED,FETCH_DATA_SUCCESS} from "../data/Data";

const initialState = {
  posts: [],
  page: 1,
};

export const PostReducers = (state=initialState, action) => {
   
  if (action.type === FETCH_DATA) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type ===  FETCH_DATA_SUCCESS) {
    return {
      ...state,
      loading: false,
      posts: action.payload.data,
    };
  } else if (action.type ===FETCH_DATA_FAILED ) {
    return {
      ...state,
      loading: true,
    };
  } else {
    return state;
  }
};

export const rootReducers = combineReducers({
	PostReducers,
});

 
