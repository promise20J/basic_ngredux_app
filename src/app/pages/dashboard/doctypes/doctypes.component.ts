import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentTypeInterface} from '../../../interfaces/document-type.interface';
import {Store} from '@ngrx/store';
import {AppAdminState, selectDocTypes} from '../../../store/admin-app.reducer';
import {Subscription} from 'rxjs';
import {DoctypesState} from '../../../store/reducers/doctypes.reducer';
import {LoadingDocTypesAction, SetDocTypeForUpdateAction} from '../../../store/actions/doctypes.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doctypes',
  templateUrl: './doctypes.component.html',
  styles: []
})
export class DoctypesComponent implements OnInit, OnDestroy {

  docTypes: DocumentTypeInterface[] = [];
  loading: boolean;
  message: string;
  errorMessage: string;

  doctypeSubscription: Subscription;

  constructor(private store: Store<AppAdminState>, private router: Router) {
  }

  ngOnInit(): void {

    this.store.dispatch(new LoadingDocTypesAction());

    this.doctypeSubscription = this.store.select(selectDocTypes).subscribe((doctypesState: DoctypesState) => {
      this.docTypes = doctypesState.documents;
      this.loading = doctypesState.loading;
      this.message = doctypesState.infoMessage;
      this.errorMessage = doctypesState.errorMessage;
    });
  }

  ngOnDestroy(): void {
    this.doctypeSubscription.unsubscribe();
  }


  moveToUpdate(document: DocumentTypeInterface): void {
    this.store.dispatch(new SetDocTypeForUpdateAction({document}));
    this.router.navigate([`/dashboard/doctypes/${document.id}`]);
  }
}
