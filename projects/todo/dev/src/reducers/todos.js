import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, CHANGE_TODO, TOGGLE_BOOKMARK_TODO } from '../actions/types';

export default (state = [], { type, text, id }) => {
    switch (type) {
        case ADD_TODO: 
            const lastTodo = state[state.length - 1],
                newId = lastTodo ? lastTodo.id + 1 : 0;

            return [
                ...state,
                { 
                    text, 
                    id: newId, 
                    date: new Date(), 
                    completed: false,
                    bookmark: false
                }
            ];
        case DELETE_TODO:
            return state.filter(todo => todo.id !== id);
        case TOGGLE_TODO: 
            return state.map(todo => {
                if (todo.id === id) {
                    return {...todo, completed: !todo.completed}
                }

                return todo;
            });
        case CHANGE_TODO:
            return state.map(todo => {
                if (todo.id === id) {
                    return {...todo, text}
                }

                return todo;
            });
        case TOGGLE_BOOKMARK_TODO:
            return state.map(todo => {
                if (todo.id === id) {
                    return { ...todo, bookmark: !todo.bookmark }
                }

                return todo;
            });
        default: 
            return state;
    }
}