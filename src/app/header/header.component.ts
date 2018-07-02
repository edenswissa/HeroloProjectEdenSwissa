import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CreateOrEditBookComponent } from '../create-or-edit-book/create-or-edit-book.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public newBookDialog: MatDialog) { }

  ngOnInit() {
  }

  onAddBook() {
    const newBookDialogRef = this.newBookDialog
    .open(CreateOrEditBookComponent, {
      width: '400px', data: {mode: 'create', index: null}
    });
    newBookDialogRef.afterClosed()
      .subscribe(result => console.log(result));
  }
}
