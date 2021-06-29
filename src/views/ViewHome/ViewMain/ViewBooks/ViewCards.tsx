import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, createStyles, Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import React, { useState } from 'react';
import { IBooks } from '../../../../types/IBook';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '320px',
      marginTop: '30px',
      marginLeft: '40px'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    '@global':{
      '.MuiCardHeader-root': {
        height: '100px'
      }
    }
  }),
);

export const ViewCards = ({ books }) => {

  console.log('books :>> ', books);

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return(
    <>
    <Grid
    container
    direction='row'
    >
      {books.books.map((book, i) => (
        <Card className={classes.root}>
        <CardHeader       
          title={book.title}
          subheader={`${book.authorFirstName} ${book.authorLastName}`}
        />
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>
          {/* <Typography variant="body2" color="textSecondary" component="p">
           futuras ratings
          </Typography> */}
          <Typography variant="body2" color="textSecondary" component="p">
            {`Pages:${book.pagesNr} + | ISBN: ${book.isbn}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => handleExpandClick()}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>futura descrição</Typography>
          </CardContent>
        </Collapse>
      </Card>
      ))}
      </Grid>
    </>
  )
  
};
