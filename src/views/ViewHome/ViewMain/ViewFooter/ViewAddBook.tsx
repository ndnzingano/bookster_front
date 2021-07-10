import { Avatar, Box, Button, CardMedia, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useAuth } from "../../../../providers/auth";
import { IBook } from "../../../../types/IBook";
import PersonIcon from '@material-ui/icons/Person';
import { grey } from "@material-ui/core/colors";

export const ViewAddBook = () => {

  const { handlePostBook } = useAuth()

  const [coverPreview, setCoverPreview] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [book, setBook] = useState<IBook>({
    id: '',
    title: '',
    authorFirstName: '',
    authorLastName: '',
    coverImage: '',
    description: '',
    isbn: 0,
    pagesNr: 0
  })
  const [error, setError] = useState(false)
 
  console.log('coverImage :>> ', coverImage);
  
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
      <Grid>
       
          <Box>
            {
              error && <>
                       <Typography>file not supported</Typography>
                       <PersonIcon />
                       </>
            }
          </Box>
          <Box
            component='div'
            style={{
              background: coverPreview ? `url("${coverPreview}") no-repeat center/cover` : grey[200],
              height: '300px',
              width: '300px'
            }}
          > 
            {
              !coverPreview && (
                <>
                  <Typography>Upload an image!</Typography>
                  <TextField 
                    id='fileUpload'
                    label={'cover image'}
                    variant='outlined'
                    type='file' 
                    InputLabelProps={{ shrink: true }}
                    onChange={(event: any) =>  handleImageChange(event)}
                    /> 
                </>
              )
            }
            {
              coverPreview && (
                <Button
                  variant='contained'
                  onClick={() => {
                    setCoverImage(null)
                    setCoverPreview(null)
                  }}
                >
                  remove img
                </Button>
                )
            }
          </Box>
        <Button
          variant='contained'
          onClick={() => {
            handlePostBook(coverImage, book)
          }}
        >submit</Button>

 
        
      </Grid>
    </>
  )
};
