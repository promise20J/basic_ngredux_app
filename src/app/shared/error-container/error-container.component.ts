import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-error-container',
  templateUrl: './error-container.component.html',
  styles: [
  ]
})
export class ErrorContainerComponent implements OnInit {
  @Input() errorMessage: any;

  constructor() { }

  ngOnInit(): void {
  }

}
