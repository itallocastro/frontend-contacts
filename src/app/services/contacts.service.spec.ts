import { TestBed, getTestBed } from '@angular/core/testing';

import { ContactsService } from './contacts.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Contact, Email, Phone} from '../models/contact.model';
import { environment } from '../../environments/environment';

describe('ContactsService', () => {
  let injector: TestBed;
  let service: ContactsService;
  let httpMock: HttpTestingController;
  const CONTACT_URL = '/person';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactsService]
    });
    injector = getTestBed();
    service = injector.inject(ContactsService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Contact[]>', () => {
    const dummyContacts = [
      {
        id: '1',
        name: 'John',
        emails: [],
        phones: []
      }
    ];

    service.getAllList().subscribe((contacts: Contact[]) => {
      expect(contacts.length).toBe(1);
      expect(contacts).toEqual(dummyContacts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${CONTACT_URL}/`);
    expect(req.request.method).toBe('GET')
    req.flush(dummyContacts);
  });

  it('should return an Observable<Contact>', () => {
    const dummyContact = {
        name: 'John',
        emails: [],
        phones: []
    };

    service.addContact(dummyContact).subscribe((contact: Contact) => {
      expect(contact.id).toBe('1');
      expect(contact).toEqual({...dummyContact, id: '1'});
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${CONTACT_URL}/add`);
    expect(req.request.method).toBe('POST');
    req.flush({...dummyContact, id: '1'});
  });

  it('should return an Observable<Contact> in edit', () => {
    const dummyContact = {
        id: '1',
        name: 'John',
        emails: [],
        phones: []
    };

    service.editContact(dummyContact).subscribe((contacts: Contact) => {
      expect(contacts.id).toBe('1');
      expect(contacts).toEqual(dummyContact);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${CONTACT_URL}/update/${dummyContact.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyContact);
  });

  it('should return an Observable<Contact> in removeContact', () => {
    const dummyContact = {
        id: '1',
        name: 'John',
        emails: [],
        phones: []
    };

    service.removeContact('1').subscribe((contacts: Contact) => {
      expect(contacts.id).toBe('1');
      expect(contacts).toEqual(dummyContact);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${CONTACT_URL}/delete/${dummyContact.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyContact);
  });

  it('should return a boolean with a value of loading operation', () => {
    service.setLoadingOperation(true);
    expect(service.getLoadingOperation()).toBeTruthy();
  });
});
