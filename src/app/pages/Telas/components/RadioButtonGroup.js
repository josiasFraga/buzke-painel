import React, { useState } from 'react';

export default function RadioButtonGroup(props) {
    return (
        <div className="btn-group btn-group-md" style={{borderRadius: '5px', border: props.invalid ? '1px solid #F64E60' : ''}}>
        { props.options.map(option => (
            <button
                type="button"
                key={option.key}
                className={`btn ${props.value === option.key ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => props.onClick(option.key)}
                disabled={props.readOnly}
            >
                
            {option.value}
            </button>
        ))}
        </div>
    );
}