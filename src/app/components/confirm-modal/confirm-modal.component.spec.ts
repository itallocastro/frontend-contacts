import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModalComponent } from './confirm-modal.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  const mockMatDialogData =  {text: 'some text'};
  const mockMatDialogRef = {close: (data: any) => {return; }};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmModalComponent ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: mockMatDialogData},
        {provide: MatDialogRef, useValue: mockMatDialogRef}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
