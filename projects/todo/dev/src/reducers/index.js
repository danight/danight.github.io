import { combineReducers } from 'redux';
import todos from './todos';
import displayFilter from './displayFilter';
import finderText from './finderText';

export default combineReducers({ todos, displayFilter, finderText });