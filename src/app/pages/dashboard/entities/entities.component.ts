import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {EntitieInterface} from '../../../interfaces/entitie.interface';
import {Store} from '@ngrx/store';
import {AppAdminState, selectEntitieFeature} from '../../../store/admin-app.reducer';
import {Router} from '@angular/router';
import {EntitiesState} from '../../../store/reducers/entities.reducer';
import {LoadingEntitieAction, SetEntitieForUpdateAction} from '../../../store/actions/entitie.actions';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styles: [
    '.pointer {cursor: pointer}'
  ]
})
export class EntitiesComponent implements OnInit, OnDestroy {

  entities: EntitieInterface[] = [];
  loading: boolean;
  message: string;
  errorMessage: string;

  entitiesSubscription: Subscription;


  constructor(private store: Store<AppAdminState>, private router: Router) {
  }

  ngOnInit(): void {

    this.store.dispatch(new LoadingEntitieAction());

    this.entitiesSubscription = this.store.select(selectEntitieFeature).subscribe((entitieState: EntitiesState) => {
      this.entities = entitieState.entities;
      this.loading = entitieState.loading;
      this.message = entitieState.infoMessage;
      this.errorMessage = entitieState.errorMessage;
    });
  }

  ngOnDestroy(): void {
    this.entitiesSubscription.unsubscribe();
  }


  moveToUpdate(entitie: EntitieInterface): void {
    this.store.dispatch(new SetEntitieForUpdateAction({entitie}));
    this.router.navigate([`/dashboard/entities/${entitie.code}`]);
  }

}
