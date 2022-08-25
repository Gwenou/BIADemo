import {
  Component,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CrudItemFormComponent } from 'src/app/shared/bia-shared/feature-templates/crud-items/components/crud-item-form/crud-item-form.component';
import { Plane } from '../../model/plane';

@Component({
  selector: 'app-plane-form',
  templateUrl: '../../../../shared/bia-shared/feature-templates/crud-items/components/crud-item-form/crud-item-form.component.html',
  styleUrls: ['../../../../shared/bia-shared/feature-templates/crud-items/components/crud-item-form/crud-item-form.component.scss'],
})

export class PlaneFormComponent extends CrudItemFormComponent<Plane> {
  constructor(public formBuilder: FormBuilder) {
    super(formBuilder);
  }
}

