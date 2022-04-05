import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContactsComponent } from './list-contacts.component';
import {from, of, Subscription, throwError} from 'rxjs';
import {ContactsService} from '../../services/contacts.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SnackBarService} from '../../services/snack-bar.service';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ListContactsComponent', () => {
  let component: ListContactsComponent;
  let fixture: ComponentFixture<ListContactsComponent>;

  const contactServiceMock = {
    getAllList: () => of([{id: '1', name: 'Jonas', emails: [], phones: [] }]),
    removeContact: () => of({id: '1', name: 'Jonas', emails: [], phones: [] }),
    setLoadingOperation: (value: boolean) => { return; }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContactsComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: ContactsService, useValue: contactServiceMock},
        SnackBarService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called getAllList', (done) => {
    const contactService = TestBed.inject(ContactsService);
    const spyContact = spyOn(contactService, 'getAllList').and.returnValue(of([{id: '1', name: 'Jonas', emails: [], phones: [] }]));
    component.ngOnInit();
    done();
    expect(spyContact).toHaveBeenCalled();
  });

  it('should called getAllList in addContact', (done) => {
    const contactService = TestBed.inject(ContactsService);
    component.dialogSubscribe = new Subscription();
    const spyUnsubscribe = spyOn(component.dialogSubscribe, 'unsubscribe').and.callThrough();
    const spyContact = spyOn(contactService, 'getAllList').and.returnValue(of([{id: '1', name: 'Jonas', emails: [], phones: [] }]));
    const spyDialog = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => of(true)} as MatDialogRef<any>);
    component.addContact();
    done();
    expect(spyDialog).toHaveBeenCalled();
    expect(spyContact).toHaveBeenCalled();
    expect(spyUnsubscribe).toHaveBeenCalled();
  });

  it('should not called getAllList in addContact', (done) => {
    const contactService = TestBed.inject(ContactsService);
    component.dialogSubscribe = new Subscription();
    const spyUnsubscribe = spyOn(component.dialogSubscribe, 'unsubscribe').and.callThrough();
    const spyContact = spyOn(contactService, 'getAllList').and.returnValue(of([{id: '1', name: 'Jonas', emails: [], phones: [] }]));
    const spyDialog = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => of(false)} as MatDialogRef<any>);
    component.addContact();
    done();
    expect(spyDialog).toHaveBeenCalled();
    expect(spyContact).not.toHaveBeenCalled();
    expect(spyUnsubscribe).toHaveBeenCalled();
  });

  it('should called unsubscribe in editContact', (done) => {
    component.dialogSubscribe = new Subscription();
    const spyUnsubscribe = spyOn(component.dialogSubscribe, 'unsubscribe').and.callThrough();
    const spyDialog = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => of(true)} as MatDialogRef<any>);
    component.editContact({id: '1', name: 'Jonas', emails: [], phones: [] });
    done();

    expect(spyDialog).toHaveBeenCalled();
    expect(spyUnsubscribe).toHaveBeenCalled();
  });

  it('should not called removeContact', (done) => {
    const contactService = TestBed.inject(ContactsService);
    component.dialogSubscribe = new Subscription();
    const spyContact = spyOn(contactService, 'removeContact').and.returnValue(of({id: '1', name: 'Jonas', emails: [], phones: [] }));
    const spyDialog = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => of(false)} as MatDialogRef<any>);
    component.removeContact({id: '1', name: 'Jonas', emails: [], phones: [] });
    done();
    expect(spyDialog).toHaveBeenCalled();
    expect(spyContact).not.toHaveBeenCalled();
  });

  it('should called removeContact', (done) => {
    const contactService = TestBed.inject(ContactsService);
    component.dialogSubscribe = new Subscription();
    const spyContact = spyOn(contactService, 'removeContact').and.returnValue(of({id: '1', name: 'Jonas', emails: [], phones: [] }));
    const spyDialog = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => of(true)} as MatDialogRef<any>);
    const spySnackBar = spyOn(component['snackBarService'], 'openSnackBar').and.callThrough();

    component.removeContact({id: '1', name: 'Jonas', emails: [], phones: [] });
    done();
    expect(spyDialog).toHaveBeenCalled();
    expect(spyContact).toHaveBeenCalled();
    expect(spySnackBar).toHaveBeenCalled();
  });

  it('should called removeContact with error', (done) => {
    const contactService = TestBed.inject(ContactsService);
    component.dialogSubscribe = new Subscription();
    const spyContact = spyOn(contactService, 'removeContact').and.returnValue(from(throwError({})));
    const spyDialog = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => of(true)} as MatDialogRef<any>);
    const spySnackBar = spyOn(component['snackBarService'], 'openSnackBar').and.callThrough();

    component.removeContact({id: '1', name: 'Jonas', emails: [], phones: [] });
    done();
    expect(spyDialog).toHaveBeenCalled();
    expect(spyContact).toHaveBeenCalled();
    expect(spySnackBar).toHaveBeenCalled();
  });

});
