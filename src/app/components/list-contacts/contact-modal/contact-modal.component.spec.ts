import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ContactModalComponent, MyErrorStateMatcher} from './contact-modal.component';
import {ContactsService} from '../../../services/contacts.service';
import {SnackBarService} from '../../../services/snack-bar.service';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {from, of, Subscription, throwError} from 'rxjs';
import {Contact} from '../../../models/contact.model';
import {ChangeDetectorRef} from '@angular/core';

describe('ContactModalComponent', () => {
  let component: ContactModalComponent;
  let fixture: ComponentFixture<ContactModalComponent>;

  const contactServiceMock = {
    addContact: (contact: Contact) => of(contact),
    setLoadingOperation: (value: boolean) => { return; }
  };

  const mockMatDialogData =  {id: '1', name: 'Jonas', emails: [], phones: [] };

  const mockMatDialogRef = {close: (data: any) => {return; }};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactModalComponent ],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: ContactsService, useValue: contactServiceMock},
        SnackBarService,
        ChangeDetectorRef,
        {provide: MAT_DIALOG_DATA, useValue: mockMatDialogData},
        {provide: MatDialogRef, useValue: mockMatDialogRef}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init data without data of MAT_DIALOG_DATA', () => {
    component.data = null;
    component.initData();
    expect(component.contact.emails.length).toBe(0);
  });

  it('should have been called detectChanges in setStep', () => {
    const spyDetectorRef = spyOn(component['changeDetectorRef'], 'detectChanges').and.callThrough();
    component.step = 0;
    component.setStep(3);
    expect(spyDetectorRef).toHaveBeenCalled();
    expect(component.step).toBe(3);
  });

  it('should have been called detectChanges in nextStep', () => {
    const spyDetectorRef = spyOn(component['changeDetectorRef'], 'detectChanges').and.callThrough();
    component.step = 0;
    component.nextStep();
    expect(spyDetectorRef).toHaveBeenCalled();
    expect(component.step).toBe(1);
  });

  it('should have been called detectChanges in prevStep', () => {
    const spyDetectorRef = spyOn(component['changeDetectorRef'], 'detectChanges').and.callThrough();
    component.step = 1;
    component.prevStep();
    expect(spyDetectorRef).toHaveBeenCalled();
    expect(component.step).toBe(0);
  });

  it('should have been called unsubscribe in ngOnDestroy', () => {
    component.contactSubscription = new Subscription();
    const spyUnsubscribe = spyOn(component.contactSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(spyUnsubscribe).toHaveBeenCalled();
  });
  it('should called addContact', (done) => {
    const contactService = TestBed.inject(ContactsService);
    component.nameCurrent.setValue('Jonas');
    component.contactSubscription = new Subscription();
    spyOn(component.contactSubscription, 'unsubscribe').and.callThrough();
    const spyContact = spyOn(contactService, 'addContact').and.returnValue(of({id: '1', name: 'Jonas', emails: [], phones: [] }));
    const spyDialog = spyOn(component.dialogRef, 'close');
    component.addContact();
    done();
    expect(spyDialog).toHaveBeenCalled();
    expect(spyContact).toHaveBeenCalled();
    expect(component.contact.name).toEqual('Jonas');
  });
  it('should called addContact with error', (done) => {
    const contactService = TestBed.inject(ContactsService);
    const snackBarService = TestBed.inject(SnackBarService);
    component.nameCurrent.setValue('Jonas');
    component.contactSubscription = new Subscription();
    spyOn(component.contactSubscription, 'unsubscribe').and.callThrough();
    const spyContact = spyOn(contactService, 'addContact').and.returnValue(from(throwError({})));
    const spySnackBar = spyOn(snackBarService, 'openSnackBar').and.callThrough();
    component.addContact();
    done();
    expect(spySnackBar).toHaveBeenCalled();
    expect(spyContact).toHaveBeenCalled();
    expect(component.contact.name).toEqual('Jonas');
  });
});
