import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

export class ErrorOptions {
  title: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {

  @Input()
  errorOptions: ErrorOptions;

  constructor() {}

  ngOnInit(): void {
  }

}
