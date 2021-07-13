import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, createStyles, Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../../providers/auth";
import EditIcon from '@material-ui/icons/Edit';
import { amber } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '320px',
      marginTop: '30px',
      marginLeft: '40px', 
      // minHeight: '550px'
    },
    media: {
      height: '100px',
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
  const { reviews, books, ratings, loading, setBookUpdate } = useAuth()
  const history = useHistory()
  
 
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const [image, setImage] = useState(null)

  const handleImageChange = () => {
    const selected = book.book.coverImage
    console.log('selected :>> ', selected);

    const ALLOWED_TYPES = ['image/jpg', 'image/jpeg', 'image/png']

    if(selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader()

      reader.readAsText = () => {
        setImage(selected)
        
      
      }
   
    } else {
    }
  };

  useEffect(() => {
    handleImageChange()
  }, [])
  return( 
    <> 
        <Card className={classes.root}>
        <CardHeader       
          title={book.book.title}
          subheader={`${book.book.authorFirstName} ${book.book.authorLastName}`}
        />
        <CardMedia
          className={classes.media}
          image={`C:/Users/nadin/Documents/Projetos/ppi2/library_backend/utils/img/books/${book.book.coverImage}`}
          title="Paella dish"
        />
       {/* <div
       style={{
        background:  `url("C:/Users/nadin/Documents/Projetos/ppi2/library_backend/utils/img/books/${book.book.coverImage}") no-repeat center/cover` ,
        height: '230px',
        width: '150px',
        marginLeft: '70px'
       }}>

       </div> */}

        <CardContent>
          <Grid
            container
            direction='row'
          >         
            <Typography variant="body2" color="textSecondary" component="p"
            
            style={{width: '200px', paddingTop: '20px', paddingRight: '33px'}}
            >
              {`Pages:${book.book.pagesNr} | ISBN: ${book.book.isbn}`}
            </Typography>
          <IconButton
            onClick={() => {
              history.push('/update/book')
              setBookUpdate(book.book)
            }}
          >
            <EditIcon style={{fontSize: '30px', color: amber[700]}}/>
          </IconButton>
         </Grid>
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
            <Typography paragraph>{book.book.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
      </>
  )
};
