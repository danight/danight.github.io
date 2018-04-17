import React from 'react';

export default class EditNoteText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: props.data}
    }
    componentDidMount() {
        this.input.focus();
    }
    onChange = e => {
        this.setState({
            value: e.target.value
        })
    }
    onBlur = () => {
        this.props.completeEditNote(this.state.value);
    }
    render() {
        return (
            <textarea className="note__edit-field"
                      type="text"
                      ref={inp => this.input = inp }
                      value={this.state.value}
                      onChange={this.onChange}
                      onBlur={this.onBlur} />
        )
    }
}