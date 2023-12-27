import {Component} from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";

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
                     <p class="truncate max-w-xs">{{element.name}}</p>
                  </td>
                  <td mat-footer-cell *matFooterCellDef></td>
              </ng-container>
              <ng-container matColumnDef="price">
                  <th mat-header-cell *matHeaderCellDef>Price</th>
                  <td mat-cell *matCellDef="let element">
                      <p class="truncate max-w-xs">{{element.price|currency:"Rs."}}</p>
                  </td>
                  <td mat-footer-cell *matFooterCellDef></td>
              </ng-container>
              <ng-container matColumnDef="quantity">
                  <th mat-header-cell *matHeaderCellDef>Quantity</th>
                  <td mat-cell *matCellDef="let element">
                      <p class="truncate max-w-xs">{{element.quantity}}</p>
                  </td>
                  <td mat-footer-cell *matFooterCellDef></td>
              </ng-container>
              <ng-container matColumnDef="total">
                  <th mat-header-cell *matHeaderCellDef>Total</th>
                  <td mat-cell *matCellDef="let element">
                      <p class="truncate max-w-xs">{{element.total}}</p>
                  </td>
                  <td mat-footer-cell *matFooterCellDef>
                      <span class="font-bold py-5 block">
                          {{getTotal(cart.items)|currency:"Rs."}}
                      </span>
                  </td>
              </ng-container>
              <ng-container matColumnDef="action">
                  <th mat-header-cell *matHeaderCellDef>
                      <button mat-raised-button color="warn" class="float-right">
                          Clear All
                      </button>
                  </th>
                  <td mat-cell *matCellDef="let element">
                      <p class="truncate max-w-xs">{{element.total}}</p>
                  </td>
                  <td mat-footer-cell *matFooterCellDef>
                      <span class="font-bold py-5 block">
                          {{getTotal(cart.items)|currency:"Rs."}}
                      </span>
                  </td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns "></tr>
              <tr mat-footer-row *matFooterRowDef="displayedColumns"></tr>
          </table>

      </mat-card>
      <mat-card class="max-w-7xl mx-auto"
                *ngIf="!cart.items.length">
          <p>Your cart is empty.
              <button mat-raised-button routerLink="/home">Start shopping</button>
          </p>
      </mat-card>
  `,
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart: Cart = {
    items: [{
      product: 'https://via.placeholder.com/150',
      name: 'snickers',
      price: 150,
      quantity: 1,
      id: 1
    }]
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
    this.dataSource = this.cart.items;
  }
  getTotal(items:Array<CartItem>):number{
     return items.map((item)=>
       item.price* item.quantity)
       .reduce((prev,current)=> (prev* current))
  }


}
