import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filters',
  template: `
      <mat-expansion-panel *ngIf="categories">
          <mat-expansion-panel-header>
              <mat-panel-title>CATEGORIES</mat-panel-title>
          </mat-expansion-panel-header>
          <mat-selection-list [multiple]="false">
              <mat-list-option *ngFor="let category of categories">
                  <button (click)="onShowCategories(category)">{{ category }}</button>
              </mat-list-option>
          </mat-selection-list>
      </mat-expansion-panel>
  `,
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string>();
  categories = ["shoes", "sports"];

  onShowCategories(category: string) {
    this.showCategory.emit(category);
  }
}
