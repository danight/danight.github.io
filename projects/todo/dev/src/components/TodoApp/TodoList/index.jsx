import React from 'react';
import Todo from './Todo';
import Scrollbar from '../../../own-components/Scrollbar';
import './index.css';

export default function TodoList({ todos, onToggleTodo, onDeleteTodo, onChangeTodo, onToggleBookmarkTodo }) {
    const items = todos.map((todo, inx) => {
        return (
            <Todo 
                key={todo.id}
                {...todo}
                number={inx}
                onToggleTodo={() => onToggleTodo(todo.id)}
                onDeleteTodo={() => onDeleteTodo(todo.id)}
                onChangeTodo={text => onChangeTodo(todo.id, text)}
                onToggleBookmarkTodo={id => onToggleBookmarkTodo(todo.id)}
            />
        )
    });

    return (
        <div className="todo-list todo-app__todo-list todo-app__item">
            {items.length ? 
                <Scrollbar maxHeight="300">{items}</Scrollbar> : 
                <div className="todo-list__message">Todos are empty...</div>
            }
        </div>
    )
}