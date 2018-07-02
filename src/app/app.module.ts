import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule,
        MatButtonModule,
        MatExpansionModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookListComponent } from './book-list/book-list.component';
import { HeaderComponent } from './header/header.component';
import { CreateOrEditBookComponent } from './create-or-edit-book/create-or-edit-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoSymbolPipe } from './pipes/noSymbole.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    HeaderComponent,
    CreateOrEditBookComponent,
    NoSymbolPipe,
  ],
  entryComponents: [CreateOrEditBookComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
