import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styles: []
})
export class InfoContainerComponent {
  @Input() message: string;

  constructor() {
  }

}
