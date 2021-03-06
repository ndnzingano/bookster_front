import { Box, Grid, IconButton, makeStyles } from "@material-ui/core";
import { cyan, teal } from "@material-ui/core/colors";
import React from "react";
import { ViewAddBookForm } from "./ViewAddBookForm";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../../providers/auth";

const useStyles = makeStyles({
  bkgColor:{
    backgroundColor: teal[100], 
    height: '400px',
    width: '100%'    
  }, 
  root: {
    top: 0,
    left: 0,
    position: 'absolute'
  }
})

export const ViewAddBook = () => {
  const history = useHistory()
  const {bkgColor, root } = useStyles()
  const {setBookUpdate} = useAuth()


  return (
    <Grid
    container
    className={root}
    >
      <Box className={bkgColor}>
        <IconButton
          onClick={() => {
            history.push('/home')
            setBookUpdate(null)
          }}
          style={{
            backgroundColor: 'white',
            marginTop: '20px',
            marginLeft: '40px'
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box component='div' style={{margin: 'auto'}}>
        <ViewAddBookForm />
      </Box>      
    </Grid>
  )
}