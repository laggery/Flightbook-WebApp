import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorComponent } from '../application-components/error/error.component';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    private dialogRef: MatDialogRef<ErrorComponent>;

    constructor(
        private router: Router,
        private dialog: MatDialog
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.router.navigate(['login']);
            }

            if (err.status >= 500 || err.status === 0) {
                if (!this.dialogRef || this.dialogRef.getState()!=0) {
                    this.dialogRef = this.dialog.open(ErrorComponent, {
                        width: '500px',
                        disableClose: true
                    });
                }
            }
            return throwError(err);
        }));
    }
}
