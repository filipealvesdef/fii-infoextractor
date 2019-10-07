import React, { useState } from 'react';
import SearchTerm from './SearchTerm';
import uuid from 'uuid/v1';

function News() {
    const [terms, updateTerms] = useState([{
        'text': '',
        'id': uuid(),
        'editing': true,
    }])

    function submitSearch() {
        console.log(terms)
    }

    function removeSearchTerm(id) {
        updateTerms(terms.filter(t => t.id !== id))
    }

    function editSearchTerm(id) {
        updateTerms(terms.map(t => {
            t.editing = false;
            if (t.id === id) {
                t.editing = true;
            }
            return t;
        }))
    }

    function updateSearchTerm(term) {
        updateTerms(terms.map(t => {
            t.editing = false
            if (t.id === term.id) {
                t.text = term.text;
            }
            return t;
        }))
    }

    function addSearchTerm() {
        updateTerms(terms.map(t => {
            t.editing = false
            return t
        }).concat([{
            id: uuid(),
            text: '',
            editing: true,
        }]))
    }

    return <div>
        {terms.map(t =>
        <SearchTerm
            key={t.id}
            id={t.id}
            text={t.text}
            editing={t.editing}
            update={updateSearchTerm}
            edit={editSearchTerm}
            remove={removeSearchTerm}
        />)}
        <button onClick={addSearchTerm}>Add new</button>
        <button onClick={submitSearch}>Submit</button>
        <button onClick={submitSearch}>Save Terms</button>
    </div>
}

export default News;
