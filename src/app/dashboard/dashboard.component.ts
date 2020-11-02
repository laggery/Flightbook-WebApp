import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NewsService, News, FlightStatistic, FlightService, Flight, GliderService, Glider, PlaceService, Place } from 'flightbook-commons-library';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewsComponent } from './news/news.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  newsData$: Observable<News[]>;
  flights: Flight[];
  gliders: Glider[];
  places: Place[];
  displayedFlightColumns: string[] = ['number', 'date', 'start', 'landing'];
  displayedGliderColumns: string[] = ['brand', 'name', 'flights', 'time'];
  displayedPlaceColumns: string[] = ['name', 'altitude'];
  statistics: FlightStatistic;

  gridColumns = 3;

  constructor(
    private translate: TranslateService,
    private newsService: NewsService,
    private flightService: FlightService,
    private gliderService: GliderService,
    private placeService: PlaceService,
    public dialog: MatDialog
  ) {
    this.newsData$ = this.newsService.getState();
    if (this.newsService.getValue().length === 0) {
      this.getNews();
    }

    this.statistics = new FlightStatistic();
    this.getStatistics();

    this.flights = [];
    this.getFlights();

    this.gliders = [];
    this.getGliders();

    this.places = [];
    this.getPlaces();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private async getNews() {
    this.newsService.getNews(this.translate.currentLang).pipe(takeUntil(this.unsubscribe$)).subscribe(async (resp: News[]) => {
      // await loading.dismiss();
    }, async (error: any) => {
      // await loading.dismiss();
    });
  }

  openNewsDialog(): void {
    const dialogRef = this.dialog.open(NewsComponent, {
      width: '900px',
      maxHeight: '90vh'
    });
  }

  private async getStatistics() {
    this.flightService.getStatistics().pipe(takeUntil(this.unsubscribe$)).subscribe(async (res: FlightStatistic) => {
      // await loading.dismiss();
      this.statistics = res;
    }, async (error: any) => {
      // await loading.dismiss();
    });
  }

  private async getFlights() {
    this.flightService.getFlights({ limit: 5, store: false }).pipe(takeUntil(this.unsubscribe$)).subscribe((res: Flight[]) => {
      // await loading.dismiss();
      this.flights = res;
    }, async (error: any) => {
      // await loading.dismiss();
    });
  }

  private async getGliders() {
    this.gliderService.getGliders({ limit: 5, store: false }).pipe(takeUntil(this.unsubscribe$)).subscribe((res: Glider[]) => {
      // await loading.dismiss();
      this.gliders = res;
    }, async (error: any) => {
      // await loading.dismiss();
    });
  }

  private async getPlaces() {
    this.placeService.getPlaces({ limit: 5, store: false }).pipe(takeUntil(this.unsubscribe$)).subscribe((res: Place[]) => {
      // await loading.dismiss();
      this.places = res;
    }, async (error: any) => {
      // await loading.dismiss();
    });
  }

}
