import React, { useState } from 'react';
import SearchTerm from './SearchTerm';
import uuid from 'uuid/v1';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

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

    const classes = makeStyles(theme => ({
        button: {
            margin: theme.spacing(1),
        },
        addIcon: {
            width: '0.8em',
            height: '0.8em',
        },
    }))();

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

        <IconButton
            onClick={addSearchTerm}>
            <AddIcon className={classes.addIcon} />
        </IconButton>

        <div>
            <Button
                className={classes.button}
                variant='contained'
                color='primary'
                onClick={submitSearch}>
                Submit
            </Button>
        </div>
    </div>
}

export default News;
