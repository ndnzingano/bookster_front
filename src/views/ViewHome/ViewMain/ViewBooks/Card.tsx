import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, createStyles, Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../../providers/auth";
import { IBook } from "../../../../types/IBook";
import { BookSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '320px',
      marginTop: '30px',
      marginLeft: '40px', 

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



export const CardComponent = (book: any, i: any) => {
  // console.log('book :>> ', book);
  const { reviews, handleGetReviewByBookId, books, ratings, loading, setLoading, handleRatings } = useAuth()


  useEffect(() => {
    handleGetReviewByBookId(book.book.id)    
  }, [])
 
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);





  return( 
    <> 
        <Card className={classes.root}>
        <CardHeader       
          title={book.book.title}
          subheader={`${book.book.authorFirstName} ${book.book.authorLastName}`}
        />
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>         
          <Typography variant="body2" color="textSecondary" component="p">
            {`Pages:${book.book.pagesNr} | ISBN: ${book.book.isbn}`}
          </Typography>
          {
            ratings.map(rating => {
             if(book.book.id === rating.id){
              return (
                <Box>
                  <Rating name="book-review" value={rating.rating} readOnly/>
                </Box>
                )                           
               }  
            })           
          }
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() =>{setExpanded(!expanded)}}
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
      </>
  )
};
