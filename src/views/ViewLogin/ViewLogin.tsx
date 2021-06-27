import { Box, Button, Grid, makeStyles, TextField, Typography, TypographyVariant } from "@material-ui/core";
import { amber, blueGrey, orange, teal } from "@material-ui/core/colors";
import React from "react";
import { variables } from "../../utils/config";
import { ViewForm } from "./ViewForm";

const useStyle = makeStyles({
  '@global': {
    '@font-face': [
      {
        fontFamily: "'Castoro', serif"
      }
    ]
  },
  colorBkg: {
    height: '100%', 
    width: 'calc(100% - 530px)', 
    backgroundColor: amber[50],
    top:0,
    left:0,
    bottom:0,
    position: 'absolute'
  }, 
  login: {
    height: '100%',
    width: '530px',
    rigth: '100px'

  }
})

const Books = () => {return(<Typography style={{fontFamily:'Castoro'}}>books</Typography>)}

const Toread = () => { 
  return(
    <>
      <Typography style={{fontFamily:'Castoro', fontStyle: 'italic', color: teal[700]}}>{'to '}</Typography>
      <Typography style={{fontFamily:'Castoro', fontStyle: 'italic', color: teal[900]}}>{'read '}</Typography>
    </>
  )}
export const ViewLogin = () => {
  const {colorBkg} = useStyle()


  return (
    <>
      <Grid
        container
      >
        <Box component='div' className={colorBkg}>
          <Grid>

            <Typography style={{fontFamily: 'Castoro', fontSize: '3rem', paddingTop: '200px', paddingLeft: '100px'}}>{'Bookstr'}</Typography>
            <Grid
              container
              direction='row'
              justify='flex-start'
              alignItems='flex-start'
            >
              <Typography>your</Typography>
              <Books />
              <Toread /> 
              <Typography>management tool </Typography>
            </Grid>
          </Grid>
        </Box>
        <ViewForm />  
      </Grid>
    </>
  )
}