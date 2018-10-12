import React, { Component } from 'react';
import Button from '../index.jsx';
import './index.css';

export default function Bookmark(props) {
    const className = props.className || '';
    return (
        <Button 
            {...props}
            className={`${className} ${props.active ? 'bookmark_active' : ''}`}
        />
    )
}