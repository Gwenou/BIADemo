import { Component, Injector } from '@angular/core';
import { Plane } from '../../model/plane';
import { PlaneCRUDConfiguration } from '../../plane.constants';
import { CrudItemEditComponent } from 'src/app/shared/bia-shared/feature-templates/crud-items/views/crud-item-edit/crud-item-edit.component';
import { PlaneService } from '../../services/plane.service';

@Component({
  selector: 'app-plane-edit',
  templateUrl: './plane-edit.component.html',
})
export class PlaneEditComponent extends CrudItemEditComponent<Plane> {
  constructor(
    protected injector: Injector,
    public planeService: PlaneService,
  ) {
    super(injector, planeService);
    this.crudConfiguration = PlaneCRUDConfiguration;
  }
}
