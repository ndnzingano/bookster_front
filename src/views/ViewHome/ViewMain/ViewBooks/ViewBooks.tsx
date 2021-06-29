import { Grid } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import React, { useEffect, useState }  from 'react';
import { useAuth } from '../../../../providers/auth';
import { ViewCards } from './ViewCards';

export const ViewBooks = (params) => {

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
        
      </Grid>    
    </>
  )
};
