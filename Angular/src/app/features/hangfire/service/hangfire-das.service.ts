import { Injectable, Injector } from '@angular/core';
import { GenericDas } from 'src/app/core/bia-core/services/generic-das.service';

@Injectable({
  providedIn: 'root'
})
export class HangfireDas extends GenericDas {
  constructor(injector: Injector) {
    super(injector, 'hangfires');
  }

  callWorkerWithNotification(teamId: number) {
    return this.http.put(this.route + 'callworkerwithnotification/' + teamId, null);
  }
}
