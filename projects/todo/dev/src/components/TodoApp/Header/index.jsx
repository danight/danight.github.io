import React from 'react';

export default function Header({ children }) {
    return (
        <header className="todo-app__header todo-app__item">{children}</header>
    )
}
