import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Contact, Email} from '../../../../models/contact.model';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../contact-modal.component';
import {Subscription} from 'rxjs';
import {EmailService} from '../../../../services/email.service';
import {ConfirmModalComponent} from '../../../confirm-modal/confirm-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {SnackBarService} from '../../../../services/snack-bar.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})
export class EmailsComponent implements OnInit, OnDestroy {

  @Input()
  contact: Contact;

  @Input()
  step: number;

  @Input()
  setStep: (value: number) => void;

  @Input()
  nextStep: () => void;

  @Input()
  emailCurrent: FormControl;

  @Input()
  prevStep: () => void;

  @Input()
  matcher: MyErrorStateMatcher;

  emailSubscription: Subscription;
  dialogSubscription: Subscription;

  openEdition: number;

  editEmailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private emailService: EmailService, private dialog: MatDialog, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }


  setEdition(value: number, email: Email): void {
    this.openEdition = value;
    this.editEmailControl.setValue(email.name);
  }

  resetEdition(): void {
    this.openEdition = undefined;
    this.editEmailControl.reset();
  }

  addEmail(): void {
    const email = new Email();
    email.name = this.emailCurrent.value;
    if (this.contact.id) {
      this.emailSubscription = this.emailService
        .addEmail(this.contact.id, email)
        .subscribe(
          (newEmail: Email) => {
            this.contact.emails.push(newEmail);
            this.emailCurrent.reset();
          },
          (error) => {
            this.emailService.setLoading(false);
            this.snackBarService.openSnackBar('Erro ao adicionar o email!', 3, 'error-snack');
          },
          () => {
            this.emailService.setLoading(false);
            this.snackBarService.openSnackBar('Email adicionado com sucesso!', 3, 'success-snack');
          });
    } else {
      this.contact.emails.push(email);
      this.emailCurrent.reset();
    }
  }

  editEmail(email: Email, index: number): void {
    email.name = this.editEmailControl.value;
    if (this.contact.id) {
      this.emailSubscription = this.emailService.editEmail(this.contact.id, email).subscribe((updatedEmail: Email) => {
        this.contact.emails[index] = updatedEmail;
        this.resetEdition();
      }, (error) => {
          this.emailService.setLoading(false);
          this.snackBarService.openSnackBar('Erro ao editar o email!', 3, 'error-snack');
        },
        () => {
          this.emailService.setLoading(false);
          this.snackBarService.openSnackBar('Email editado com sucesso!', 3, 'success-snack');
        });
    } else {
      this.contact.emails[index] = email;
      this.resetEdition();
    }
  }

  removeContact(email: Email, index: number): void {
    if (this.contact.id) {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {data: {text: 'Você realmente deseja excluir esse email ?'}});
      this.dialogSubscription = dialogRef.afterClosed().subscribe((value) => {
        if (value) {
          this.emailService.removeEmail(email).subscribe((removed) => {
            this.contact.emails.splice(index, 1);
            this.resetEdition();
            this.dialogSubscription.unsubscribe();
          }, (error) => {
              this.emailService.setLoading(false);
              this.snackBarService.openSnackBar('Erro ao excluir o email!', 3, 'error-snack');
            },
            () => {
              this.emailService.setLoading(false);
              this.snackBarService.openSnackBar('Email excluído com sucesso!', 3, 'success-snack');
            });
        }
      });
    } else {
      this.contact.emails.splice(index, 1);
      this.resetEdition();
    }
  }

  disabledEmail(formControl: FormControl): boolean {
    return formControl.hasError('email') ||
      formControl.hasError('required') ||
      this.emailService.getLoading();
  }

  ngOnDestroy(): void {
    if (this.emailSubscription) {
      this.emailSubscription.unsubscribe();
    }
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }
}
