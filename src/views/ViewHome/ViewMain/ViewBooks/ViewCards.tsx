import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, createStyles, Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from 'react';
import { IBook, IBooks } from '../../../../types/IBook';
import { CardComponent } from './Card';
import { useAuth } from '../../../../providers/auth';


export const ViewCards = ({ books }) => {

  const {} = useAuth()

  return(
    <>
    <Grid
    container
    direction='row'
    style={{ backgroundColor: grey[200], paddingBottom: '100px', height: 'fit-content' }}
    > 
      {     
      books.books.map((book: IBook, i) => { 
        
        return(
        <Box style={{height: 'fit-content'}}>
          <CardComponent book={book} id={i}/>
        </Box>
      )})
      }

      </Grid>

    </>
  )
  
};
