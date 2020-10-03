import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-container',
  templateUrl: './loading-container.component.html',
  styles: [
  ]
})
export class LoadingContainerComponent implements OnInit {
  @Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
