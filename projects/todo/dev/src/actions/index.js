import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, CHANGE_TODO, SET_DISPLAY_FILTER, SET_FINDER_TEXT, TOGGLE_BOOKMARK_TODO } from './types';

export function setDisplayFilter(filter) {
    return {
        type: SET_DISPLAY_FILTER, filter
    }
}

export function addTodo(text) {
    return {
        type: ADD_TODO, text
    }
} 

export function deleteTodo(id) {
    return {
        type: DELETE_TODO, id
    }
} 

export function toggleTodo(id) {
    return {
        type: TOGGLE_TODO, id
    }
}

export function changeTodo(id, text) {
    return {
        type: CHANGE_TODO, id, text
    }
}

export function toggleBookmarkTodo(id) {
    return { type: TOGGLE_BOOKMARK_TODO, id } 
}

export function setFinderText(text) {
    return {
        type: SET_FINDER_TEXT, text
    }
}
