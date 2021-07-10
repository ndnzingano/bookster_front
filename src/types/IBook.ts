export interface IBook {
  id: string;
  title: string;
  authorFirstName: string;
  authorLastName: string;
  coverImage: string;
  description: string;
  isbn: number;
  pagesNr: number;
}

export interface IBooks {
  books: IBook[]
}