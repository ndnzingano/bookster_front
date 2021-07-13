import { Box, Button, Grid, Paper, TextField, Typography, makeStyles, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../providers/auth";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Rating from '@material-ui/lab/Rating';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { grey, teal } from "@material-ui/core/colors";
import { variables } from "../../../../utils/config";
import { useHistory } from "react-router-dom";
import {v4 as uuidv4 } from 'uuid'
import { IReview } from "../../../../types/IReview";
import { IBook } from "../../../../types/IBook";


const useStyle = makeStyles({
  paperRoot: {
    width: '800px',
    height: '600px',
    marginTop: 'calc(100vh - 1085px)',
    zIndex: 0
  }, 
  root: {
    height: '100%',
    width: '100%'
  }, 
  titleContainer: {
    paddingLeft: '290px',
    marginTop: '34px',
    color: teal[800] ,
    paddingBottom: '11px'
  },
  formContainer: {
    width: '360px',
    marginLeft: '40px',
    marginTop: '40px'
  },
  button: {
    marginTop: '60px',
    marginLeft: '630px',
    width: '110px'
  },
  textFieldLeft: {
    width: '300px', 
    marginTop: '20px'

  },
  textFieldRight: {
    width: '300px', 
    marginTop: '20px'

  },
  textFieldDescription: {
    width: '700px', 
    marginTop: '20px',
    height: '176px',
    marginLeft: '40px'

  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  '@global':{
    '& textarea': {
      height: '120px'
    },
  }
})

export const ViewAddReviewForm = () => {

  const history = useHistory()

  const {
    root, 
    paperRoot, 
    button, 
    formContainer, 
    titleContainer,
    textFieldLeft,
    textFieldRight,
    textFieldDescription,
    option
  } = useStyle()
  const { 
    submitLabel, 
    newReviewLabel,
    chooseBookLabel,
    startDateLabel,
    finishDateLabel,
    ratingLabel,
    reviewLabel
  
  } = variables

  const { setReviewDone, reviewDone, user, books, handleGetAllBooks, handlePostReview, ratings
  } = useAuth()

  useEffect(() => {
    handleGetAllBooks()
  }, [])



  console.log('ratings :>> ', ratings);
  const [selectedStartDate, handleStartChange] = useState(new Date());
  const [selectedFinishDate, handleFinishChange] = useState(new Date());

  const [value, setValue] = useState(0)
  const [newbook, setnewBook] = useState(null)

  const [review, setReview] = useState<IReview>({
    id: '',
    book: '',
    user: '',
    startDate: new Date,
    finishDate: new Date,
    rating: 0,
    review: ''
  })

  useEffect(() => {
    setReview({...review, user: user.id})
  }, [])

  useEffect(() => {

    if(newbook !== null){
      setReview({...review, book: newbook.id}) 
    }

  }, [newbook])

  useEffect(() => {
    
    if (reviewDone) {
      history.push('/home')
      setReviewDone(false)
    }
  }, [reviewDone])

  // console.log('review :>> ', review);
  return(
    <>
      <Grid
        container
        className={root} 
      >
        <Paper 
          elevation={3} 
          className={paperRoot}
        >    
         <Grid 
            className={titleContainer}
          >
            <Typography 
              variant='h3' 
              style={{fontSize:'20px'}}
            >
              {newReviewLabel}
            </Typography>
          </Grid>   
          <Grid
            container
            direction='row'
          >
            <Grid
              direction='column'
              className={formContainer}
            >
              <Grid 
                item
                style={{
                  marginTop: '20px'
                }}
              >
                <Autocomplete
                  id="country-select-demo"
                  style={{ width: 300 }}
                  options={books.books}
                  classes={{
                    option: option,
                  }}
                  autoHighlight
                  getOptionLabel={(option) => option.title}
                  renderOption={(option) => {
                    return (
                    <React.Fragment>
                      {option.title}
                    </React.Fragment>
                  )}}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={chooseBookLabel}
                      variant="outlined"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                  onChange={(event, newValue) => setnewBook(newValue)}
                />
              </Grid>
              <Grid 
                item
                style={{
                  marginTop: '40px'
                }}
              >
                <Typography
                  variant='subtitle2'
                  color='textSecondary'
                >
                  {ratingLabel}
                </Typography>
                <Rating 
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue)
                    setReview({...review, rating: newValue})

                  }}  
                />
              </Grid> 

              </Grid>
              <Grid
                direction='column'
                className={formContainer}
              >    
                <Grid item>  
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>            
                    <KeyboardDatePicker 
                      required
                      className={textFieldLeft}
                      label={startDateLabel}
                      value={selectedStartDate}
                      onChange={(date) => {
                        handleStartChange(date)
                        setReview({...review, startDate: date})
                      }}
                      disableFuture={true}
                      inputVariant='outlined'
                      format="dd/MM/yyyy"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item>  
                <MuiPickersUtilsProvider utils={DateFnsUtils}>            
                    <KeyboardDatePicker 
                      required
                      className={textFieldLeft}
                      label={finishDateLabel}
                      value={selectedFinishDate}
                      onChange={(date) => {
                        handleFinishChange(date)
                        setReview({...review, finishDate: date})
                      }}
                      disableFuture={true}
                      inputVariant='outlined'
                      format="dd/MM/yyyy"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Grid
                direction='row'
                style={{
                  width: '100%'
                }}
              >
                <Grid item>  
                  <TextField 
                    required
                    multiline={true}
                    rowsMax={10}
                    rows={10}
                    className={textFieldDescription}
                    variant='outlined' 
                    color='primary' 
                    label={reviewLabel}
                    onBlur={(e) => setReview({...review, review: e.target.value})}
                  />
                </Grid>
                  <Button
                    variant='contained'
                    onClick={async () => {
                     await handlePostReview(review)


                    }}
                    className={button}
                    color='primary'
                  >
                    {submitLabel}
                  </Button>
                </Grid>
            </Grid>
        </Paper>
      </Grid>
    </>
  )
};
