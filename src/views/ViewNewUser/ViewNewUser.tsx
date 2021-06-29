import { Box, Grid, makeStyles } from "@material-ui/core";
import { cyan, teal } from "@material-ui/core/colors";
import React from "react";
import { ViewForm } from "./ViewForm";

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

export const ViewNewUser = () => {
  const {bkgColor, root } = useStyles()


  return (
    <Grid
    container
    className={root}
    >
      <Box className={bkgColor}></Box>
      <Box component='div' style={{margin: 'auto'}}>
        <ViewForm />
      </Box>      
    </Grid>
  )
}