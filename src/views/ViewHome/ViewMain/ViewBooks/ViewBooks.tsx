import { Box, Grid, IconButton } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import React, { useEffect, useState }  from 'react';
import { useAuth } from '../../../../providers/auth';
import { ViewCards } from './ViewCards';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { useHistory } from 'react-router-dom';
import { amber, grey, teal } from '@material-ui/core/colors';
import PostAddIcon from '@material-ui/icons/PostAdd';

export const ViewBooks = (params) => {
  const history = useHistory()
  const { handleGetAllBooks, books } = useAuth()
  
  useEffect(() => {
    handleGetAllBooks()
  }, [])
  
  const [searchBook, setSerch] = useState('')
  
  const handleBookSearch = (book: string) => {
    console.log('book :>> ', book);
  }; 

  return(
    <>
      <Box style={{marginLeft: '270px'}}>
        <SearchBar
          value={searchBook}
          onChange={(newValue) => setSerch(newValue)}
          onRequestSearch={() => handleBookSearch(searchBook)}
        />
        <Grid
          container
        >
          <Grid item>
            <ViewCards books={books}/>
          </Grid>
          <Grid
            justify='flex-end'
            alignItems='flex-end'
            style={{
              position: 'fixed',
              marginTop: 'calc(100vh - 130px)',
              width: '100%',
              marginLeft:'calc(100% - 450px)'
            }}    
          >
            <IconButton
              onClick={() => history.push('/add/books')}
              style={{ backgroundColor: amber[400], marginRight: '20px'}}
            >
              <MenuBookIcon style={{fontSize: '40px', color: 'white'}}/>
            </IconButton>

            <IconButton
              onClick={() => history.push('/add/reviews')}
              style={{ backgroundColor: amber[400],}}
            >
              <PostAddIcon style={{fontSize: '40px', color: 'white'}}/>
            </IconButton>
          </Grid>          
        </Grid>
      </Box>    
    </>
  )
};
