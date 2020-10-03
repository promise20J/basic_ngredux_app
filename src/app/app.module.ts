import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AppReducer} from './store/app.reducer';
import {HttpClientModule} from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import {AdminAuthEffects} from './store/effects/admin-auth.effects';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(AppReducer, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    RouterModule,
    HttpClientModule,
    EffectsModule.forRoot([AdminAuthEffects]),
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
