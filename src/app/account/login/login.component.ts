import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AccountService } from 'flightbook-commons-library';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async login(loginForm: any) {
    if (loginForm.valid) {
      console.log(this.loginData);

      this.accountService.login(this.loginData).pipe(takeUntil(this.unsubscribe$)).subscribe(async resp => {
        localStorage.setItem('access_token', resp.access_token);
        localStorage.setItem('refresh_token', resp.refresh_token);
        this.router.navigate(['news']);
      },
        (async (error: any) => {
          // await loading.dismiss();
          if (error.status === 401) {
            // const alert = await this.alertController.create({
            //   header: this.translate.instant('buttons.login'),
            //   message: this.translate.instant('message.emailpwdnotcorrect'),
            //   buttons: [this.translate.instant('buttons.done')]
            // });
            // await alert.present();
          }
        }));
    } else {
      // const alert = await this.alertController.create({
      //   header: this.translate.instant('buttons.login'),
      //   message: this.translate.instant('message.nologinpwd'),
      //   buttons: [this.translate.instant('buttons.done')]
      // });
      // await alert.present();
    }
  }

}
