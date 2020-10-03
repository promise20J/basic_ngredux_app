import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {DoctypesComponent} from './doctypes/doctypes.component';
import {ContributorsComponent} from './contributors/contributors.component';
import {EntitiesComponent} from './entities/entities.component';
import {DoctypeFormComponent} from './doctypes/doctype-form/doctype-form.component';
import {DoctypeRegisterComponent} from './doctypes/doctype-register/doctype-register.component';
import {ContributorFormRegisterComponent} from './contributors/contributor-form-register/contributor-form-register.component';
import {ContributorFormUpdateComponent} from './contributors/contributor-form-update/contributor-form-update.component';
import {EntitieFormUpdateComponent} from './entities/entitie-form-update/entitie-form-update.component';
import {EntitieFormRegisterComponent} from './entities/entitie-form-register/entitie-form-register.component';


const adminRoutes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'profile', component: ProfileComponent},
      {path: 'entities', component: EntitiesComponent},
      {path: 'entities/register', component: EntitieFormRegisterComponent},
      {path: 'entities/:code', component: EntitieFormUpdateComponent},
      {path: 'contributors', component: ContributorsComponent},
      {path: 'contributors/register', component: ContributorFormRegisterComponent},
      {path: 'contributors/:code', component: ContributorFormUpdateComponent},
      {path: 'doctypes', component: DoctypesComponent},
      {path: 'doctypes/register', component: DoctypeRegisterComponent},
      {path: 'doctypes/:code', component: DoctypeFormComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
