import { Box, Grid, IconButton, makeStyles } from "@material-ui/core";
import { amber, cyan, teal } from "@material-ui/core/colors";
import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import { ViewAddReviewForm } from "./ViewAddReviewForm";

const useStyles = makeStyles({
  bkgColor:{
    backgroundColor: amber[100], 
    height: '400px',
    width: '100%'    
  }, 
  root: {
    top: 0,
    left: 0,
    position: 'absolute'
  }
})

export const ViewAddReview = () => {
  const history = useHistory()
  const {bkgColor, root } = useStyles()


  return (
    <Grid
    container
    className={root}
    >
      <Box className={bkgColor}>
        <IconButton
          onClick={() => history.push('/home')}
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
        <ViewAddReviewForm />
      </Box>      
    </Grid>
  )
}