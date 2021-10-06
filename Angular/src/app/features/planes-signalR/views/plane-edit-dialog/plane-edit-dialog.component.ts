import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { update, closeDialogEdit } from '../../store/planes-actions';
import { Observable, Subscription } from 'rxjs';
import { getCurrentPlane, getDisplayEditDialog, getPlaneLoadingGet } from '../../store/plane.state';
import { Plane } from '../../model/plane';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-plane-edit-dialog',
  templateUrl: './plane-edit-dialog.component.html',
  styleUrls: ['./plane-edit-dialog.component.scss']
})
export class PlaneEditDialogComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  plane$: Observable<Plane>;
  display = false;
  private sub = new Subscription();
  @Output() displayChange = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.loading$ = this.store.select(getPlaneLoadingGet);
    this.plane$ = this.store.select(getCurrentPlane);
    this.sub.add(
      this.store
        .select(getDisplayEditDialog)
        
        .subscribe((x) => (this.display = x))
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmitted(planeToUpdate: Plane) {
    this.store.dispatch(update({ plane: planeToUpdate }));
    this.close();
  }

  onCancelled() {
    this.close();
  }

  close() {
    this.store.dispatch(closeDialogEdit());
  }
}
