import {Injectable} from '@angular/core';
import {ContactsService, Routes} from './contacts.service';
import {Email} from '../models/contact.model';
import {Observable} from 'rxjs';
import {Method} from '../models/operation.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private EMAIL_URL = '/email';

  constructor(private contactsService: ContactsService) { }

  addEmail(personId: string, data: Email): Observable<Email> {
    this.setLoading(true);
    return this.contactsService.request({url: `${this.EMAIL_URL}${Routes.ADD}/${personId}`, method: Method.Post}, data);
  }

  editEmail(personId: string, data: Email): Observable<Email> {
    this.setLoading(true);
    return this.contactsService.request({url: `${this.EMAIL_URL}${Routes.UPDATE}/${personId}/${data.id}`, method: Method.Put}, data);
  }

  removeEmail(data: Email): Observable<Email> {
    this.setLoading(true);
    return this.contactsService.request({url: `${this.EMAIL_URL}${Routes.DELETE}/${data.id}`, method: Method.Delete}, undefined);
  }

  setLoading(loading: boolean): void {
    this.contactsService.setLoadingOperation(loading);
  }

  getLoading(): boolean {
    return this.contactsService.getLoadingOperation();
  }
}
