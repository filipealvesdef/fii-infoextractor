import React, { useState } from 'react';
import SearchTerm from './SearchTerm';
import NewsList from './NewsList';
import { ENDPOINT } from './config';

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
    const storedTerms = localStorage.getItem('terms');
    const initialTerms = storedTerms ? JSON.parse(storedTerms) : [{
        'text': '',
        'id': uuid(),
        'editing': true,
    }];

    const [terms, updateTerms] = useState(initialTerms)
    const [newsList, updateNewsList] = useState({});
    const [loading, updateLoading] = useState(false)

    function submitSearch() {
        updateNewsList({});
        const termsList = terms.map(t => t.text);
        updateLoading(true)
        fetch(ENDPOINT.news, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(termsList)
        }).then(
            r => r.json()
        ).then(
            r => {
                updateNewsList(r);
                updateLoading(false);
            }
        )
    }

    function removeSearchTerm(id) {
        const ts = terms.filter(t => {
            t.editing = false;
            return t.id !== id;
        })
        localStorage.setItem('terms', JSON.stringify(ts));
        updateTerms(ts);
    }

    function editSearchTerm(id) {
        const ts = terms.map(t => {
            t.editing = false;
            if (t.id === id) {
                t.editing = true;
            }
            return t;
        })
        localStorage.setItem('terms', JSON.stringify(ts));
        updateTerms(ts);
    }

    function updateSearchTerm(term) {
        const ts = terms.map(t => {
            t.editing = false
            if (t.id === term.id) {
                t.text = term.text;
            }
            return t;
        })
        localStorage.setItem('terms', JSON.stringify(ts));
        updateTerms(ts);
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
            maxWidth: '300px',
            padding: theme.spacing(1),
            marginRight: theme.spacing(2),
        },
        flexWrapper: {
            display: 'flex',
            alignItems: 'start',
            margin: theme.spacing(2),
        }
    }))();

    return <div className={classes.flexWrapper}>
        <Card className={classes.filterPanel}>
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
                        Buscar
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
        <NewsList news={newsList} loading={loading}/>
    </div>;
}

export default News;
