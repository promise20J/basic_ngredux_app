import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-success-container',
  templateUrl: './success-container.component.html',
  styles: [
  ]
})
export class SuccessContainerComponent implements OnInit {

  @Input() message: string;
  constructor() { }

  ngOnInit(): void {
  }

}
