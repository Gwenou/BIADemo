import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAllNotificationTypeOptions } from 'src/app/domains/notification-type-option/store/notification-type-option.state';
import { loadAllNotificationTypeOptions } from 'src/app/domains/notification-type-option/store/notification-type-options-actions';
import { getAllRoleOptions } from 'src/app/domains/role-option/store/role-option.state';
import { loadAllRoleOptions } from 'src/app/domains/role-option/store/role-options-actions';
import { getAllUserOptions } from 'src/app/domains/user-option/store/user-option.state';
import { loadAllUserOptions } from 'src/app/domains/user-option/store/user-options-actions';
import { DictOptionDto } from 'src/app/shared/bia-shared/components/table/bia-table/dict-option-dto';
import { OptionDto } from 'src/app/shared/bia-shared/model/option-dto';
import { AppState } from 'src/app/store/state';

@Injectable({
    providedIn: 'root'
})
export class NotificationOptionsService {
    dictOptionDtos$: Observable<DictOptionDto[]>;

    notificationTypeOptions$: Observable<OptionDto[]>;
    roleOptions$: Observable<OptionDto[]>;
    userOptions$: Observable<OptionDto[]>;

    constructor(
        private store: Store<AppState>,
    ) {
        this.notificationTypeOptions$ = this.store.select(getAllNotificationTypeOptions).pipe();
        this.roleOptions$ = this.store.select(getAllRoleOptions).pipe();
        this.userOptions$ = this.store.select(getAllUserOptions).pipe();

        // [Calc] Dict is used in calc mode only. It map the column name with the list OptionDto.
        this.dictOptionDtos$ = combineLatest([this.notificationTypeOptions$, this.roleOptions$, this.userOptions$]).pipe(
            map(
                (options) =>
                <DictOptionDto[]>[
                    new DictOptionDto('type', options[0]),
                    new DictOptionDto('notifiedRoles', options[1]),
                    new DictOptionDto('notifiedUsers', options[2]),
                    new DictOptionDto('createdBy', options[2]),
                ]
            )
        );
    }

    loadAllOptions() {
        this.store.dispatch(loadAllNotificationTypeOptions());
        this.store.dispatch(loadAllRoleOptions());
        this.store.dispatch(loadAllUserOptions());
    }
}
