import React from 'react';

export default class AddingNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }
    componentDidMount() {
        this.input.focus();
    }
    onChange = e => {
        this.setState({
            value: e.target.value
        })
    }
    onSubmit = e => {
        e.preventDefault();
        if (this.state.value.trim() === '') return;
        this.props.addNote(this.state.value);
    }
    render() {
        return (
            <form className="adding-notes notes__adding-notes" onSubmit={this.onSubmit}>
                <textarea className="adding-notes__input" value={this.state.value}
                          ref={inp => this.input = inp}
                          onChange={this.onChange} />
                <input className="adding-notes__input" type="submit" value="add note" />
            </form>
        )
    }
}