import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from './models/book.model';

@Injectable({providedIn: 'root'})
export class BooksService {
  private books: Book[] = [];
  private booksUpdated = new Subject<Book[]>();

  constructor(private http: HttpClient) {
  }

  getBooksFromGoogleApi(bookName) {
    this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + bookName)
    .subscribe((data: any) => {
      for (let i = 0; i < data.items.length; i++) {
        const newBook: Book = new Book(
          data.items[i].id,
          data.items[i].volumeInfo.authors[0],
          data.items[i].volumeInfo.publishedDate,
          data.items[i].volumeInfo.title
        );
        this.books.push(newBook);
      }
      this.booksUpdated.next([...this.books]);
    });
  }

  bookTitleIsExisting(bookTitle: string) {
    const index = this.books.map(book => book.bookTitle.toUpperCase()).indexOf(bookTitle.toUpperCase());
    return index > -1;
  }

  getBooksUpdatedListener() {
    return this.booksUpdated.asObservable();
  }

  getBooks() {
    return [...this.books];
  }

  deleteBookByIndex(index: number) {
    this.books.splice(index, 1);
    this.booksUpdated.next([...this.books]);
  }

  getBookByIndex(index: number) {
    return this.books[index];
  }

  editBook(newBook: Book, index: number) {
    this.books[index] = newBook;
    this.booksUpdated.next([...this.books]);
  }

  addBook(newBook: Book) {
    this.books.push(newBook);
    this.booksUpdated.next([...this.books]);
  }
}

