export class Book {
  id: string;
  authorName: string;
  publishedDate: string;
  bookTitle: string;

  constructor(i_Id: string, i_AuthorName: string, i_PublishedDate: string, i_BookTitle: string) {
    this.id = i_Id;
    this.authorName = i_AuthorName;
    this.publishedDate = i_PublishedDate;
    this.bookTitle = i_BookTitle;
  }
}
