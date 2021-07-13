import { Box, Button, Grid, Paper, TextField, Typography, makeStyles, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../providers/auth";
import { IBook } from "../../../../types/IBook";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CancelIcon from '@material-ui/icons/Cancel';
import { grey, teal, amber } from "@material-ui/core/colors";
import { variables } from "../../../../utils/config";
import { useHistory } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';


const useStyle = makeStyles({
  paperRoot: {
    width: '800px',
    height: '650px',
    marginTop: 'calc(100vh - 1105px)',
    zIndex: 0
  }, 
  root: {
    height: '100%',
    width: '100%'
  }, 
  titleContainer: {
    paddingLeft: '290px',
    marginTop: '18px',
    color: teal[800] ,
    marginBottom: '-11px'
  },
  formContainer: {
    width: '360px',
    marginLeft: '40px',
    marginTop: '20px'
  },
  button: {
    marginTop: '60px',
    marginLeft: '190px',
    width: '110px'
  },
  photoIcon: {
    color: 'white',
    fontSize: '60px',
    marginLeft: '46px',
    marginTop: '60px'
  },
  fileNotSupportedContainer: {
    color: 'white',
    fontSize: '15px',
    paddingLeft: '14px',
    marginTop: '30px'
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
    width: '300px', 
    marginTop: '20px',
    height: '176px'

  },
  '@global':{
    '& textarea': {
      height: '120px'
    },
    // '.MuiOutlinedInput-multiline': {
    //   height: '200px'
    // },
    // '.MuiOutlinedInput-inputMultiline':{
    //   height: '175px'
    // }
  }
})

export const ViewAddBookForm = () => {

  const history = useHistory()

  const {
    root, 
    paperRoot, 
    button, 
    formContainer, 
    photoIcon, 
    fileNotSupportedContainer, 
    titleContainer,
    textFieldLeft,
    textFieldRight,
    textFieldDescription
  } = useStyle()
  const { 
    submitLabel, 
    fileNotSupported, 
    newBooksLabel,
    titleLabel,
    authorFirstNameLabel,
    authorLastNameLabel,
    descriptionLabel,
    isbnLabel,
    pagesLabel
  
  } = variables

  const { handlePostBook, bookDone, setBookDone, bookUpdate, setBookUpdate, handleUpdateBook, handleDeleteBook } = useAuth()

  useEffect(() => {
    console.log('bookDone :>> ', bookDone);
    if (bookDone) {
      history.push('/home')
      setBookDone(false)
    }
  }, [bookDone])

  const [coverPreview, setCoverPreview] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [book, setBook] = useState<IBook>({
    id: '',
    title: '',
    authorFirstName: '',
    authorLastName: '',
    coverImage: '',
    description: '',
    isbn: null,
    pagesNr: null
  })
  const [error, setError] = useState(false)
 
  console.log('bookUpdate :>> ', bookUpdate);
 
  const handleImageChange = (event: any) => {
    const selected = event.target.files[0]
    const ALLOWED_TYPES = ['image/jpg', 'image/jpeg', 'image/png']

    if(selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader()

      reader.onloadend = () => {
        setCoverPreview(reader.result)
        setCoverImage(selected)
      
      }
      reader.readAsDataURL(selected)
      setError(false)
    } else {
      setError(true)
    }
  };  

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
              style={{fontSize:'30px'}}
            >
              {!bookUpdate ? newBooksLabel : 'Update Book'}
            </Typography>
            {
              bookUpdate
              ?
              <IconButton
              onClick={async () => {
                await handleDeleteBook(bookUpdate)
              }}
              style={{
                marginLeft: '415px'
              }}
              >
                <DeleteIcon style={{
                  fontSize: '30px', 
                  color: amber[700]
                }} />
              </IconButton>
              :
              <div></div>
            }
          </Grid>   
          <Grid
            container
            direction='row'
          >
            <Grid
              direction='column'
              className={formContainer}
            >
                <Box
                  component='div'
                  style={{
                    background: coverPreview ? `url("${coverPreview}") no-repeat center/cover` : grey[300],
                    height: '230px',
                    width: '150px',
                    marginLeft: '70px'
                  }}
                > 
                  {
                    !coverPreview && 
                    <AddPhotoAlternateIcon 
                      className={photoIcon}
                    />
                  }
                  {
                    !coverPreview && error &&
                      <Typography
                        className={fileNotSupportedContainer}
                      >
                        {fileNotSupported}
                      </Typography>
                  }
                  {           
                  coverPreview && !error &&
                    <Box 
                      style={{
                        paddingLeft: '105px'
                      }}
                    >  
                      <IconButton
                        onClick={() => {
                          setCoverImage(null)
                          setCoverPreview(null)
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Box>  
                  }
                </Box>
                <Box
                  style={{
                    marginTop: '20px'
                  }}
                >
                  <TextField 
                    id='fileUpload'
                    label={'cover image'}
                    variant='outlined'
                    type='file' 
                    InputLabelProps={{ shrink: true }}
                    onChange={(event: any) =>  handleImageChange(event)}
                    style={{width: '300px'}}
                    /> 
                </Box>
                <Grid item>  
                  <TextField 
                    required
                    className={textFieldLeft}
                    defaultValue={bookUpdate ? bookUpdate.title : book.title}
                    variant='outlined' 
                    color='primary' 
                    label={titleLabel}
                    onBlur={(e) => {

                      !bookUpdate 
                      ?
                      setBook({...book, title: e.target.value})
                      :
                      setBookUpdate({...bookUpdate, title: e.target.value})

                    }}
                  />
                </Grid>
                <Grid item>  
                  <TextField 
                    required
                    className={textFieldLeft}
                    defaultValue={bookUpdate ? bookUpdate.authorFirstName : book.authorFirstName}

                    variant='outlined' 
                    color='primary' 
                    label={authorFirstNameLabel}
                    onBlur={(e) => {
                      !bookUpdate 
                      ?
                      setBook({...book, authorFirstName: e.target.value})
                      :
                      setBookUpdate({...bookUpdate, authorFirstName: e.target.value})

                    }}
                  />
                </Grid>
                
              </Grid>
              <Grid
                direction='column'
                className={formContainer}
              >    
                <Grid item>  
                  <TextField 
                    required
                    className={textFieldLeft}
                    defaultValue={bookUpdate ? bookUpdate.authorLastName : book.authorLastName}

                    variant='outlined' 
                    color='primary' 
                    label={authorLastNameLabel}
                    onBlur={(e) => {
                      !bookUpdate 
                      ?
                      setBook({...book, authorLastName: e.target.value})
                      :
                      setBookUpdate({...bookUpdate, authorLastName: e.target.value})

                    }}
                  />                  
                </Grid>  
                <Grid item>  
                  <TextField 
                    required
                    className={textFieldRight}
                    defaultValue={bookUpdate ? bookUpdate.isbn : book.isbn}
                    variant='outlined' 
                    color='primary' 
                    label={isbnLabel}
                    onBlur={(e) =>                     
                    {
                      !bookUpdate 
                      ?
                      setBook({...book, isbn: parseInt(e.target.value)})
                      :
                      setBookUpdate({...bookUpdate, isbn: parseInt(e.target.value)})

                    }}
                  />
                </Grid>
                <Grid item>  
                  <TextField 
                    required
                    className={textFieldLeft}
                    defaultValue={bookUpdate ? bookUpdate.pagesNr : book.pagesNr}
                    variant='outlined' 
                    color='primary' 
                    label={pagesLabel}
                    onBlur={(e) =>{
                      !bookUpdate 
                      ?
                      setBook({...book, pagesNr: parseInt(e.target.value)})
                      :
                      setBookUpdate({...bookUpdate, pagesNr: parseInt(e.target.value)})
                    }}
                  />
                </Grid>
                <Grid item>  
                  <TextField 
                    required
                    multiline={true}
                    rowsMax={10}
                    rows={10}
                    className={textFieldDescription}
                    defaultValue={bookUpdate ? bookUpdate.description : book.description}

                    variant='outlined' 
                    color='primary' 
                    label={descriptionLabel}
                    onBlur={(e) => !bookUpdate 
                      ?
                      setBook({...book, description: e.target.value})
                      :
                      setBookUpdate({...bookUpdate, description: e.target.value})}
                  />
                </Grid>
                <Button
                  variant='contained'
                  onClick={async () => {
                    if(bookUpdate) {
                      await handleUpdateBook(coverImage, bookUpdate)
                      // console.log('bookUpdate :>> ', bookUpdate);
                    } else {

                      // console.log('book :>> ', book);
                      await handlePostBook(coverImage, book)
                    }

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
