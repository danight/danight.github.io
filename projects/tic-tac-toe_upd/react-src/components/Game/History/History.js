import React from 'react';

import HistoryList from './HistoryList.js';
import './History.css';

export default function History(props) {
    return (
        <div className="history game__history">
            <div className="history__header">
                <h3 className="history__headline">histories</h3>
                <button
                    className="history__reverse"
                    onClick={props.onReverse} />
            </div>
            <HistoryList
                history={props.history}
                selectedItemHistory={props.selectedItemHistory}
                reverse={props.reverse}
                onClick={i => props.onJumpTo(i)}
            />
        </div>
    )
}
