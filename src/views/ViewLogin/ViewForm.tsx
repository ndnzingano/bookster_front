import { Button, Grid, Link, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useAuth } from "../../providers/auth";
import { variables } from "../../utils/config";
import { useHistory } from 'react-router-dom'
import { blueGrey } from "@material-ui/core/colors";

const useStyle = makeStyles({
  root: {
    paddingLeft: 'calc(100% - 375px)',
    marginTop: '170px',
    width: '320px'

  }, 
  gridText: {
    width: '300px',
    marginTop: '20px'
  },
  gridButton: {
    marginTop: '20px',
    width: '300px',
    cursor: 'pointer'
  }, 
  '@global': {
    '@font-face': [
      {
        fontFamily: "'Castoro', serif"
      }
    ]
  },
  logo:{
    fontFamily: 'Castoro',
    fontSize:'70px', 
    paddingRight: '120px', 
    color: blueGrey[800]
  }
})

export const ViewForm = () => {
  const history = useHistory()
  const {root, gridText, gridButton, logo} = useStyle()
  const {emailLabel, loginLabel, passwordLabel, signInLabel, logoShorthand} = variables

  const {handleLogin, setLogin, login, handleToken, token, authorization} = useAuth()

  useEffect(() => {
    if(token !== null) {
      handleLogin(login)
    }

  }, [token])

  useEffect(() => {

    if(authorization)
     history.push('/home')
  },[authorization])


  return (
    <>
    <Grid
      container
      direction='column'
      justify='flex-end'
      alignItems='flex-end'
      className={root}  
    >
      <Grid>
        <Typography className={logo}>{logoShorthand}</Typography>
      </Grid>
      <Grid item className={gridText}>
        <TextField 
          fullWidth
          required
          variant='outlined' 
          color='primary' 
          label={emailLabel}
          onBlur={(e) => setLogin({...login, email: e.target.value})}
        />
      </Grid>
      <Grid item className={gridText}>  
        <TextField 
        fullWidth
        type='password'
          variant='outlined' 
          color='primary' 
          label={passwordLabel}
          onBlur={(e) => setLogin({...login, password: e.target.value})}
        />
      </Grid>
      <Grid item className={gridButton}>  
        <Button 
          fullWidth
          variant='contained' 
          color='primary'
          onClick={async () => {
            await handleToken(login)
         
           
          }}
        >
          {loginLabel}
        </Button>
      </Grid>
      <Grid item className={gridButton}>
      <Link 
      color='secondary'
      onClick={() => history.push('/signup')}      
      >
        <Typography variant='button' color='secondary'>
          {signInLabel}
        </Typography>
       </Link>
      </Grid>
    </Grid>
    </>
  )
}