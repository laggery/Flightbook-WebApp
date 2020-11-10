import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { PlaceService, Place, Pager } from 'flightbook-commons-library';
import { Subject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlaceFormComponent } from './place-form/place-form.component';
import { TranslateService } from '@ngx-translate/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  places$: Observable<Place[]>;
  pager = new Pager();
  private limit = 20;
  private dialogRef: MatDialogRef<PlaceFormComponent>;
  @ViewChild('table', {read: ElementRef}) table: ElementRef;

  displayedColumns: string[] = ['name', 'altitude'];

  constructor(
    private placeService: PlaceService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
    this.places$ = this.placeService.getState();

    if (this.placeService.getValue().length === 0) {
      this.initialDataLoad();
    }

    this.placeService.getPager({ limit: this.limit }).pipe(takeUntil(this.unsubscribe$)).subscribe(async (res: Pager) => {
      this.pager = res;
    });
  }

  private async initialDataLoad() {
    this.placeService.getPlaces({ limit: this.limit }).pipe(takeUntil(this.unsubscribe$)).subscribe(async (res: Place[]) => {
      // this.isLoading = false;
    }, async (error: any) => {
      // this.isLoading = false;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handlePage(event: PageEvent) {
    this.table.nativeElement.scrollIntoView();
    let offset = event.pageIndex * event.pageSize;
    this.placeService.getPlaces({ limit: event.pageSize, offset: offset, clearStore: true }).pipe(takeUntil(this.unsubscribe$)).subscribe(async (res: Place[]) => {
      // this.isLoading = false;
    }, async (error: any) => {
      // this.isLoading = false;
    });
    return event;
  }

  openDialog(place: Place): void {
    if (!place) {
      place = new Place();
    } else {
      place = _.cloneDeep(place);
    }
    this.dialogRef = this.dialog.open(PlaceFormComponent, {
      width: '900px',
      data: place,
      disableClose: true
    });
    this.dialogRef.componentInstance.savePlace.subscribe((place: Place) => {
      if (place.id) {
        this.updatePlace(place);
      } else {
        this.addPlace(place);
      }
    });
  }

  private async addPlace(place: Place) {
    this.placeService.postPlace(place).pipe(takeUntil(this.unsubscribe$)).subscribe(async (res: Place) => {
      // await loading.dismiss();
      this.placeService.setState([]);
      this.initialDataLoad()
      this.dialogRef.close();

    },
      (async (error: any) => {
        // await loading.dismiss();
        if (error.status === 409) {
          this.dialogRef.componentInstance.showAlert = true;
          this.dialogRef.componentInstance.errorOptions.type = 'critical';
          this.dialogRef.componentInstance.errorOptions.title = this.translate.instant('message.placeExist');
        }
      })
    );
  }

  private async updatePlace(place: Place) {
    this.placeService.putPlace(place).pipe(takeUntil(this.unsubscribe$)).subscribe(async (res: Place) => {
      // await loading.dismiss();
      this.placeService.setState([]);
      this.initialDataLoad()
      this.dialogRef.close();
    },
      (async (error: any) => {
        // await loading.dismiss();
        if (error.status === 409) {
          this.dialogRef.componentInstance.showAlert = true;
          this.dialogRef.componentInstance.errorOptions.type = 'critical';
          this.dialogRef.componentInstance.errorOptions.title = this.translate.instant('message.placeExist');
        }
      })
    );
  }
}
