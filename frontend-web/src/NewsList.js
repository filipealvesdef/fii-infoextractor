import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function NewsList(props) {
    function handleClick(url) {
        console.log(url)
    }

    const classes = makeStyles({
        newsList: {
            flex: 'auto',
            maxWidth: '50em',
        }
    })();

    return <Card className={classes.newsList}>
        <CardContent>
            <Typography color="textSecondary">
                Notícias Encontradas
            </Typography>
        </CardContent>
        <List>{props.news.map((n, i) => {
            return (<div key={i}>
                <Divider />
                <ListItem
                    button
                    onClick={() => {handleClick(n.url)}}>
                    <ListItemText primary={n.title} />
                </ListItem>
            </div>)})}
        </List>
    </Card>;
}

export default NewsList;
