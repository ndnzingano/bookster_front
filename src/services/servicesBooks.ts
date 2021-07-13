import axios from 'axios'
import { IBook } from '../types/IBook';
import { instance } from '../utils/instance';




export const getAllBooks = async (token: string) => {
  try {

      const response = await instance.get('/books',{ 
        headers: {
          'x-auth-token': token,
          //@ts-ignore
          'Content-Type': `image/jpg`
        }
      }) 

      return response.data
  } catch (error) {
      console.log('error :>> ', error);
  }
}

export const postBook = async (token: string, file: any, book:IBook) => {
  try {
      let formData = new FormData();
      formData.append("files", file);
      formData.append("id", book.id);
      formData.append("title", book.title);
      formData.append("authorFirstName",   book.authorFirstName);
      formData.append("authorLastName",   book.authorLastName);
      formData.append("description",   book.description);
      formData.append("isbn",   book.isbn.toString());
      formData.append("pagesNr",   book.pagesNr.toString());
      console.log('formData :>> ', formData);


      const response = await instance.post('/books', formData,
        { headers: {
          'x-auth-token': token,
          //@ts-ignore
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
          
          }
        }) 

      return response.data
  } catch (error) {
      console.log('error :>> ', error);
  }
}

export const updateBook = async (file: any, book: IBook, token: string) => {
  try {
    let formData = new FormData();
    formData.append("files", file);
    formData.append("id", book.id);
    formData.append("title", book.title);
    formData.append("authorFirstName",   book.authorFirstName);
    formData.append("authorLastName",   book.authorLastName);
    formData.append("description",   book.description);
    formData.append("isbn",   book.isbn.toString());
    formData.append("pagesNr",   book.pagesNr.toString());


    const response = await instance.put(`/books/${book.id}`, formData,
      { headers: {
        'x-auth-token': token,
        //@ts-ignore
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        
        }
      }) 

    return response.data
} catch (error) {
    console.log('error :>> ', error);
}
};


export const updateBookRatings = async (ratings: [], book, token) => {
  try {

    const response = await instance.put(`/books/ratings/${book.id}`, ratings, 
      { headers: {
        'x-auth-token': token     
      }}
    )

    return response.data

  } catch (error){
    console.log('error :>> ', error);

  }
  
};

export const deleteBook = async (book, token) => {

  try {

    const response = await instance.delete(`/books/${book.id}`,{ 
      headers: {
        'x-auth-token': token,
      }
    }) 


    return true
} catch (error) {
    console.log('error :>> ', error);

    return false
}
}


