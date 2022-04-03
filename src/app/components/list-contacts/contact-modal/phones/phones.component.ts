import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Contact, Email, Phone} from '../../../../models/contact.model';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../contact-modal.component';
import {Subscription} from 'rxjs';
import {ContactsService} from '../../../../services/contacts.service';
import {PhoneService} from '../../../../services/phone.service';
import {SnackBarService} from '../../../../services/snack-bar.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})
export class PhonesComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  contact: Contact;

  @Input()
  step: number;

  @Input()
  setStep: (value: number) => void;

  @Input()
  nextStep: () => void;

  @Input()
  prevStep: () => void;

  @Input()
  phoneCurrent: FormControl;

  @Input()
  isWhatsappCurrent: FormControl;

  @Input()
  matcher: MyErrorStateMatcher;

  phoneSubscription: Subscription;
  editPhoneSubscription: Subscription;
  dialogSubscription: Subscription;

  editPhoneControl: FormControl = new FormControl('', [Validators.required]);
  editPhoneWhatsappControl: FormControl = new FormControl(false);

  openEdition: number;

  constructor(private phoneService: PhoneService, private snackBarService: SnackBarService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  setEdition(value: number, phone: Phone): void {
    this.openEdition = value;
    this.editPhoneControl.setValue(phone.phoneNumber);
    this.editPhoneWhatsappControl.setValue(phone.isWhatsapp);
  }

  resetEdition(): void {
    this.openEdition = undefined;
    this.editPhoneControl.reset();
    this.editPhoneWhatsappControl.reset();
  }


  addPhone(): void {
    const phone = new Phone();
    phone.phoneNumber = this.phoneCurrent.value;
    phone.isWhatsapp = this.isWhatsappCurrent.value;
    if (this.contact.id) {
      this.phoneSubscription = this.phoneService
        .addPhone(this.contact.id, phone)
        .subscribe((newPhone) => {
          this.contact.phones.push(newPhone);
          this.phoneCurrent.reset();
          this.isWhatsappCurrent.reset();
        }, (err) => {
          this.snackBarService.openSnackBar('Erro ao adicionar o telefone!', 3, 'error-snack');
          this.phoneService.setLoading(false);
        }, () => {
          this.snackBarService.openSnackBar('Telefone adicionado com sucesso!', 3, 'success-snack');
          this.phoneService.setLoading(false);
        });
    } else {
      this.contact.phones.push(phone);
      this.phoneCurrent.reset();
      this.isWhatsappCurrent.reset();
    }
  }

  editPhone(phone: Phone, index: number): void {
    phone.phoneNumber = this.editPhoneControl.value;
    phone.isWhatsapp = this.editPhoneWhatsappControl.value;
    if (this.contact.id) {
      this.phoneSubscription = this.phoneService
        .editPhone(this.contact.id, phone)
        .subscribe((updatedPhone: Phone) => {
          this.contact.phones[index] = updatedPhone;
          this.resetEdition();
        }, (err) => {
          this.snackBarService.openSnackBar('Erro ao editar o telefone!', 3, 'error-snack');
          this.phoneService.setLoading(false);
        }, () => {
          this.snackBarService.openSnackBar('Telefone editado com sucesso!', 3, 'success-snack');
          this.phoneService.setLoading(false);
        });
    } else {
      this.contact.phones[index] = phone;
      this.resetEdition();
    }
  }

  removePhone(phone: Phone, index: number) {
    if (this.contact.id) {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {data: {text: 'Você realmente deseja excluir esse telefone ?'}});
      this.dialogSubscription = dialogRef.afterClosed().subscribe((value) => {
        if (value) {
          this.phoneService.removePhone(phone).subscribe((removed) => {
              this.contact.phones.splice(index, 1);
              this.resetEdition();
              this.dialogSubscription.unsubscribe();
            }, (error) => {
              this.phoneService.setLoading(false);
              this.snackBarService.openSnackBar('Erro ao excluir o telefone!', 3, 'error-snack');
            },
            () => {
              this.phoneService.setLoading(false);
              this.snackBarService.openSnackBar('Telefone excluído com sucesso!', 3, 'success-snack');
            });
        }
      });
    } else {
      this.contact.phones.splice(index, 1);
      this.resetEdition();
    }
  }

  disabledPhone(formControl): boolean {
    return formControl.hasError('required') || this.phoneService.getLoading();
  }

  ngOnDestroy(): void {
    if (this.phoneSubscription) {
      this.phoneSubscription.unsubscribe();
    }
    if (this.editPhoneSubscription) {
      this.editPhoneSubscription.unsubscribe();
    }
  }

}
