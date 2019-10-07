import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

function NewsList(props) {
    function handleClick(url) {
        window.open(url)
    }

    const classes = makeStyles(theme => ({
        newsList: {
            flex: 'auto',
        },
        title: {
            fontSize: '1.3em',
        },
        newsTitle: {
            margin: theme.spacing(2),
        },
        newsSection: {
            marginTop: theme.spacing(2),
        },
        loadingContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '10em',
        },
    }))();

    const newsKeys = Object.keys(props.news)
    const newsLength = newsKeys.length

    return <div className={classes.newsList}><Card>
        <CardContent>
            <Typography className={classes.title}>
                Notícias Encontradas
            </Typography>
            {newsLength === 0 && !props.loading ?
            <Typography color="textSecondary">
                Nenhuma Notícia
            </Typography> : null}
        </CardContent>
        </Card>

        {props.loading ? <Card className={classes.newsSection}>
            <CardContent className={classes.loadingContent}>
                <CircularProgress />
            </CardContent>
        </Card> : null}

        {newsKeys.map(k => {
            return (<Card className={classes.newsSection}><List>
            <Typography
                className={classes.newsTitle}
                color='textSecondary'>
                {k}
            </Typography>
            {props.news[k].map((n, i) => {
                return (<div key={i}>
                    <Divider />
                    <ListItem
                        button
                        onClick={() => {handleClick(n.link)}}>
                        <ListItemText primary={n.date_i + ' - ' + n.title + ' - ' + n.date_f} />
                    </ListItem>
                </div>)
            })}
            </List></Card>)
        })}
    </div>
}

NewsList.defaultProps = {
    news: {},
    loading: false,
}

export default NewsList;
