import React from 'react';
import Button from '../Button';
import './index.css';

export default function Confirm({ quest, className, yes, no }) {
    return (
        <div className={`confirm ${className}`}>
            <h3 className="confirm__question">{quest}</h3>
            <div className="confirm__button-group">
                <Button 
                    type="simple"
                    className="confirm__yes"
                    onClick={yes}
                >
                    yes
                </Button>
                <Button
                    type="simple"
                    className="confirm__no"
                    onClick={no}
                >
                    no
                </Button>
            </div>
        </div>
    )
}