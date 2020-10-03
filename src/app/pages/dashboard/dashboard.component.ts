import {Component, OnInit} from '@angular/core';
import {AdminLogoutAction} from '../../store/actions/admin-auth.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(new AdminLogoutAction());
  }
}
