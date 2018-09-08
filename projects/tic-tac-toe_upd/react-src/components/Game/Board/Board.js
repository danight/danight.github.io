import React from 'react';

import BoardRow from './BoardRow.js';
import BoardCell from './BoardCell.js';
import './Board.css';

export default function Board(props) {
    let rows = [], cells = [];

    for (let i = 0; i < 9; ++i) {
        cells.push(
            <BoardCell
                selected={props.selectedCells.includes(i)}
                key={i}
                value={props.grid[i]}
                onClick={() => props.onClick(i)} />
        );

        if (cells.length % 3) continue;

        rows.push(<BoardRow key={i} cells={cells} />);
        cells = [];
    }

    return (
        <div className="board game__board">{rows}</div>
    )
}
