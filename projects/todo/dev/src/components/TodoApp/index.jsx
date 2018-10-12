import React from 'react';
import Header from './Header';
import AddTodo from '../../containers/AddTodo';
import StatusBar from './StatusBar';
import SearchBar from '../../containers/SearchBar/index.jsx';
import DisplayTodoList from '../../containers/DisplayTodoList';
import './index.css';

export default function TodoApp() {
    return (
        <div className="todo-app app__todo-app">
            <Header>Todo</Header>
            <AddTodo />
            <StatusBar />
            <SearchBar />
            <DisplayTodoList />
        </div>
    )
}