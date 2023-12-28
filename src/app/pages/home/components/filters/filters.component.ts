import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {StoreService} from "../../../../service/store.service";
import {Subscription} from "rxjs";

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
export class FiltersComponent implements OnInit,OnDestroy{
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription :Subscription|undefined;
  categories : Array<string>|undefined;

  constructor(private storeService:StoreService) {
  }
  ngOnInit() {
    this.storeService.getAllCategories().subscribe((response)=>{
      this.categories=response;
    })
  }
  ngOnDestroy() {
    if(this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe();
    }
  }

  onShowCategories(category: string) {
    this.showCategory.emit(category);
  }
}
