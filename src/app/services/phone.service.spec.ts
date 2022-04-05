import {getTestBed, TestBed} from '@angular/core/testing';

import { PhoneService } from './phone.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ContactsService} from './contacts.service';
import {Email, Phone} from '../models/contact.model';
import {environment} from '../../environments/environment';

describe('PhoneService', () => {
  let service: PhoneService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const PHONE_URL = '/phone';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactsService, PhoneService]
    });
    injector = getTestBed();
    service = injector.inject(PhoneService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Phone> in addPhone', () => {
    const personId = '1';
    const dummyPhone = {
      id: '1',
      phoneNumber: '82999999999',
      isWhatsapp: false
    };

    service.addPhone(personId, dummyPhone).subscribe((phone: Phone) => {
      expect(phone.personId).toBe('1');
      expect(phone.phoneNumber).toBe('82999999999');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${PHONE_URL}/add/${personId}`);
    expect(req.request.method).toBe('POST');
    req.flush({...dummyPhone, personId});
  });

  it('should return an Observable<Phone> in editPhone', () => {
    const personId = '1';
    const dummyPhone = {
      id: '1',
      phoneNumber: '82999999999',
      isWhatsapp: false
    };

    service.editPhone(personId, dummyPhone).subscribe((phone: Phone) => {
      expect(phone.personId).toBe('1');
      expect(phone.phoneNumber).toBe('82999999999');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${PHONE_URL}/update/${personId}/${dummyPhone.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({...dummyPhone, personId});
  });

  it('should return an Observable<Phone> in removePhone', () => {
    const personId = '1';
    const dummyPhone = {
      id: '1',
      phoneNumber: '82999999999',
      isWhatsapp: false
    };

    service.removePhone(dummyPhone).subscribe((phone: Phone) => {
      expect(phone.personId).toBe('1');
      expect(phone.phoneNumber).toBe('82999999999');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${PHONE_URL}/delete/${dummyPhone.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({...dummyPhone, personId});
  });

  it('should return a boolean with a value of loading operation', () => {
    service.setLoading(true);
    expect(service.getLoading()).toBeTruthy();
  });
});
