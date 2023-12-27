import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
      <mat-drawer-container
              class="min-h-full max-w-7xl mx-auto border-x"
              [autosize]="true">
          <mat-drawer mode="side" opened class="p-6">
              <app-filters (showCategory)="onShowCategory($event)"/>
          </mat-drawer>
          <mat-drawer-content class="p-6">
              <app-products-header (columnsCountChange)="onColumnsCountChange($event)"/>
              {{category}}
          </mat-drawer-content>
      </mat-drawer-container>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cols=3;
  category:string|undefined;
  onColumnsCountChange(colsNum:number){
    this.cols=colsNum;
  }
  onShowCategory(newCategory:string){
    this.category=newCategory;
  }
}
