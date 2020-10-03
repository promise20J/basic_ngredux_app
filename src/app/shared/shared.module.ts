import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorContainerComponent} from './error-container/error-container.component';
import {InfoContainerComponent} from './info-container/info-container.component';
import {LoadingContainerComponent} from './loading-container/loading-container.component';
import {SuccessContainerComponent} from './success-container/success-container.component';


@NgModule({
  declarations: [
    ErrorContainerComponent,
    InfoContainerComponent,
    LoadingContainerComponent,
    SuccessContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorContainerComponent,
    InfoContainerComponent,
    LoadingContainerComponent,
    SuccessContainerComponent
  ]
})
export class SharedModule {
}
