import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { News, NewsService } from 'flightbook-commons-library';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  newsData$: Observable<News[]>;

  constructor(
    private translate: TranslateService,
    private newsService: NewsService
  ) {
    this.newsData$ = this.newsService.getState();

    if (this.newsService.getValue().length === 0) {
      this.initialDataLoad();
    }
  }

  private async initialDataLoad() {
    this.newsService.getNews(this.translate.currentLang).pipe(takeUntil(this.unsubscribe$)).subscribe(async (resp: News[]) => {
      // await loading.dismiss();
    }, async (error: any) => {
      // await loading.dismiss();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
