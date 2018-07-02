import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Book } from '../models/book.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BooksService } from '../books.service';


@Component({
  selector: 'app-create-or-edit-book',
  templateUrl: './create-or-edit-book.component.html',
  styleUrls: ['./create-or-edit-book.component.css']
})
export class CreateOrEditBookComponent implements OnInit {

  book: Book;
  form: FormGroup;

  constructor(public thisDialogRef: MatDialogRef<CreateOrEditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private booksService: BooksService) { }

  ngOnInit() {
    this.initializeForm();
    if (this.data.mode === 'edit') {
      this.book = this.booksService.getBookByIndex(this.data.index);
      this.form.setValue({
        id: this.book.id,
        authorName: this.book.authorName,
        publishedDate: this.book.publishedDate,
        bookTitle: this.book.bookTitle
      });
    }
  }

  initializeForm() {
    this.form = new FormGroup({
      id: new FormControl(null, {validators: [Validators.required]}),
      authorName: new FormControl(null, {validators: [Validators.required]}),
      publishedDate: new FormControl(null, {validators: [Validators.required,
        Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/)]}),
      bookTitle: new FormControl(null, {validators: [Validators.required]}),
    });
  }

  onSave() {
    if (this.data.mode === 'create') {
      if (!this.form.valid) {
        return;
      }
      if (this.booksService.bookTitleIsExisting(this.form.value.bookTitle)) {
        alert('Book title is already existing');
        return;
      }
      const newBook = new Book (
        this.form.value.id,
        this.form.value.authorName,
        this.form.value.publishedDate,
        this.form.value.bookTitle);
      this.booksService.addBook(newBook);
      this.thisDialogRef.close('adding book');
    }
    if (this.data.mode === 'edit') {
      if (!this.form.valid && !this.form.touched) {
        return;
      }
      if (this.booksService.bookTitleIsExisting(this.form.value.bookTitle) && this.book.bookTitle !== this.form.value.bookTitle) {
        alert('Book title is already existing');
        return;
      }
      this.book.authorName = this.form.value.authorName;
      this.book.publishedDate = this.form.value.publishedDate;
      this.book.bookTitle = this.form.value.bookTitle;
      this.book.id = this.form.value.id;
      this.booksService.editBook(this.book, this.data.index);
      this.thisDialogRef.close('editing book');
    }
  }

  onCancel() {
    this.thisDialogRef.close('closing without adding');
  }
}

export interface Data {
  mode: string;
  index: number;
}
