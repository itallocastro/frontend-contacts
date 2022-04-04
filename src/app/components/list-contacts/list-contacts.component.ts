import {Component, OnInit} from '@angular/core';
import {ContactsService} from '../../services/contacts.service';
import {Observable, Subscription} from 'rxjs';
import {Contact} from '../../models/contact.model';
import {MatDialog} from '@angular/material/dialog';
import {ContactModalComponent} from './contact-modal/contact-modal.component';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {SnackBarService} from '../../services/snack-bar.service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss']
})
export class ListContactsComponent implements OnInit {

  contacts$: Observable<Contact[]>;
  dialogSubscribe: Subscription;


  constructor(private contactsService: ContactsService, public dialog: MatDialog, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.contacts$ = this.contactsService.getAllList();
  }

  addContact(): void {
    const dialogRef = this.dialog.open(ContactModalComponent, {panelClass: ['dialog-responsive']});

    this.dialogSubscribe = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contacts$ = this.contactsService.getAllList();
      }
      this.dialogSubscribe.unsubscribe();
    });
  }

  removeContact(contact: Contact): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {data: {text: 'Você realmente deseja excluir essa pessoa ?'}});
    this.dialogSubscribe = dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.contactsService.removeContact(contact.id)
          .subscribe((removed) => {
            this.contacts$ = this.contactsService.getAllList();
          },
            (err) => {
              this.snackBarService.openSnackBar('Erro ao remover o contato!', 3, 'error-snack');
              this.contactsService.setLoadingOperation(false);
            },
            () => {
              this.snackBarService.openSnackBar('Contato removido com sucesso!', 3, 'success-snack');
              this.contactsService.setLoadingOperation(false);
          });
      }
    });
  }

  editContact(contact: Contact): void {
    const dialogRef = this.dialog.open(ContactModalComponent, {data: contact, panelClass: ['dialog-responsive']});

    this.dialogSubscribe = dialogRef.afterClosed().subscribe(result => {
      this.dialogSubscribe.unsubscribe();
    });
  }

}
