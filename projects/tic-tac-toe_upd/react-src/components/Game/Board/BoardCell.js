import React from 'react';

export default function BoardCell(props) {
    const selected = props.selected ? 'board__cell_selected' : '';
    return (
        <button
            className={`board__cell ${selected}`}
            onClick={() => props.onClick()}
        >
            {props.value}
        </button>
    )
}
