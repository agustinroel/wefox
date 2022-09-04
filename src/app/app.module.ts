import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';
import { ModalEditComponent } from './modal-edit/modal-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    ModalAlertComponent,
    ModalEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule, 
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatDialogModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
