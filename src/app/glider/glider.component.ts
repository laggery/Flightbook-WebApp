import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { GliderService, Glider, Pager } from 'flightbook-commons-library';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-glider',
  templateUrl: './glider.component.html',
  styleUrls: ['./glider.component.scss']
})
export class GliderComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  gliders$: Observable<Glider[]>;
  pager = new Pager();
  private limit = 20;

  displayedColumns: string[] = ['brand', 'name', 'tandem', 'flights', 'time'];
  @ViewChild('table', {read: ElementRef}) table: ElementRef;

  constructor(
    private gliderService: GliderService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
    this.gliders$ = this.gliderService.getState();
    if (this.gliderService.getValue().length === 0) {
      this.getGliders();
    }

    this.gliderService.getPager({ limit: this.limit }).pipe(takeUntil(this.unsubscribe$)).subscribe(async (res: Pager) => {
      this.pager = res;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private async getGliders() {
    this.gliderService.getGliders({ limit: this.limit }).pipe(takeUntil(this.unsubscribe$)).subscribe(async (res: Glider[]) => {
      // this.isLoading = false;
    }, async (error: any) => {
      // this.isLoading = false;
    });
  }

  handlePage(event: PageEvent) {
    this.table.nativeElement.scrollIntoView();
    let offset = event.pageIndex * event.pageSize;
    this.gliderService.getGliders({ limit: event.pageSize, offset: offset, clearStore: true }).pipe(takeUntil(this.unsubscribe$)).subscribe(async (res: Glider[]) => {
      // this.isLoading = false;
    }, async (error: any) => {
      // this.isLoading = false;
    });
    return event;
  }

  openDialog(glider: Glider): void {
  }

}
