import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BooksService } from '../books.service';
import { Book } from '../models/book.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CreateOrEditBookComponent } from '../create-or-edit-book/create-or-edit-book.component';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(private http: HttpClient, private booksService: BooksService,
    public editBookDialog: MatDialog) { }

  bookName = 'harry potter';
  books: Book[] = [];
  isLoading = false;
  displayedColumns: string[] = ['id', 'authorName', 'publishedDate', 'bookTitle', 'action'];

  ngOnInit() {
    this.isLoading = true;
    this.booksService.getBooksFromGoogleApi(this.bookName);
    this.booksService.getBooksUpdatedListener()
      .subscribe((books: Book[]) => {
        this.books = books;
        this.isLoading = false;
      });
  }

  onEditBook(index: number) {
    const editBookDialogRef = this.editBookDialog
    .open(CreateOrEditBookComponent, {
      width: '400px', data: {mode: 'edit', index: index}
    });
    editBookDialogRef.afterClosed()
      .subscribe(result => console.log(result));
  }

  onDeleteBook(index: number) {
    const toDelete = confirm('Are you Sure?');
    if (toDelete) {
    this.booksService.deleteBookByIndex(index);
    }
  }
}
