import React, {Component} from 'react';
import './index.css';

export default class Switchbox extends Component {
    handleClick = (e) => {
        const target = e.target.closest('.switchbox-container');
        if (!target || target && !e.currentTarget.contains(target)) return;
        
        this.props.onChange();
    }

    render() {
        return (
            <div 
                onClick={this.handleClick}
                className={`switchbox-container 
                    ${this.props.completed ? 'switchbox-container_checked' : ''}`}
            >
                <div className="switchbox__label">{this.props.children}</div>
                <div className="switchbox">
                    <div className="switchbox__thumb"></div>
                </div>
            </div>
        )
    }
}