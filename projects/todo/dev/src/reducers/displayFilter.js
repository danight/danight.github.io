import { SET_DISPLAY_FILTER, displayFilters } from '../actions/types';
const { SHOW_ALL } = displayFilters;

export default (state = SHOW_ALL, { type, filter }) => {
    switch (type) {
        case SET_DISPLAY_FILTER: 
            return filter;
        default: 
            return state;
    }
} 