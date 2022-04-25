import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAllLanguageOptions } from 'src/app/domains/bia-domains/language-option/store/language-option.state';
import { loadAllLanguageOptions } from 'src/app/domains/bia-domains/language-option/store/language-options-actions';
import { getAllNotificationTypeOptions } from 'src/app/domains/bia-domains/notification-type-option/store/notification-type-option.state';
import { loadAllNotificationTypeOptions } from 'src/app/domains/bia-domains/notification-type-option/store/notification-type-options-actions';
import { getAllRoleOptions } from 'src/app/domains/bia-domains/role-option/store/role-option.state';
import { loadAllRoleOptions } from 'src/app/domains/bia-domains/role-option/store/role-options-actions';
import { getAllUserOptions } from 'src/app/domains/bia-domains/user-option/store/user-option.state';
import { DomainUserOptionsActions } from 'src/app/domains/bia-domains/user-option/store/user-options-actions';
import { DictOptionDto } from 'src/app/shared/bia-shared/components/table/bia-table/dict-option-dto';
import { OptionDto } from 'src/app/shared/bia-shared/model/option-dto';
import { TeamTypeId } from 'src/app/shared/constants';
import { AppState } from 'src/app/store/state';

@Injectable({
    providedIn: 'root'
})
export class NotificationOptionsService {
    dictOptionDtos$: Observable<DictOptionDto[]>;

    notificationTypeOptions$: Observable<OptionDto[]>;
    roleOptions$: Observable<OptionDto[]>;
    userOptions$: Observable<OptionDto[]>;
    languageOptions$: Observable<OptionDto[]>;

    constructor(
        private store: Store<AppState>,
    ) {
        this.notificationTypeOptions$ = this.store.select(getAllNotificationTypeOptions);
        this.roleOptions$ = this.store.select(getAllRoleOptions);
        this.userOptions$ = this.store.select(getAllUserOptions);
        this.languageOptions$ = this.store.select(getAllLanguageOptions);

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
        this.store.dispatch(loadAllRoleOptions({ teamTypeId: TeamTypeId.Site }));
        this.store.dispatch(DomainUserOptionsActions.loadAll());
        this.store.dispatch(loadAllLanguageOptions());
    }
}
