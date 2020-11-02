import { Component, OnInit, OnDestroy } from '@angular/core';
import { GliderService, Glider } from 'flightbook-commons-library';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-glider',
  templateUrl: './glider.component.html',
  styleUrls: ['./glider.component.scss']
})
export class GliderComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  gliders$: Observable<Glider[]>;
  private limit = 20;

  displayedColumns: string[] = ['brand', 'name', 'tandem', 'flights', 'time'];

  constructor(
    private gliderService: GliderService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
    this.gliders$ = this.gliderService.getState();
    if (this.gliderService.getValue().length === 0) {
      this.getGliders();
    }
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

  openDialog(glider: Glider): void {
  }

}
