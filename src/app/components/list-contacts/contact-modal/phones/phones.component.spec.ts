import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonesComponent } from './phones.component';
import {FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SnackBarService} from '../../../../services/snack-bar.service';
import {PhoneService} from '../../../../services/phone.service';
import {MatDialogModule} from '@angular/material/dialog';
import {forwardRef} from '@angular/core';

describe('PhonesComponent', () => {
  let component: PhonesComponent;
  let fixture: ComponentFixture<PhonesComponent>;

  const phoneServiceMock = {getLoading: () => true};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhonesComponent ],
      imports: [
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        {provide: PhoneService, useValue: phoneServiceMock},
        SnackBarService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonesComponent);
    component = fixture.componentInstance;
    component.phoneCurrent = new FormControl('', [Validators.required]);
    component.isWhatsappCurrent = new FormControl(false, [Validators.required]);
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
