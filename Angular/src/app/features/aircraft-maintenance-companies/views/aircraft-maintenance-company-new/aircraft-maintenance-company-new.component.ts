import { Component, Injector } from '@angular/core';
import { AircraftMaintenanceCompany } from '../../model/aircraft-maintenance-company';
import { CrudItemNewComponent } from 'src/app/shared/bia-shared/feature-templates/crud-items/views/crud-item-new/crud-item-new.component';
import { AircraftMaintenanceCompanyService } from '../../services/aircraft-maintenance-company.service';
import { AircraftMaintenanceCompanyCRUDConfiguration } from '../../aircraft-maintenance-company.constants';

@Component({
  selector: 'app-aircraft-maintenance-company-new',
  templateUrl: './aircraft-maintenance-company-new.component.html',
})
export class AircraftMaintenanceCompanyNewComponent extends CrudItemNewComponent<AircraftMaintenanceCompany>  {
   constructor(
    protected injector: Injector,
    public aircraftMaintenanceCompanyService: AircraftMaintenanceCompanyService,
  ) {
     super(injector, aircraftMaintenanceCompanyService);
     this.crudConfiguration = AircraftMaintenanceCompanyCRUDConfiguration;
   }
}