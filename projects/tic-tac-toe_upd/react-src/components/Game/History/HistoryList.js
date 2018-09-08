import React from 'react';

export default class HistoryList extends React.Component {
    shouldComponentUpdate = nextProps => {
        if (this.props.history.length !== nextProps.history.length) {
            this.list.scrollTop =
            this.list.scrollHeight - this.list.offsetHeight;
        }

        return true;
    }

    render() {
        let items = this.props.history.map(item => {
            let desc = item.id ? `move to: ${item.id}` : 'move to start';

            const selected = this.props.selectedItemHistory === item.id ?
                'history__item_selected' : '';

            return (
                <li key={item.id}
                    className={`history__item ${selected}`}>
                    <button
                        className="history__button"
                        onClick={() => this.props.onClick(item.id)}>
                        {desc}
                    </button>
                </li>
            )
        });

        return (
            <ul className="history__list" ref={el => this.list = el}>
                {items}
            </ul>
        )
    }
}
