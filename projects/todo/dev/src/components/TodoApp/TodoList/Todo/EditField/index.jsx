import React from 'react';

export default function EditField({ text, className, onChange }) {
    return (
        <textarea 
            autoFocus={true}
            className={className}
            defaultValue={text} 
            onChange={onChange}
        />
    )
}