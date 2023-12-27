import {Component, Input} from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar class="max-w-7xl mx-auto border-x justify-between">
        <a routerLink="home">Store</a>
        <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon
                    [matBadge]="itemsQuantity"
                    [matBadgeHidden]="!itemsQuantity"
                    matBadgeColor="warn"
            >shopping_cart</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
            <div class="p-3 divide-y divide-solid">
                <div class="pb-3 flex justify-between">
                    <span class="mr-16">{{itemsQuantity}} Items</span>
                    <a class="bg-amber-300 hover:bg-amber-400 rounded p-1" routerLink="cart">View Cart</a>
                </div>
                <div *ngIf="cart.items.length" class="py-3">
                    <div
                            *ngFor="let item of cart.items"
                            class="flex justify-between font-light mb-2">
                        {{ item.name }} x {{item.quantity}}
                        <span class="font-bold">{{item.price|currency:"Rs."}}</span>
                    </div>

                </div>
                <div class="flex justify-between py-3 font-light">
                    Total:
                    <span class="font-bold">{{getTotal(cart.items)|currency:"Rs."}}</span>
                </div>
                <div class="pt-3 flex justify-between">
                    <button (click)="onClearCart()"
                            class="bg-rose-700 text-white rounded-full w-10 h-10 pt-1">
                        <mat-icon>remove_shopping_cart</mat-icon>
                    </button>
                    <button
                            routerLink="cart"
                            class="bg-green-700 text-white rounded-full w-10 h-10 pt-1">
                        <mat-icon>shopping_cart</mat-icon>
                    </button>

                </div>

            </div>
        </mat-menu>

    </mat-toolbar>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _cart:Cart={items:[]};
  itemsQuantity=0;
  @Input()
  get cart():Cart{
    return this._cart;
  }
  set cart(cart:Cart){
    this._cart=cart;
    this.itemsQuantity=cart.items
      .map((item)=>item.quantity)
      .reduce((prev,curr)=>(prev+curr),0);
  }

  constructor(private cartService:CartService) {
  }
  getTotal(items:Array<CartItem>):number{
      return this.cartService.getTotal(items);
  }
  onClearCart(){
    this.cartService.clearCart();
  }

}
