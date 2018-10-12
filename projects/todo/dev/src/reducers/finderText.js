import { SET_FINDER_TEXT } from '../actions/types';

export default function findText(state = '', action) {
    switch (action.type) {
        case SET_FINDER_TEXT:
            return action.text
        default: 
            return state;
    }
}