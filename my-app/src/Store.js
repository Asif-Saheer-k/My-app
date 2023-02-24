import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {rootReducers} from './redux/reducer/Reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(rootReducers, composeEnhancer(applyMiddleware(thunk)));

export default Store; 
