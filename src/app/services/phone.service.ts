import {Injectable} from '@angular/core';
import {ContactsService, Routes} from './contacts.service';
import {Phone} from '../models/contact.model';
import {Observable} from 'rxjs';
import {Method} from '../models/operation.model';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  private PHONE_URL = '/phone';

  constructor(private contactsService: ContactsService) { }

  addPhone(personId: string, data: Phone): Observable<Phone> {
    this.setLoading(true);
    return this.contactsService.request({url: `${this.PHONE_URL}${Routes.ADD}/${personId}`, method: Method.Post}, data);
  }

  editPhone(personId, data: Phone): Observable<Phone> {
    this.setLoading(true);
    return this.contactsService.request({url: `${this.PHONE_URL}${Routes.UPDATE}/${personId}/${data.id}`, method: Method.Put}, data);
  }

  removePhone(data: Phone): Observable<Phone> {
    this.setLoading(true);
    return this.contactsService.request({url: `${this.PHONE_URL}${Routes.DELETE}/${data.id}`, method: Method.Delete}, undefined);
  }

  setLoading(loading: boolean): void {
    this.contactsService.setLoadingOperation(loading);
  }

  getLoading(): boolean {
    return this.contactsService.getLoadingOperation();
  }
}
