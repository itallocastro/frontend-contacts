import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {text: string},
    public dialogRef: MatDialogRef<ConfirmModalComponent>
  ) { }

  ngOnInit(): void {
  }

  close(value: boolean): void {
    this.dialogRef.close(value);
  }

  back(): void {
    this.close(false);
  }

  confirm(): void {
    this.close(true);
  }
}
