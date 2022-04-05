import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsComponent } from './emails.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {SnackBarService} from '../../../../services/snack-bar.service';
import {EmailService} from '../../../../services/email.service';

describe('EmailsComponent', () => {
  let component: EmailsComponent;
  let fixture: ComponentFixture<EmailsComponent>;

  const emailServiceMock = {getLoading: () => true};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailsComponent ],
      imports: [
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        {provide: EmailService, useValue: emailServiceMock},
        SnackBarService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsComponent);
    component = fixture.componentInstance;
    component.emailCurrent = new FormControl('', [Validators.required]);
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
