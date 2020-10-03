import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppAdminState, selectDocTypes} from '../../../../store/admin-app.reducer';
import {DocumentTypeInterface} from '../../../../interfaces/document-type.interface';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {LoadingDocTypeByCodeAction, SetDocTypeForUpdateAction, UpdateDocTypeAction} from '../../../../store/actions/doctypes.actions';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-doctype-form',
  templateUrl: './doctype-form.component.html',
  styles: []
})
export class DoctypeFormComponent implements OnInit, OnDestroy {

  doctype: DocumentTypeInterface = null;
  code: string;
  message: string;
  errorMessage: string;
  loading: boolean;
  infoMessage: string;

  doctypeSubcsription: Subscription;

  documentFormUpdate: FormGroup;
  tittle: string;

  constructor(private store: Store<AppAdminState>, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.documentFormUpdate = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
    });

    this.activatedRoute.params.subscribe((params) => {
      if (params) {
        this.tittle = 'Actualización de documento';
        this.code = params.code;
      }
    });

    this.doctypeSubcsription = this.store.select(selectDocTypes).subscribe((state) => {

      this.loading = state.loading;

      this.doctype = state.updateDocument;
      this.errorMessage = state.errorMessage;
      this.message = state.infoMessage;

      this.infoMessage = state.infoMessage;

      if (this.doctype && !this.loading) {

        this.documentFormUpdate.setValue({
          code: this.doctype.code,
          description: this.doctype.description,
          name: this.doctype.name,
          status: this.doctype.status,
        });
      }

    });

    if (this.doctype === null) {
      this.store.dispatch(new LoadingDocTypeByCodeAction({code: this.code}));
    }
  }


  updateDocType(): void {

    if (this.documentFormUpdate.invalid) {
      this.errorMessage = 'Complete los datos';
      return;
    }

    const document = {
      ...this.documentFormUpdate.value,
      id: this.code
    };

    this.store.dispatch(new UpdateDocTypeAction({document, delete: false}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SetDocTypeForUpdateAction({document: null}));
    this.doctypeSubcsription.unsubscribe();
  }

  deleteDocument(): void {
    const document = {
      ...this.documentFormUpdate.value,
      id: this.code
    };
    this.store.dispatch(new UpdateDocTypeAction({document, delete: true}));
  }
}
