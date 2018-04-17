import React from 'react';
import AddingNotes from '../components/AddingNotes';
import NotesList from '../components/NotesList';

export default class NotesPanel extends React.Component {
    constructor() {
        super();
        this.state = { notes: [] };
    }
    addNote = (data) => {
        let note = Object.create(null);

        note.id = this.state.notes.length + 1;
        note.text = data;
        note.date = new Date();

        this.state.notes.push(note);
        this.setState({
            notes: this.state.notes
        })
    }
    forEach(arr, find, action, context) {
        for (var i = 0; i < arr.length; ++i) {
            if (!find.call(context, arr[i], i)) continue;
            action.call(context, arr[i], i);
        }
    }
    removeNote = (note) => {
        let notes = this.state.notes;

        this.forEach(notes, item => {
            return note === item;
        }, (note, inx) => {
            notes.splice(inx, 1);
        });

        this.setState({
            notes: notes
        });
    }
    completeEditNote = (note, data) => {
        let notes = this.state.notes;

        this.forEach(notes, item => {
            return note === item;
        }, (note, inx) => {
            notes[inx].text = data;
        });

        this.setState({
            notes: notes
        });
    }
    render() {
        const notes = this.state.notes;
        return (
            <div>
                <AddingNotes addNote={this.addNote} />
                <NotesList removeNote={this.removeNote}
                           completeEditNote={this.completeEditNote} notes={notes} />
            </div>
        )
    }
}
