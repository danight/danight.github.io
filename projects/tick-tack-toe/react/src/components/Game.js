import React from 'react';
import Board from './Board';
import GameInfo from './GameInfo';

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(8).fill(null),
                id: 0
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }

    jumpTo = inx => {
        this.setState({
            stepNumber: inx,
            xIsNext: (inx % 2) === 0
        });
    }

    handleClick = inx => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) ||
            squares[inx]) return;

        squares[inx] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares: squares,
                id: history.length
            }),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        const winner = calculateWinner(current.squares);
        let status;

        if (winner) {
            status = 'Winner: ' + winner.player;
        } else {
            status = this.state.stepNumber === 9 ?
                'Draw' :
                'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game page__game">
                <Board current={current}
                       hightlight={winner ? winner.lines : false}
                       onClick={this.handleClick}
                />
                <GameInfo status={status}
                          history={history}
                          onClick={this.jumpTo}
                />
            </div>
        )
    }
}

//additional fns
function calculateWinner(squares) {
    let lines = [
        [0, 1, 2], [0, 3, 6],
        [3, 4, 5], [1, 4, 7],
        [6, 7, 8], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (var i = 0; i < lines.length; ++i) {
        let [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] &&
            squares[a] === squares[c]) {
                return {player: squares[a], lines: lines[i]};
            }
    }

    return null;
}
