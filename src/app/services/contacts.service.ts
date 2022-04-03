import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Method, Operation} from '../models/operation.model';
import { Observable } from 'rxjs';
import {Contact} from '../models/contact.model';
import { environment } from '../../environments/environment';


export enum Routes {
  GET = '/get',
  ADD = '/add',
  UPDATE = '/update',
  DELETE = '/delete'
}

@Injectable({
  providedIn: 'root'
})

export class ContactsService {

  private CONTACT_URL = '/person';

  loadingOperation = false;
  constructor(private httpClient: HttpClient) {
  }

  request(operation: Operation, data: any): Observable<any> {
    return this.httpClient[operation.method](environment.apiUrl + operation.url, data);
  }

  getAllList(): Observable<Contact[]> {
    return this.request({url: '/person/', method: Method.Get}, undefined);
  }

  addContact(data: Contact): Observable<Contact> {
    this.setLoadingOperation(true);
    return this.request({url: `${this.CONTACT_URL}${Routes.ADD}`, method: Method.Post}, data);
  }

  editContact(data: Contact): Observable<Contact> {
    this.setLoadingOperation(true);
    return this.request({url: `${this.CONTACT_URL}${Routes.UPDATE}/${data.id}`, method: Method.Put}, data);
  }

  removeContact(personId: string): Observable<Contact> {
    this.setLoadingOperation(true);
    return this.request({url: `${this.CONTACT_URL}${Routes.DELETE}/${personId}`, method: Method.Delete}, undefined);
  }

  setLoadingOperation(loading: boolean): void {
    this.loadingOperation = loading;
  }

  getLoadingOperation(): boolean {
    return this.loadingOperation;
  }

}
