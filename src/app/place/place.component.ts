import { Component, OnInit } from '@angular/core';
import { PlaceService, Place } from 'flightbook-commons-library';
import { Subject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlaceFormComponent } from './place-form/place-form.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {
  unsubscribe$ = new Subject<void>();
  places$: Observable<Place[]>;
  private limit = 20;
  private dialogRef: MatDialogRef<PlaceFormComponent>;

  displayedColumns: string[] = ['name', 'altitude'];

  constructor(
    private placeService: PlaceService,
    public dialog: MatDialog,
    private translate: TranslateService
  ) {
    this.places$ = this.placeService.getState();

    if (this.placeService.getValue().length === 0) {
      this.initialDataLoad();
    }
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

  openDialog(place: Place): void {
    if (!place) {
      place = new Place();
    } else {
      place = _.cloneDeep(place);
    }
    this.dialogRef = this.dialog.open(PlaceFormComponent, {
      width: '500px',
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
