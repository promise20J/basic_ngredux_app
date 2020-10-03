import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {DashboardComponent} from './dashboard.component';
import {AdminAppReducer} from '../../store/admin-app.reducer';
import {ProfileComponent} from './profile/profile.component';
import {DoctypesComponent} from './doctypes/doctypes.component';
import {ContributorsComponent} from './contributors/contributors.component';
import {EntitiesComponent} from './entities/entities.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {EffectsModule} from '@ngrx/effects';
import {DoctypesEffects} from '../../store/effects/doctypes.effects';
import {SharedModule} from '../../shared/shared.module';
import {DoctypeFormComponent} from './doctypes/doctype-form/doctype-form.component';
import {DoctypeRegisterComponent} from './doctypes/doctype-register/doctype-register.component';
import {EntitiesEffects} from '../../store/effects/entities.effects';
import {ContributorEffects} from '../../store/effects/contributor.effects';
import {ContributorFormRegisterComponent} from './contributors/contributor-form-register/contributor-form-register.component';
import {ContributorFormUpdateComponent} from './contributors/contributor-form-update/contributor-form-update.component';
import { EntitieFormRegisterComponent } from './entities/entitie-form-register/entitie-form-register.component';
import { EntitieFormUpdateComponent } from './entities/entitie-form-update/entitie-form-update.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    DoctypesComponent,
    ContributorsComponent,
    ContributorFormRegisterComponent,
    ContributorFormUpdateComponent,
    EntitiesComponent,
    DoctypeFormComponent,
    DoctypeRegisterComponent,
    EntitieFormRegisterComponent,
    EntitieFormUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    StoreModule.forFeature('internalAdminState', AdminAppReducer),
    EffectsModule.forFeature([
      DoctypesEffects,
      ContributorEffects,
      EntitiesEffects
    ]),
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule
  ],
  exports: [
    DashboardComponent,
  ]
})
export class DashboardModule {
}
