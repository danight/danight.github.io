import React from 'react';

export default function BoardRow(props) {
    return (
        <div className="board__row">{props.cells}</div>
    )
}
