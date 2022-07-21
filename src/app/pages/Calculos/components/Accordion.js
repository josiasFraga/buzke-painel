import React, { useState } from 'react';

export default function Accordion(props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div style={{cursor: 'pointer'}} onClick={() => setIsOpen(!isOpen)}>
                <h3><i className={(isOpen ? 'flaticon2-up' : 'flaticon2-down')} style={{color: '#3F4254'}}></i> {props.title}</h3>
                <hr />
            </div>
        
            <div className={"row " + (isOpen ? '' : 'hide')}>
                {props.children}
            </div>
        </>
    );
}