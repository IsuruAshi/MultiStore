import {Component, OnInit} from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";
import {CartService} from "../../service/cart.service";
import {HttpClient} from "@angular/common/http";
import {loadStripe} from "@stripe/stripe-js";

@Component({
  selector: 'app-cart',
  template: `
      <mat-card class="max-w-7xl mx-auto" *ngIf="cart.items.length">
          <table mat-table [dataSource]="dataSource"
                 class="mat-elevation-z8 w-full">
              <ng-container matColumnDef="product">
                  <th mat-header-cell *matHeaderCellDef>Product</th>
                  <td mat-cell *matCellDef="let element">
                      <input class="w-[100px] my-5"
                             type="image" src="{{element.product}}" alt="product">
                  </td>
                  <td mat-footer-cell *matFooterCellDef>
                      <button mat-raised-button routerLink="/home">Continue Shopping</button>
                  </td>
              </ng-container>
              <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef>Name</th>
                  <td mat-cell *matCellDef="let element">
                      <span class="truncate max-w-xs block">{{ element.name }}</span>
                  </td>
                  <td mat-footer-cell *matFooterCellDef></td>
              </ng-container>
              <ng-container matColumnDef="price">
                  <th mat-header-cell *matHeaderCellDef>Price</th>
                  <td mat-cell *matCellDef="let element">
                      <span class="truncate max-w-xs">{{ element.price|currency }}</span>
                  </td>
                  <td mat-footer-cell *matFooterCellDef></td>
              </ng-container>
              <ng-container matColumnDef="quantity">
                  <th mat-header-cell *matHeaderCellDef>Quantity</th>
                  <td mat-cell  *matCellDef="let element">
                      <button
                              (click)="onRemoveQuantity(element)"
                              mat-icon-button>
                          <mat-icon>remove</mat-icon>
                      </button>
                      <span class="pb-4">{{ element.quantity }}</span>
                      <button
                              (click)="onAddQuantity(element)"
                              mat-icon-button>
                          <mat-icon>add</mat-icon>
                      </button>
                  </td>
                  <td mat-footer-cell *matFooterCellDef></td>
              </ng-container>
              <ng-container matColumnDef="total">
                  <th mat-header-cell *matHeaderCellDef>Total</th>
                  <td mat-cell *matCellDef="let element">
                      <span class="truncate max-w-xs">
                          {{ (element.quantity * element.price)|currency }}</span>
                  </td>
                  <td mat-footer-cell *matFooterCellDef>
                      <span class="font-bold py-5 block">
                          {{ getTotal(cart.items)|currency }}
                      </span>
                  </td>
              </ng-container>
              <ng-container matColumnDef="action">
                  <th mat-header-cell *matHeaderCellDef>
                      <button (click)="onClearCart()"
                              mat-raised-button color="warn" class="float-right">
                          Clear All
                      </button>
                  </th>
                  <td mat-cell *matCellDef="let element">
                      <!--                      <p class="truncate max-w-xs">{{element.total}}</p>-->
                      <button (click)="onRemoveFromCart(element)"
                              mat-mini-fab color="primary" class="float-right">
                          <mat-icon>close</mat-icon>
                      </button>
                  </td>
                  <td mat-footer-cell *matFooterCellDef>
                      <button
                              (click)="onCheckOut()"
                              mat-raised-button color="primary" class="float-right">
                          Process To CheckOut
                      </button>
                  </td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns "></tr>
              <tr mat-footer-row *matFooterRowDef="displayedColumns"></tr>
          </table>

      </mat-card>
      <mat-card class="max-w-7xl mx-auto p-2"
                *ngIf="!cart.items.length">
          <span class="pe-2 text-cyan-900 p-1">Your cart is empty.
              <button mat-raised-button routerLink="/home">Start shopping</button>
          </span>
      </mat-card>
  `,
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: []
  };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'quantity',
    'total',
    'action'
  ]

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  constructor(private cartService: CartService,private  http:HttpClient) {
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  onClearCart(){
    this.cartService.clearCart();
  }
  onRemoveFromCart(item:CartItem){
      this.cartService.removeFromCart(item);
  }
  onAddQuantity(item:CartItem){
    this.cartService.addToCart(item);
  }
  onRemoveQuantity(item:CartItem){
    this.cartService.removeQuantity(item);
  }
  onCheckOut(){
      this.http.post('http://localhost:4242/checkout',{
        items:this.cart.items
      }).subscribe(async (res:any)=>{
        let stripe= await loadStripe('pk_test_51OSCBTSGbojHSoUBsjKxo7rOau1sZCQNGpFYrI0HAzQxvteZb6zGMqvlKFjLw4WkkyrJd12lwtMNoFjXc6KuYUH600TckUdO63');
        stripe?.redirectToCheckout({
          sessionId:res.id
        })
      });
  }


}
