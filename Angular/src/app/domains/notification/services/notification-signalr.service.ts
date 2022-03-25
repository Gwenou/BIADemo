import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { BiaSignalRService } from 'src/app/core/bia-core/services/bia-signalr.service';
import { addUnreadNotification, removeUnreadNotification } from '../store/notifications-actions';
import { Notification } from '../model/notification';
import { BiaMessageService } from 'src/app/core/bia-core/services/bia-message.service';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { TargetedFeature } from 'src/app/shared/bia-shared/model/signalR';
import { getAllTeams } from '../../team/store/team.state';
import { Team } from '../../team/model/team';

/**
 * Service managing SignalR events for hangfire jobs.
 * To use it:
 * - Add a parameter of this type in the constructor of your component (for dependency injection)
 * - Call the 'initialize()' method on it, so that dependency injection is truly performed
 */
@Injectable()
export class NotificationSignalRService {

  private targetedFeature: TargetedFeature;
  private myTeams: Team[];

  /**
   * Constructor.
   * @param store the store.
   * @param signalRService the service managing the SignalR connection.
   */
  constructor(
    private store: Store<AppState>,
    private signalRService: BiaSignalRService,
    private authService: AuthService,
    private messageService: BiaMessageService) {
  }

  /**
   * Initialize SignalR communication.
   * Note: this method has been created so that we have to call one method on this class, otherwise dependency injection is not working.
   */
  initialize() {
    this.store.select(getAllTeams).subscribe(teams => {
      this.myTeams = teams;
    });

    this.signalRService.addMethod('notification-addUnread', (args) => {
      const notification: Notification = JSON.parse(args);
      notification.data = JSON.parse(notification.jData);
      if (this.IsInMyDisplay(notification)) {
        this.messageService.showNotification(notification);
        this.store.dispatch(addUnreadNotification({ id: notification.id }));
      }
    });

    this.signalRService.addMethod('notification-removeUnread', (id) => {
      console.log('%c [Notification] Notification Count', 'color: green; font-weight: bold');
      const idNum: number = +id;
      this.store.dispatch(removeUnreadNotification({ id: idNum }));
    });

    this.signalRService.addMethod('notification-removeSeveralUnread', (args) => {
      const ids: number[] = JSON.parse(args);
      console.log('%c [Notification] Notification Count', 'color: green; font-weight: bold');
      ids.forEach(idNum => this.store.dispatch(removeUnreadNotification({ id: idNum })));
    });

    this.targetedFeature = { featureName: 'notification-domain' };
    this.signalRService.joinGroup(this.targetedFeature);
  }

  private IsInMyDisplay(notification: Notification) {
    const additionalInfo = this.authService.getAdditionalInfos();

    const okUser: Boolean = (notification.notifiedUsers === undefined) ||
      (notification.notifiedUsers === null) ||
      (notification.notifiedUsers.length === 0) ||
      (notification.notifiedUsers.some(u => u.id === additionalInfo.userInfo.id));

    const okTeam: Boolean = !notification.notifiedTeams ||
      (notification.notifiedTeams.length === 0) ||
      (notification.notifiedTeams.some(notifiedTeam => this.myTeams.some(myTeam => myTeam.id === notifiedTeam.id)));

    return okUser && okTeam;
  }

  destroy() {
    this.signalRService.removeMethod('notification-addUnread');
    this.signalRService.removeMethod('notification-removeUnread');
    this.signalRService.leaveGroup(this.targetedFeature);
  }
}
