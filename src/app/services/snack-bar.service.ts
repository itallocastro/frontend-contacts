import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, duration: number, styleClass: string): void {
    this.snackBar.open(message, 'Fechar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: duration * 1000,
      panelClass: [styleClass]
    });
  }
}
