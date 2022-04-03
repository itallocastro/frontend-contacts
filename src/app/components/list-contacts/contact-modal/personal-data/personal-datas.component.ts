import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MyErrorStateMatcher} from '../contact-modal.component';
import {Contact} from '../../../../models/contact.model';
import {ContactsService} from '../../../../services/contacts.service';
import {Subscription} from 'rxjs';
import {SnackBarService} from '../../../../services/snack-bar.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-datas.component.html',
  styleUrls: ['./personal-datas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalDataComponent implements OnInit, OnDestroy {

  @Input()
  contact: Contact;

  @Input()
  step: number;

  @Input()
  setStep: (value: number) => void;

  @Input()
  nextStep: () => void;


  @Input()
  nameCurrent: FormControl;

  @Input()
  matcher: MyErrorStateMatcher;

  contactSubscription: Subscription;
  constructor(private contactsService: ContactsService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }

  editName(): void {
    this.contact.name = this.nameCurrent.value;
    this.contactSubscription = this.contactsService.editContact(this.contact).subscribe(
      (contact: Contact) => {
        this.contact = contact;
      },
      (err) => {
        this.snackBarService.openSnackBar('Erro ao editar o nome do contato!', 3, 'error-snack');
        this.contactsService.setLoadingOperation(false);
      },
      () => {
        this.snackBarService.openSnackBar('Nome do contato alterado com sucesso!', 3, 'success-snack');
        this.contactsService.setLoadingOperation(false);
      });
  }

  disabledName(): boolean {
    return (this.contact.name === this.nameCurrent.value) || this.contactsService.getLoadingOperation();
  }

  ngOnDestroy(): void {
    if (this.contactSubscription) {
      this.contactSubscription.unsubscribe();
    }
  }
}
