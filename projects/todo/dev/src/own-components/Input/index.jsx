import React, {Component} from 'react';
import './index.css';

export default function Input({ className, style, onChange, value, placeholder, autoFocus }) {
    return (
        <input 
            style={style}
            className={`input ${className}`}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            autoFocus={autoFocus}
        />
    )   
}