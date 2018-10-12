import React, {Component} from 'react';
import Switchbox from '../../../../own-components/Switchbox';
import Button from '../../../../own-components/Button';
import Bookmark from '../../../../own-components/Button/Bookmark';
import Confirm from '../../../../own-components/Confirm';
import TogglerDisplayContent from './TogglerDisplayContent';
import EditField from './EditField';
import './index.css';

function trim(text, max) {
    return text.length > max ? text.slice(0, max - 1) + '…' : text;
}

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpand: false,
            isEditing: false,
            isDelete: false,
            startText: props.text,
            editableText: props.text
        }
    }

    toggleEditTodo = () => {
        this.setState({ 
            isEditing: !this.state.isEditing,
            editableText: this.props.text
        });
    }

    handleCancelEdit = () => {
        this.toggleEditTodo();
    }   

    handleSaveEdit = () => {
        this.props.onChangeTodo(this.state.editableText);
        this.toggleEditTodo();
    }

    handleChangeTodo = e => {
        this.setState({ editableText: e.target.value });
    }

    handleDeleteTodo = () => {
        this.setState({ isDelete: !this.state.isDelete });
    }

    handleOnToggleDispalyContent() {
        this.setState({ isExpand: !this.state.isExpand });
    }

    render() {
        const { text, completed, bookmark, date, number, onToggleTodo, onToggleBookmarkTodo } = this.props;
        const { isExpand, isEditing, isDelete, editableText } = this.state;
        const trimmingText = trim(text, 70);

        return (
            <div className={`todo ${completed ? 'todo_completed' : ''} todo-list__todo`}>
                { (isDelete) ?
                    <Confirm 
                        quest="Are you sure?"
                        yes={() => this.props.onDeleteTodo()}
                        no={() => this.handleDeleteTodo()}
                        className="todo__confirm"
                    />               
                : null}
                <div className="tool-panel todo__tool-panel">
                    {isEditing ? 
                        <React.Fragment>
                            <Button
                                type="save"
                                onClick={this.handleSaveEdit}
                                className="tool-panel__edit-button"
                            />
                            <Button
                                type="cancel"
                                onClick={this.handleCancelEdit}
                            />
                        </React.Fragment>
                        : 
                        <React.Fragment>
                            <Bookmark 
                                active={bookmark}
                                type="bookmark"
                                onClick={onToggleBookmarkTodo}
                                className="tool-panel__bookmark-button"
                            />
                            <Button 
                                type="edit"
                                onClick={this.toggleEditTodo}
                                className="tool-panel__edit-button"
                            />
                            <Button 
                                type="delete"
                                onClick={this.handleDeleteTodo}
                            />
                        </ React.Fragment>
                    }
                </div>
                <h3 className="todo__headline">todo {number + 1}</h3>
                {isEditing ?
                    <EditField
                        className="todo__edit-field"
                        text={editableText}
                        onChange={this.handleChangeTodo}
                    />
                    : 
                    <Switchbox 
                        completed={completed}
                        onChange={() => onToggleTodo()}>
                        {isExpand ? text : trimmingText }
                    </Switchbox>
                }
                <div className="todo__date">date: {date.toLocaleDateString('en')}</div>
                {text.length > 70 ? 
                    <TogglerDisplayContent
                        isExpand={isExpand}
                        onToggleClick={() => this.handleOnToggleDispalyContent()} 
                    />
                    : null
                } 
            {/* } */}
            </div>
        )
    }
}