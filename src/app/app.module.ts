import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { ListContactsComponent } from './components/list-contacts/list-contacts.component';
import {HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import { ContactModalComponent } from './components/list-contacts/contact-modal/contact-modal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PersonalDataComponent } from './components/list-contacts/contact-modal/personal-data/personal-datas.component';
import { EmailsComponent } from './components/list-contacts/contact-modal/emails/emails.component';
import { PhonesComponent } from './components/list-contacts/contact-modal/phones/phones.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ListContactsComponent,
    ContactModalComponent,
    PersonalDataComponent,
    EmailsComponent,
    PhonesComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    HttpClientModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(options),
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
