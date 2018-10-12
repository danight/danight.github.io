import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../actions';
import Input from '../../own-components/Input';
import Button from '../../own-components/Button';
import './index.css';

function randNum(from, to) {
    return Math.floor( to + Math.random() * (from - to + 1))
}

const COLORS = [
    '#ffc1c1',   'orange', '#dd0', 'palegreen', 
    'lightblue', '#ddd', 'fuchsia'
];

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '', color: '#999' }
    }

    add() {
        if (!this.state.value.trim()) return;
        this.props.onTodoAdd(this.state.value);
        
        this.setState({ 
            value: '' ,
            color: '#999'
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.add();
    }

    handleChange = e => {
        this.setState({ 
            value: e.target.value,
            color: COLORS[randNum(0, COLORS.length)]
        });
    }
    
    render() {
        const { value, color } = this.state;
        return (
            <form
                className="add-todo todo-app__add-todo todo-app__item"
                onSubmit={this.handleSubmit}
            >
                <Input
                    style={{ color }}
                    placeholder="what are we gonna do?" 
                    value={value}
                    onChange={this.handleChange}
                    autoFocus={true}
                    className="add-todo__input"
                />
                <Button 
                    type="simple" 
                    className="add-todo__button"
                >
                    add
                </Button>                
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoAdd: text => dispatch( addTodo(text) )
    }
} 

export default connect(
    null,   
    mapDispatchToProps
)(AddTodo);