import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  failure,
  loadAllPlaneTypeOptions,
  loadAllSuccess
} from './plane-type-options-actions';
import { BiaMessageService } from 'src/app/core/bia-core/services/bia-message.service';
import { PlaneTypeOptionDas } from '../services/plane-type-option-das.service';
import { BiaOnlineOfflineService } from 'src/app/core/bia-core/services/bia-online-offline.service';
/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class PlaneTypeOptionsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllPlaneTypeOptions) /* When action is dispatched */,
      /* startWith(loadAll()), */
      /* Hit the PlanesTypes Index endpoint of our REST API */
      /* Dispatch LoadAllSuccess action to the central store with id list returned by the backend as id*/
      /* 'PlanesTypes Reducers' will take care of the rest */
      switchMap(() =>
        this.planeTypeDas.getList({ endpoint: 'allOptions', offlineMode: BiaOnlineOfflineService.isModeEnabled }).pipe(
          map((planesTypes) => loadAllSuccess({ planesTypes })),
          catchError((err) => {
            if (BiaOnlineOfflineService.isModeEnabled !== true || BiaOnlineOfflineService.isServerAvailable(err) === true) {
              this.biaMessageService.showError();
            }
            return of(failure({ error: err }));
          })
        )
      )
    )
  );

  /*
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      pluck('id'),
      switchMap((id) =>
        this.planeTypeDas.get({ id: id }).pipe(
          map((planeType) => loadSuccess({ planeType })),
          catchError((err) => {
            this.biaMessageService.showError();
            return of(failure({ error: err }));
          })
        )
      )
    )
  );
  */

  constructor(
    private actions$: Actions,
    private planeTypeDas: PlaneTypeOptionDas,
    private biaMessageService: BiaMessageService
  ) {}
}
