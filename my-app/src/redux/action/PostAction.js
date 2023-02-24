import {FETCH_DATA,FETCH_DATA_FAILED,FETCH_DATA_SUCCESS} from '../data/Data';
import axios from 'axios';

export const fetchPosts = () => async (dispatch) => {
	dispatch({ type: FETCH_DATA });
	try {
		const data = await axios.get('https://jsonplaceholder.typicode.com/posts');
		dispatch({ type:FETCH_DATA_SUCCESS,payload: data });
	} catch (error) {
		dispatch({ type: FETCH_DATA_FAILED, payload: error.message });
		
	}
};

// export const sortPostsAsc = () => (dispatch, getState) => {
// 	const { PostReducers } = getState();
// 	dispatch({ type: actions.SORT_POSTS_ASC, payload: PostReducers.posts });
// };

// export const sortPostsDesc = () => (dispatch, getState) => {
// 	const { PostReducers } = getState();
// 	dispatch({ type: actions.SORT_POSTS_DESC, payload: PostReducers.posts });
// };

// export const searchPosts = (query) => (dispatch, getState) => {
// 	const { PostReducers } = getState();
// 	const searchResults =  PostReducers.searchResults.filter((post) => 
// 		post.title.toLowerCase().includes(query.toLowerCase())
// 	);
// 	dispatch({ type: actions.SEARCH_POSTS, payload: searchResults });
// };
