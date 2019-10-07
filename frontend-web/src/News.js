import React, { useState } from 'react';
import SearchTerm from './SearchTerm';
import uuid from 'uuid/v1';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
        updateTerms(terms.filter(t => {
            t.editing = false;
            return t.id !== id;
        }))
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
        addSearchTerm();
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
        addIcon: {
            width: '0.8em',
            height: '0.8em',
        },
        filterPanel: {
            margin: theme.spacing(2),
            maxWidth: '300px',
            padding: theme.spacing(1),
        }
    }))();

    return <Card className={classes.filterPanel}>
        <CardContent>
            <Typography color="textSecondary" gutterBottom>
                Adicione nomes de FIIs de interesse
            </Typography>
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

            <CardActions>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={submitSearch}>
                    Submit
                </Button>
            </CardActions>
        </CardContent>
    </Card>;
}

export default News;
