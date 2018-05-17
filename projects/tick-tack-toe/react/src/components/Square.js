import React from 'react';

export default class Square extends React.Component {
    render() {
        return (
            <button className={'board-square ' + (this.props.hightlight ?
                'board-square_hightlight' : '')}
                    ref={el => this.elem = el}
                    onClick={() => this.props.onClick(this.elem)}>
                {this.props.value}
            </button>
        )
    }
}
