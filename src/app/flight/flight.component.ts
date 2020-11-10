import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { Subject, Observable } from 'rxjs';
import { Flight, Pager, FlightService } from 'flightbook-commons-library';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  flights$: Observable<Flight[]>;
  pager = new Pager();
  private limit = 20;

  displayedColumns: string[] = ['nb', 'date', 'start', 'landing', 'glider', 'time', 'km', 'description'];
  @ViewChild('table', {read: ElementRef}) table: ElementRef;

  constructor(
    private flightService: FlightService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
    this.flights$ = this.flightService.getState();
    if (this.flightService.getValue().length === 0) {
      this.getFlights();
    }

    this.flightService.getPager({ limit: this.limit }).pipe(takeUntil(this.unsubscribe$)).subscribe(async (res: Pager) => {
      this.pager = res;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private async getFlights() {
    this.flightService.getFlights({ limit: this.limit }).pipe(takeUntil(this.unsubscribe$)).subscribe(async (res: Flight[]) => {
      // this.isLoading = false;
    }, async (error: any) => {
      // this.isLoading = false;
    });
  }

  handlePage(event: PageEvent) {
    this.table.nativeElement.scrollIntoView();
    let offset = event.pageIndex * event.pageSize;
    this.flightService.getFlights({ limit: event.pageSize, offset: offset, clearStore: true }).pipe(takeUntil(this.unsubscribe$)).subscribe(async (res: Flight[]) => {
      // this.isLoading = false;
    }, async (error: any) => {
      // this.isLoading = false;
    });
    return event;
  }

  openDialog(flight: Flight): void {
  }

}
