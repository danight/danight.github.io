import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
    renderSquare(inx) {
        let hightlight = this.props.hightlight;

        if (hightlight) {
            hightlight = hightlight.indexOf(inx) !== -1 ? true : false;
        }

        return (
            <Square key={inx}
                    value={this.props.current.squares[inx]}
                    hightlight={hightlight}
                    onClick={() => this.props.onClick(inx)}
            />);
    }

    renderSquares() {
        const rows = [];
        for (var i = 0, count = 0; i < 3; ++i) {
            let sqrs = [];
            for (var j = 0; j < 3; ++j, ++count) {
                sqrs.push(this.renderSquare(count));
            }

            rows.push(<div key={count} className="board-row">{sqrs}</div>)
        }

        return rows;
    }

    render() {
        return (
            <div className="board game__board">
                {this.renderSquares()}
            </div>
        )
    }
}
