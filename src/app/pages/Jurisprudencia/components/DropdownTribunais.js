import React, { memo, useState } from 'react';
import {
    Checkbox,
    FormControlLabel,
  } from "@material-ui/core";

function DropdownTribunais(props) {
    const [closedTribunais, setClosedTribunais] = useState([]);
   
    const openTribunal = (name) => {
        setClosedTribunais(closedTribunais.filter(tribunal => tribunal != name));
    }

    const closeTribunal = (name) => {
        let _closedTribunais = [...closedTribunais];
        _closedTribunais.push(name);     
        setClosedTribunais(_closedTribunais);   
    }

    const isAllChildrenChecked = (name) => {
        const childrenCount = props.tribunais.find(tribunal => tribunal.name === name).children.length;
        const childrenCheckedCount = props.tribunais.find(tribunal => tribunal.name === name).children.filter(child => child.checked).length;

        return (childrenCount === childrenCheckedCount);
    }

    const changeChildrenChecked = (tribunalName, childName) => {
        let _tribunais = [...props.tribunais];
        const childElement = _tribunais.find(tribunal => tribunal.name === tribunalName).children.find(child => child.name === childName);
        childElement.checked = !childElement.checked;

        props.setTribunais(_tribunais);
    }

    const changeParentChecked = (tribunalName) => {
        const childrenCount = props.tribunais.find(tribunal => tribunal.name === tribunalName).children.length;
        let _tribunais = [...props.tribunais];

        if (childrenCount == 0) {
            _tribunais.find(tribunal => tribunal.name === tribunalName).checked = !_tribunais.find(tribunal => tribunal.name === tribunalName).checked;
        } else {
            let uncheck = isAllChildrenChecked(tribunalName);

            _tribunais.find(tribunal => tribunal.name === tribunalName).children = _tribunais.find(tribunal => tribunal.name === tribunalName).children.map(child => ({
                ...child,
                checked: !uncheck
            }));

            _tribunais.find(tribunal => tribunal.name === tribunalName).checked = !uncheck;
        }

        props.setTribunais(_tribunais);
    }

    return (
        <>
        {props.tribunais.map((tribunal, key) => 
            <>
                <div className="d-flex">
                    <FormControlLabel
                        style={{marginLeft: '-10px'}}
                        className="flex-grow-1"
                        onChange={() => changeParentChecked(tribunal.name)}
                        control={
                            <Checkbox
                                checked={isAllChildrenChecked(tribunal.name)}
                                color="default"
                                checked={tribunal.checked}
                                value="checkedG"
                                inputProps={{
                                    "aria-label": "checkbox with default color"
                                }}
                            />
                        }
                        label={tribunal.name}
                    />
            {tribunal.children.length > 0 && <>
                { !closedTribunais.includes(tribunal.name) &&
                    <i className="flaticon2-down icon-nm" style={{marginTop: '11px', cursor: 'pointer'}} onClick={() => closeTribunal(tribunal.name)}></i>
                }
                { closedTribunais.includes(tribunal.name) &&
                    <i className="flaticon2-up icon-nm" style={{marginTop: '11px', cursor: 'pointer'}} onClick={() => openTribunal(tribunal.name)}></i>
                }
            </>}
                
                </div>
                {tribunal.children.length > 0 && tribunal.children.map(child => 
                    <FormControlLabel
                        className={closedTribunais.includes(tribunal.name) ? '' : 'd-none'}
                        style={{marginLeft: '10px'}}
                        onChange={() => changeChildrenChecked(tribunal.name, child.name)}
                        control={
                            <Checkbox
                                checked={child.checked}
                                className={closedTribunais.includes(tribunal.name) ? '' : 'd-none'}
                                color="default"
                                value="checkedG"
                                inputProps={{
                                "aria-label": "checkbox with default color"
                                }}
                        />
                        }
                        label={child.name}
                    />
                )}

          </>
            )}
    </>
    );
}

export default memo(DropdownTribunais);