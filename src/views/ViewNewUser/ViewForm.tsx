import React, { useState } from "react";
import { Button, Grid, IconButton, InputAdornment, InputLabel, makeStyles, OutlinedInput, Paper, TextField, Typography } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { variables } from "../../utils/config";
import { useAuth } from "../../providers/auth";
import { teal } from "@material-ui/core/colors";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyle = makeStyles({
  paperRoot: {
    width: '800px',
    height: '470px',
    marginTop: '-250px',
    zIndex: 0
  }, 
  root: {
    height: '100%',
    width: '100%'
  }, 
  titleContainer: {
    paddingLeft: '238px',
    marginTop: '34px',
    color: teal[800] ,
    paddingBottom: '11px'
  },
  formContainer: {
    width: '300px',
    marginLeft: '60px',
    marginTop: '20px'
  },
  textFieldLeft: {
    width: '300px', 
    marginTop: '20px'
  },
  textFieldRight: {
    width: '300px', 
  },
  passwordInputLabel: {
    fontSize: '12px'
  },
  passwordLabelError: {
    fontSize: '12px',
    color: '#f44336'
  },
  passwordContainer: {
    marginTop: '10px'
  },
  button: {
    marginTop: '27px',
    marginLeft: '190px',
    width: '110px'
  }
})
export const ViewForm = () => {

  const {user, setUser, handleAddUser} = useAuth()

  const {
    nameLabel, 
    lastNameLabel, 
    emailLabel, 
    passwordLabel, 
    birthdayLabel, 
    confirmPasswordLabel,
    registrationLabel,
    confirmLabel, 
    passwordMismatchError
  
  } = variables

  const { 
    paperRoot, 
    root, 
    titleContainer, 
    formContainer, 
    textFieldLeft, 
    textFieldRight,
    button,
    passwordInputLabel,
    passwordLabelError,
    passwordContainer
  } = useStyle()

  const [selectedDate, handleDateChange] = useState(new Date());
  const [password, setPassword] = useState({
    password1: '',
    password2: '', 
    error: false,
    showPassword: false
  });

  const handlePasswordVerification = (password) => {

    if (password.password1 === password.password2) {
      setUser({...user, password: password.password1})
      setPassword({...password, error: false})

    } else {
      if(password.password2 === '' || password.password1 === '') {
        setPassword({...password, error: false})
      } else {
        setPassword({...password, error: true})

      }
    }
  }


  return (
    <Grid
      container
      className={root} 
    >
      <Paper 
        elevation={3} 
        className={paperRoot}
      >
        <Grid
          container 
        >
          <Grid 
            className={titleContainer}
          >
            <Typography variant='h3' style={{fontSize:'30px'}}>{registrationLabel}</Typography>
          </Grid>
          <Grid container
          direction='row'
          >
            <Grid
            direction='column'
            className={formContainer}
            > 
              <Grid item>  
                <TextField 
                  required
                  className={textFieldLeft}
                  variant='outlined' 
                  color='primary' 
                  label={nameLabel}
                  onBlur={(e) => setUser({...user, firstName: e.target.value})}
                />
              </Grid>
              <Grid item>  
                <TextField 
                  required
                  className={textFieldLeft}
                  variant='outlined' 
                  color='primary' 
                  label={lastNameLabel}
                  onBlur={(e) => setUser({...user, lastName: e.target.value})}
                />
              </Grid>
              <Grid item>  
                <TextField 
                  required
                  className={textFieldLeft}
                  variant='outlined' 
                  color='primary' 
                  label={emailLabel}
                  onBlur={(e) => setUser({...user, email: e.target.value})}
                />
              </Grid>
            </Grid>
            <Grid
            direction='column'
            className={formContainer}
            >
              <Grid item className={passwordContainer}>  
                <InputLabel className={!password.error ? passwordInputLabel : passwordLabelError} >{!password.error ? passwordLabel : passwordMismatchError}</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  className={textFieldRight}
                  type={password.showPassword ? 'text' : 'password'}
                  value={password.password1}
                  onChange={(e) => setPassword({...password, password1: e.target.value})}
                  onBlur={() => handlePasswordVerification(password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setPassword({...password, showPassword: !password.showPassword})}
                        onMouseDown={() => setPassword({...password, showPassword: !password.showPassword})}
                        edge="end"
                      >
                        {password.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  error={password.error}
                />
              </Grid>
              <Grid item className={passwordContainer}>  
                <InputLabel className={!password.error ? passwordInputLabel : passwordLabelError} >{!password.error ? confirmPasswordLabel : passwordMismatchError}</InputLabel>
                 <OutlinedInput
                  required
                  className={textFieldRight}
                  id="outlined-adornment-password"
                  type={password.showPassword ? 'text' : 'password'}
                  value={password.password2}
                  onChange={(e) => setPassword({...password, password2: e.target.value})}
                  onBlur={() => handlePasswordVerification(password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setPassword({...password, showPassword: !password.showPassword})}
                        onMouseDown={() => setPassword({...password, showPassword: !password.showPassword})}
                        edge="end"
                      >
                        {password.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  error={password.error}
                />
              </Grid>
              <Grid item>  
                <MuiPickersUtilsProvider utils={DateFnsUtils}>            
                  <KeyboardDatePicker 
                    required
                    className={textFieldLeft}
                    label={birthdayLabel}
                    value={selectedDate}
                    onChange={(date) => {
                      handleDateChange(date)
                      setUser({...user, birthday: date})
                    }}
                    disableFuture={true}
                    inputVariant='outlined'
                    format="dd/MM/yyyy"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Button 
                variant='contained' 
                color='primary'
                className={button}
                onClick={async () =>  await handleAddUser(user)}
              >
                {confirmLabel}
              </Button>
            </Grid>
          </Grid> 
        </Grid>
      </Paper>
    </Grid>
  )
}