import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';

function SearchTerm(props) {
    const [currText, updateText] = useState(props.text);
    const inputRef = useRef(null);

    useEffect(() => {
        if (props.editing) {
            inputRef.current.focus();
        }
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [props.editing]);

    function handleUpdate() {
        props.update({
            id: props.id,
            text: currText,
        })
    }

    function handleOutsideClick(e) {
        if (props.editing && inputRef.current &&
            !inputRef.current.contains(e.target)) {
            handleUpdate()
        }
    }

    function handleChange(input) {
        updateText(input);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleUpdate()
        }
    }

    function deleteSearchTerm() {
        props.remove(props.id);
    }

    const classes = makeStyles({
        searchTerm: {
            margin: '0.5em',
            display: 'inline-block',
            borderRadius: '3px',
            border: '1px solid #ccc',
            '& div': {
                display: 'inline',
                padding: '0.5em',
            },
            '& input': {
                background: '#dedede',
                border: 'none',
                borderRadius: '3px 0 0 3px',
                marginRight: '0px',
                padding: '0.5em',
                width: (currText.length > 0 ? currText.length : 1) + 'ch',
            },
            '& input:focus': {
                outline: 'none',
            }
        },
        deleteBtn: {
            background: '#dedede',
            border: 'none',
            borderRadius: '0 3px 3px 0',
            padding: '0.5em',
        }
    })();

    return <div className={classes.searchTerm}>
        {props.editing ? <input value={currText}
            onChange={e => {handleChange(e.target.value)}}
            onKeyDown={handleKeyDown}
            ref={inputRef}
        /> : <div onClick={e => {props.edit(props.id)}}>{currText}</div>}
        <button
            onClick={deleteSearchTerm}
            className={classes.deleteBtn}
        >X
        </button>
    </div>
}

export default SearchTerm;
