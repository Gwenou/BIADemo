import { Component, Output, EventEmitter, SimpleChanges, Input, OnInit, TemplateRef, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BiaTableComponent } from 'src/app/shared/bia-shared/components/table/bia-table/bia-table.component';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { BiaMessageService } from 'src/app/core/bia-core/services/bia-message.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DictOptionDto } from '../bia-table/dict-option-dto';

@Component({
  selector: 'bia-calc-table',
  templateUrl: './bia-calc-table.component.html',
  styleUrls: ['../bia-table/bia-table.component.scss']
})
export class BiaCalcTableComponent extends BiaTableComponent implements OnInit, AfterContentInit {
  @Input() canAdd = true;
  @Input() canEdit = true;
  @Output() save = new EventEmitter<any>();
  @Input() dictOptionDtos: DictOptionDto[];

  public formId: string;
  public form: FormGroup;
  public element: any = {};
  public hasChanged = false;
  protected currentRow: HTMLElement;
  protected sub = new Subscription();
  protected isInComplexInput = false;

  specificInputTemplate: TemplateRef<any>;
  
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public biaMessageService: BiaMessageService,
    public translateService: TranslateService
  ) {
    super(authService, translateService);
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
        switch(item.getType()) {
          case 'specificInput':
            this.specificInputTemplate = item.template;
          break;
          case 'specificOutput':
            this.specificOutputTemplate = item.template;
          break;
        }
    });
  }

  ngOnInit() {
    this.initForm();
    this.addFooterEmptyObject();
  }


  public getOptionDto(key: string) {
    return this.dictOptionDtos.filter((x) => x.key === key)[0]?.value;
  }

  public onElementsChange(changes: SimpleChanges) {
    super.onElementsChange(changes);
    if (changes.elements && this.table) {
      //if (this.elements && this.canAdd === true) {
        this.addFooterEmptyObject();
      //}
    }
  }

  public addFooterEmptyObject() {
    if (this.elements && this.canAdd === true && this.elements.filter(el => el.id === 0).length === 0) {
      this.elements = [...this.elements, { id: 0 }];
    }
  }

  public initForm() {
    throw new Error('initForm not Implemented');
  }

  public isFooter(element: any) {
    return element.id === 0;
  }

  public onChange() {
    this.hasChanged = true;
  }

  public initEditableRow(rowData: any) {
    if (this.canEdit === true && (!rowData || (rowData && this.table.editingRowKeys[rowData.id] !== true))) {
      if (this.hasChanged === true) {
        if (this.form.valid) {
          this.onSave();
          this.cancel();
          this.initRowEdit(rowData);
        } else {
          this.biaMessageService.showWarning(this.translateService.instant('biaMsg.invalidForm'));
        }
      } else {
        this.cancel();
        this.initRowEdit(rowData);
      }
    }
  }
  public initRowEdit(rowData: any) {
    if (rowData) {
      this.element = rowData;
      this.table.initRowEdit(rowData);
      this.form.reset();
      this.form.patchValue({ ...rowData });
    }
  }

  public onSave() {
    if (this.hasChanged === true) {
      this.onSubmit();
      this.hasChanged = false;
    }
  }

  public cancel() {
    this.hasChanged = false;
    this.form.reset();
    this.table.editingRowKeys = {};
  }

  public onSubmit() {
    throw new Error('onSubmit not Implemented');
  }

  public onFocusout() {
    setTimeout(() => {
      if (this.isInComplexInput !== true &&
        this.getParentComponent(document.activeElement, 'bia-calc-form') === null /*&&
        this.getParentComponent(document.activeElement, 'p-datepicker') === null*/
      ) {
        this.initEditableRow(null);
      }
    }, 200);
  }

  public onComplexInput(isIn : boolean)
  {
    if (isIn) {
      this.isInComplexInput = true;
      this.currentRow = this.getParentComponent(document.activeElement, 'p-selectable-row') as HTMLElement;
    }
    else
    {
      this.isInComplexInput = false;
      this.currentRow?.focus();
      this.onFocusout();
    }
  }

  public getParentComponent(el: Element | null, parentClassName: string): HTMLElement | null {
    if (el) {
      while (el.parentElement) {
        if (el.parentElement.classList.contains(parentClassName)) {
          return el.parentElement;
        } else {
          el = el.parentElement;
        }
      }
    }
    return null;
  }

  public formatDisplayName(objs: any[]): string {
    return objs?.map(x => x.display)?.join(', ');
  }
}
