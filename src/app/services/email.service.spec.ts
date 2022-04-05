import {getTestBed, TestBed} from '@angular/core/testing';

import { EmailService } from './email.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ContactsService} from './contacts.service';
import {Contact, Email} from '../models/contact.model';
import {environment} from '../../environments/environment';

describe('EmailService', () => {
  let service: EmailService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const EMAIL_URL = '/email';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactsService]
    });
    injector = getTestBed();
    service = injector.inject(EmailService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Email> in addEmail', () => {
    const personId = '1';
    const dummyEmail = {
        id: '1',
        name: 'abc@gmail.com'
    };

    service.addEmail(personId, dummyEmail).subscribe((email: Email) => {
      expect(email.personId).toBe('1');
      expect(email.name).toBe('abc@gmail.com');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${EMAIL_URL}/add/${personId}`);
    expect(req.request.method).toBe('POST');
    req.flush({...dummyEmail, personId});
  });

  it('should return an Observable<Email> in editEmail', () => {
    const personId = '1';
    const dummyEmail = {
        id: '1',
        name: 'abc@gmail.com'
    };

    service.editEmail(personId, dummyEmail).subscribe((email: Email) => {
      expect(email.personId).toBe('1');
      expect(email.name).toBe('abc@gmail.com');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${EMAIL_URL}/update/${personId}/${dummyEmail.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({...dummyEmail, personId});
  });

  it('should return an Observable<Email> in removeEmail', () => {
    const personId = '1';
    const dummyEmail = {
        id: '1',
        name: 'abc@gmail.com'
    };

    service.removeEmail(dummyEmail).subscribe((email: Email) => {
      expect(email.personId).toBe('1');
      expect(email.name).toBe('abc@gmail.com');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${EMAIL_URL}/delete/${dummyEmail.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({...dummyEmail, personId});
  });

  it('should return a boolean with a value of loading operation', () => {
    service.setLoading(true);
    expect(service.getLoading()).toBeTruthy();
  });

});
