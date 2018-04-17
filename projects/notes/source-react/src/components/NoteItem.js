import React from 'react';
import EditNoteText from '../components/EditNoteText';

function addZero(val) {
    if (val < 10) val = '0' + val;
    return val;
}
function formatTime(date) {
    let hh = addZero( date.getHours() ),
        mm = addZero( date.getMinutes() ),
        ss = addZero( date.getSeconds() );

    return {hh: hh, mm: mm, ss: ss};
}

export default class NoteItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field: props.note.text,
            edit: ''
        }
    }
    completeEditNote = (data) => {
        this.setState({ field: data });

        if (data === this.state.field.props.data) return;
        this.props.completeEditNote(this.props.note, data);

        this.setState({ edit: 'edited'})
    }
    editNote() {
        this.setState({
            field: <EditNoteText data={this.state.field}
                                 completeEditNote={this.completeEditNote} />
        })
    }
    removeNote() {
        this.props.removeNote(this.props.note);
    }
    onClick = e => {
        let btn = e.target.closest('.note-config__btn');
        if (!btn) return;

        if (btn.classList.contains('note-config__remove')) {
            this.removeNote();
            return;
        }

        this.editNote();
    }
    render() {
        const note = this.props.note;
        const time = formatTime(note.date);
        return (
            <div className="note notes-list__note">
                <div onClick={this.onClick}
                     className="note-config">
                    {this.state.edit !== '' ?
                        <span className="note-config__status-edit note-config__item">
                            {this.state.edit}
                        </span> : null}
                    <button className="note-config__edit note-config__edit__item
                        note-config__btn">e</button>
                    <button className="note-config__remove note-config__edit__item
                        note-config__btn">r</button>
                </div>
                <h4 className="note__headline">Note {note.id}</h4>
                <p className="note__text">{this.state.field}</p>
                <div className="note__date">date: {time.hh}:{time.mm}:{time.ss}</div>
            </div>
        )
    }
}