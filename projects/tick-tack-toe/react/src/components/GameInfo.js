import React from 'react';

export default class GameInfo extends React.Component {
    constructor(props) {
        super(props);

        this.prevSelected = null;
        this.isClicked = false;
    }

    componentWillReceiveProps(props, next) {
        if (!this.isClicked) this.scrollList();
        this.isClicked = !this.isClicked;
    }

    scrollList() {
        delay(() => {
            this.list.scrollTop = this.list.scrollHeight
        }, 25);
    }

    reverseMoves = () => {
        const items = this.list.querySelectorAll('li');
        this.list.innerHTML = '';

        for (var i = items.length - 1; i >= 0; i--) {
            this.list.appendChild(items[i]);
        }
    }

    getMoves() {
        const moves = this.props.history.map((move, step) => {
            const desc = step               ?
                'move to ' + step + ' step' :
                'move to start'

            return (
                <li key={move.id}>
                    <button className="info__step"
                            ref={el => this.elem = el}
                            onClick={(e) => this.handleClick(step, e)}>
                        {desc}
                    </button>
                </li>
            )
        });

        return moves;
    }

    handleClick(inx, e) {
        this.isClicked = true;
        this.props.onClick(inx);

        if (this.prevSelected) {
            this.prevSelected.classList.remove('info__step_selected');
        }

        this.prevSelected = e.target;
        this.prevSelected.classList.add('info__step_selected');
    }

    render() {
        const moves = this.getMoves();
        return(
            <div className="info game__info">
                <div className="info__status">{this.props.status}</div>
                <div className="info__step-list-wrapper">
                    <button className="info__step-list-reverse"
                            onClick={this.reverseMoves}></button>
                    <ul className="info__step-list"
                        ref={list => this.list = list}>{moves}</ul>
                </div>
            </div>
        )
    }
}

//additional fns
function delay(fn, ms) { setTimeout(() => fn(), ms); }
