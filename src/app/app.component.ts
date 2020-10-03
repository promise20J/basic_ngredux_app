import {Component, OnInit} from '@angular/core';

declare function jQuery(s: any): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'entitiesapp';

  ngOnInit(): void {
    jQuery('.preloader').fadeOut();
  }
}
