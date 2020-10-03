import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard.component';
import {AdminAppReducer} from '../../store/admin-app.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    StoreModule.forFeature('adminState', AdminAppReducer),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HomeComponent,
    DashboardComponent,
  ]
})
export class DashboardModule {
}
