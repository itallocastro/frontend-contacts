import {ChangeDetectorRef, Component, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Contact, Email, Phone} from '../../../models/contact.model';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ContactsService} from '../../../services/contacts.service';
import {Method} from '../../../models/operation.model';
import {EmailService} from '../../../services/email.service';
import {Observable, Subscription} from 'rxjs';
import {PhoneService} from '../../../services/phone.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit, OnDestroy, OnChanges {

  step = 0;

  contact: Contact = new Contact();

  nameCurrent: FormControl = new FormControl('', [Validators.required]);
  emailCurrent: FormControl = new FormControl('', [Validators.required, Validators.email]);

  phoneCurrent: FormControl = new FormControl('', [Validators.required]);
  isWhatsappCurrent: FormControl = new FormControl(false);

  matcher = new MyErrorStateMatcher();

  contactSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<ContactModalComponent>,
              private contactsService: ContactsService,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: Contact,
              ) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    if (this.data) {
      this.contact = this.data;
      this.nameCurrent.setValue(this.contact.name);
      return;
    }
    this.contact.emails = [];
    this.contact.phones = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  addContact(): void {
    this.contact.name = this.nameCurrent.value;
    this.contactSubscription = this.contactsService.addContact(this.contact).subscribe((contact) => {
      this.dialogRef.close(contact);
    }, (err) => console.log(err));
  }

  setStep = (index: number): void => {
    this.step = index;
    this.changeDetectorRef.detectChanges();
  }

  nextStep = (): void => {
    this.step++;
    this.changeDetectorRef.detectChanges();
  }

  prevStep = (): void => {
    this.step--;
    this.changeDetectorRef.detectChanges();
  }


  ngOnDestroy(): void {
    if (this.contactSubscription) {
      this.contactSubscription.unsubscribe();
    }
  }

}
