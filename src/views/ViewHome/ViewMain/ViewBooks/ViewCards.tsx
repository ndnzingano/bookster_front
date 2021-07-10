import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, createStyles, Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from 'react';
import { IBook, IBooks } from '../../../../types/IBook';
import { useAuth } from '../../../../providers/auth';
import { CardComponent } from './Card';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { useHistory } from 'react-router-dom';
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

export const ViewCards = ({ books }) => {
   const {ratings, loading} = useAuth()
   const history = useHistory()


  return(
    <>
    <Grid
    container
    direction='row'
    style={{ backgroundColor: grey[200], paddingBottom: '30px' }}
    > 
      {     
      books.books.map((book: IBook, i) =>  (<CardComponent book={book} id={i} />))}

      </Grid>
      <Grid
      justify='flex-end'
      alignItems='flex-end'
    
      >
      <Box>
        <IconButton
          onClick={() => history.push('/add/books')}
        
        >
          <MenuBookIcon style={{fontSize: '30px'}}/>
        </IconButton>
      </Box>
      </Grid>
    </>
  )
  
};
