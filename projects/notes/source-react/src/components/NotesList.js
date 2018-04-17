import React from 'react';
import NoteItem from '../components/NoteItem';

export default class NotesList extends React.Component {
    reverseMap(notes, fn, context) {
        let res = [];
        for (var i = notes.length - 1; i >= 0; --i) {
            res.push(fn.call(context, notes[i], i, notes));
        }

        return res;
    }
    render() {
        const notes = this.reverseMap(this.props.notes, note => {
            return <NoteItem removeNote={this.props.removeNote}
                             completeEditNote={this.props.completeEditNote}
                             key={note.id} note={note} />
        })
        return (
            <div className="notes notes-panel__notes">
                {notes.length === 0 ? <div className="notes__empty">notes is empty</div> :
                    <div>
                        <h3 className="notes__headline">Notes</h3>
                        <div className="notes-list notes__notes-list">{notes}</div>
                    </div>
                }
            </div>
        )
    }
}
