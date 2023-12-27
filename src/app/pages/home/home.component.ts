import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../service/cart.service";
import {Product} from "../../models/product.model";
import {Subscription} from "rxjs";
import {StoreService} from "../../service/store.service";

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
                  <mat-grid-tile *ngFor="let product of products">
                    <app-product-box
                            [product]="product"
                            (addToCart)="onAddToCart($event)"
                            class="w-full" [fullWidthMode]="cols===1"/>
                  </mat-grid-tile>

              </mat-grid-list>
          </mat-drawer-content>
      </mat-drawer-container>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy{
  cols=3;
  rowHeight=ROWS_HEIGHT[this.cols];
  category:string|undefined;
  products: Array<Product>|undefined;
  sort='desc';
  count:'12';
  productSubscription:Subscription| undefined;

  constructor(private cartService:CartService,private storeService:StoreService ) {
  }
  ngOnInit() {
    this.getProducts();
  }
  getProducts(){
   const productsSubscription= this.storeService.getAllProducts(this.count,this.sort)
      .subscribe((_products)=>{
        this.products=_products;
      })
  }
  onColumnsCountChange(colsNum:number){
    this.cols=colsNum;
    this.rowHeight=ROWS_HEIGHT[colsNum]
  }
  onItemsCountChange(count:number){
    // this.count=count.toString();
    this.getProducts();
  }
  onShowCategory(newCategory:string){
    this.category=newCategory;
  }
  onAddToCart(product:Product){
    this.cartService.addToCart({
      product:product.image,
      name:product.title,
      price:product.price,
      quantity:1,
      id:product.id
    });
  }
  ngOnDestroy() {
    if(this.productSubscription){}
    this.productSubscription?.unsubscribe();
  }

}
