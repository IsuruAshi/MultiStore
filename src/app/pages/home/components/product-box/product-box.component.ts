import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../models/product.model";

@Component({
  selector: 'app-product-box',
  template: `
      <mat-card [ngClass]="{'text-center':fullWidthMode}">
          <div [ngClass]="{'flex':fullWidthMode}">
              <img class="mb-1 mx-auto h-[200px]"
                   [ngClass]="{'h-200px': !fullWidthMode,
                 'h-[360px]':fullWidthMode}"
                   src="https://via.placeholder.com/150"
              />
              <div class="w-full"
                   [ngClass]="{'px-8 flex flex-col justify-between':fullWidthMode}">
                  <div>
                      <h5>Shoes</h5>
                      <p class="truncate hover:whitespace-normal">Snickers</p>
                      <p *ngIf="fullWidthMode">Description</p>
                  </div>
                  <div class="flex justify-between">
                      <span class="text-red-500">{{ '150'|currency:"Rs." }}</span>
                      <button (click)="onAddToCart()">
                          <mat-icon class="text-gray-600">shopping_cart</mat-icon>
                      </button>
                  </div>

              </div>
          </div>
      </mat-card>

  `,
  styleUrl: './product-box.component.scss'
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter();
  @Input() product: Product | undefined ;


  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
