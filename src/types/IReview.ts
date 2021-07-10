export interface IReview {
  id: string;
  book: string;
  user: string;
  startDate: Date;
  finishDate: Date;
  rating: number;
  review: string;
}

export interface IReviews {
  reviews: IReview[]
}