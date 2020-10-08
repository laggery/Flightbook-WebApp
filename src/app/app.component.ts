import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { AccountService } from 'flightbook-commons-library';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  unsubscribe$ = new Subject<void>();
  title = 'Flightbook';
  login: boolean = true;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private accountService: AccountService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('language') || navigator.language.split('-')[0]);
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.login = true;
        } else {
          this.login = false;
        }
      }
    });
  }

  logout() {
    this.accountService.logout().pipe(takeUntil(this.unsubscribe$)).subscribe(resp => {
      // TODO error handling
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
