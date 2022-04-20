import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LdapDomain } from 'src/app/domains/ldap-domain/model/ldap-domain';
import { UserFromDirectory } from 'src/app/domains/user-from-AD/model/user-from-AD';
import { UserFilter } from 'src/app/domains/user-from-AD/model/user-filter';

@Component({
  selector: 'user-from-ldap-form',
  templateUrl: './user-from-ldap-form.component.html',
  styleUrls: ['./user-from-ldap-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFromLdapFormComponent implements OnChanges {
  @Output() searchUsers = new EventEmitter<UserFilter>();
  @Output() save = new EventEmitter<UserFromDirectory[]>();
  @Output() cancel = new EventEmitter();
  @Input() users: UserFromDirectory[];
  @Input() domains: LdapDomain[];

  selectedUsers: UserFromDirectory[];
  selectedDomain: string;
  form: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.users && changes.users) {
      this.users = this.users.sort((a, b) => {
        return a.firstName.localeCompare(b.firstName);
      });
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      selectedUsers: [this.selectedUsers, Validators.required],
      domains: [this.domains]
    });
  }

  onCancel() {
    this.reset();
    this.cancel.next();
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value.selectedUsers);
      this.reset();
    }
  }

  reset() {
    this.selectedDomain = '';
    this.form.reset();
  }

  onSearchUsers(event: any) {
    const userFiter: UserFilter = {
      filter: event.query,
      ldapName: this.selectedDomain
    };
    this.searchUsers.emit(userFiter);
  }

  onDomainChange(event: any) {
    const domain = event.value as LdapDomain;
    if (domain) {
      this.selectedDomain = (event.value as LdapDomain).ldapName;
    } else {
      this.selectedDomain = '';
    }
  }
}
