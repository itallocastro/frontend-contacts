import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDataComponent } from './personal-datas.component';
import {ContactsService} from '../../../../services/contacts.service';
import {SnackBarService} from '../../../../services/snack-bar.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

describe('PersonalDatasComponent', () => {
  let component: PersonalDataComponent;
  let fixture: ComponentFixture<PersonalDataComponent>;

  const contactServiceMock = {getLoadingOperation: () => true};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDataComponent ],
      imports: [
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: ContactsService, useValue: contactServiceMock},
        SnackBarService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDataComponent);
    component = fixture.componentInstance;
    component.nameCurrent = new FormControl('', [Validators.required]);
    component.contact = {id: '1', name: 'Jonas', emails: [], phones: [] };
    component.nextStep = () => {return; };
    component.setStep = (n: number) => {return; };
    component.step = 0;
    component.matcher = null;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
