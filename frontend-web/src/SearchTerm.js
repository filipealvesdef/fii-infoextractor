import React, { useState, useEffect, useRef } from 'react';

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

    return <div>
        {props.editing ? <input value={currText}
            onChange={e => {handleChange(e.target.value)}}
            onKeyDown={handleKeyDown}
            ref={inputRef}
        /> : <div onClick={e => {props.edit(props.id)}}>{currText}</div>}
        <button onClick={deleteSearchTerm}>Delete me</button>
    </div>
}

export default SearchTerm;
