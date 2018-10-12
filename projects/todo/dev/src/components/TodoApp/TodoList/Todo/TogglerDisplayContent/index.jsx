import React from 'react';
import './index.css';

export default function TogglerDispalyContent({ isExpand, onToggleClick }) {
    return (
        <button
            className="toggler-display-content"
            onClick = {onToggleClick}
        >
            {isExpand ? 'hide' : 'more'}
        </button>
    )
}