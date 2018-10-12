import { connect } from 'react-redux';
import TodoList from '../../components/TodoApp/TodoList';
import { toggleTodo } from '../../actions';
import { deleteTodo } from '../../actions';
import { changeTodo } from '../../actions';
import { toggleBookmarkTodo } from '../../actions';
import { displayFilters } from '../../actions/types';
const { SHOW_ACTIVE, SHOW_COMPLETED } = displayFilters;  

const getDisplayTodos = (todos, filter, finderText) => {
    switch (filter) {
        case SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        case SHOW_COMPLETED: 
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

const filterTodosByBookmark = (todos) => {
    return todos.filter(todo => todo.bookmark).concat(
        todos.filter(todo => !todo.bookmark)
    )
}

const filterTodosBySubString = (todos, string) => {
    return todos.filter(({ text }) => text.includes(string))
}

const mapStateToProps = ({ todos, displayFilter, finderText }) => {
    return { 
        todos: filterTodosByBookmark(
                    filterTodosBySubString(
                        getDisplayTodos(todos, displayFilter) 
                    , finderText)
                )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleTodo: id => dispatch( toggleTodo(id) ),
        onDeleteTodo: id => dispatch( deleteTodo(id) ),
        onChangeTodo: (id, text) => dispatch( changeTodo(id, text) ),
        onToggleBookmarkTodo: (id) => dispatch( toggleBookmarkTodo(id) )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);