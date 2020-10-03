import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './pages/auth/register/register.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {AdminTokenGuard} from './guards/admin-token.guard';

const AppRoutes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AdminTokenGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AdminTokenGuard]},
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AdminTokenGuard]
  },
  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes, {scrollPositionRestoration: 'enabled'}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
