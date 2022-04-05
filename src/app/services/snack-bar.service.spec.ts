import {getTestBed, TestBed} from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let snackBar: MatSnackBar;
  let injector: TestBed;
  const PHONE_URL = '/phone';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [SnackBarService]
    });
    injector = getTestBed();
    service = injector.inject(SnackBarService);
    snackBar = injector.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should snackBar.open have been called', (done) => {
  //   const spy = spyOn(service, 'openSnackBar').and.callFake(() => {return; });
  //   const spySnackBar = spyOn(snackBar, 'open').and.returnValue(null);
  //   service.openSnackBar('Hello', 2, undefined);
  //   done();
  //   expect(spy).toHaveBeenCalled();
  //   expect(spySnackBar).toHaveBeenCalled();
  // });
});
