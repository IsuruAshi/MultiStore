import { Component } from '@angular/core';

const ROWS_HEIGHT:{[id:number]:number}={1:400,3:335,4:350}
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
              <mat-grid-list
              gutterSize="16"
              [cols]="cols"
              [rowHeight]="rowHeight"
              >
                  <mat-grid-tile>
                    <app-product-box class="w-full" [fullWidthMode]="cols===1"/>
                  </mat-grid-tile>
                  <mat-grid-tile>
                      <app-product-box class="w-full" [fullWidthMode]="cols===1"/>
                  </mat-grid-tile>
                  <mat-grid-tile>
                      <app-product-box class="w-full" [fullWidthMode]="cols===1"/>
                  </mat-grid-tile>
                  <mat-grid-tile>
                      <app-product-box class="w-full" [fullWidthMode]="cols===1"/>
                  </mat-grid-tile>
                  <mat-grid-tile>
                      <app-product-box class="w-full" [fullWidthMode]="cols===1"/>
                  </mat-grid-tile>
              </mat-grid-list>
          </mat-drawer-content>
      </mat-drawer-container>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cols=3;
  rowHeight=ROWS_HEIGHT[this.cols];
  category:string|undefined;
  onColumnsCountChange(colsNum:number){
    this.cols=colsNum;
  }
  onShowCategory(newCategory:string){
    this.category=newCategory;
  }
}
