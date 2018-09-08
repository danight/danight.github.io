import React from 'react';

import Board from './Board/Board.js';
import History from './History/History.js';
import './Game.css';

// aux funcs
function calculateWinner(grid) {
    let lines = [
        [0, 1, 2], [6, 7, 8], [2, 5, 8], [2, 4, 6],
        [3, 4, 5], [0, 3, 6], [0, 4, 8], [1, 4, 7]
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if (grid[a] &&
            grid[a] === grid[b] &&
            grid[a] === grid[c]) return {player: grid[a], line};
    }

    return false;
}
// _aux funcs

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                grid: new Array(9).fill(null),
                id: 0
            }],
            stepNumber: 0,
            xIsNext: true,
            reverse: false,
            selectedItemHistory: null
        }
    }

    handleClick = inx => {
        const history = this.state.history
            .slice(0, this.state.stepNumber + 1),
        currentHistory = history[history.length - 1];

        const grid = currentHistory.grid.slice();
        if (grid[inx] || calculateWinner(grid)) return;

        grid[inx] = this.state.xIsNext ? 'X' : 'O';

        let id = currentHistory.id + 1;
        this.setState({
            history: history.concat([{grid, id}]),
            stepNumber: this.state.stepNumber + 1,
            xIsNext: !this.state.xIsNext
        });
    }

    handleJumpTo = i => {
        this.setState({
            stepNumber: i,
            xIsNext: i % 2 ? false : true,
            selectedItemHistory: i
        });
    }

    handleReverse = () => {
        this.setState({
            reverse: !this.state.reverse
        });

    }

    render() {
        let history = this.state.history.slice();
        const grid = history[this.state.stepNumber].grid;

        const winner = calculateWinner(grid);

        const status = winner ? 'Winner: ' + winner.player :
            !grid.some(cell => cell === null) ? 'Draw' :
            'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        if (this.state.reverse) history = history.reverse();

        return (
            <div className="game app__game">
                <div className="game__item">
                    <div className="game__status">{status}</div>
                    <Board
                        grid={grid}
                        selectedCells={winner.line || []}
                        onClick={i => this.handleClick(i)}
                     />
                </div>
                <div className="game__item">
                    <History
                        history={history}
                        onReverse={this.handleReverse}
                        reverse={this.state.reverse}
                        selectedItemHistory={this.state.selectedItemHistory}
                        onJumpTo={i => this.handleJumpTo(i)}
                    />
                </div>
            </div>
        )
    }
}
