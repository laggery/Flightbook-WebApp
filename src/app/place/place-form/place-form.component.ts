import { Component, OnInit, Inject, OnDestroy, EventEmitter } from '@angular/core';
import { Place, PlaceService } from 'flightbook-commons-library';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ErrorOptions } from 'src/app/application-components/alert/alert.component';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss']
})
export class PlaceFormComponent implements OnInit {
  place: Place;
  showAlert = false;
  errorOptions: ErrorOptions;

  savePlace = new EventEmitter();

  constructor(
    private dialogRef: MatDialogRef<PlaceFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: Place,
  ) {
    this.place = data;
    this.errorOptions = new ErrorOptions();
   }

  ngOnInit(): void {
  }

  async saveElement(placeForm: any) {
    if (placeForm.valid) {
      this.savePlace.emit(this.place);
    } else {
      // const alert = await this.alertController.create({
      //   header: this.translate.instant('message.errortitle'),
      //   message: this.translate.instant('message.mendatoryFields'),
      //   buttons: [this.translate.instant('buttons.done')]
      // });
      // await alert.present();
    }
  }
  closeModal() {
    this.dialogRef.close();
  }
}
