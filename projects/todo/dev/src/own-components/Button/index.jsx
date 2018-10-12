import React from 'react';
import './index.css';

export default function Button({ children, disabled = false, type = 'simple', className = '', onClick = () => {}}) {
    return (
        <button 
            disabled={disabled}
            className={`${type} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}