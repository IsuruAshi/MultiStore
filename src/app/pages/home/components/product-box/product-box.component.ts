import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../models/product.model";

@Component({
  selector: 'app-product-box',
  template: `
      <mat-card *ngIf="product" [ngClass]="{'text-center':!fullWidthMode}">
          <div class="bg-gradient-to-b from-white to-teal-100 p-1 rounded" [ngClass]="{'flex':fullWidthMode}">
              <img class="mb-1 mx-auto rounded"
                   [ngClass]="{'h-[200px]': !fullWidthMode,'h-[360px]':fullWidthMode}"
                   [src]="product.image" alt="product.title"
              />
              <div class="w-full"
                   [ngClass]="{'px-8 flex flex-col justify-between':fullWidthMode}">
                  <div>
                      <h4 class="bg-blue-900 rounded text-white">{{ product.category }}</h4>
                      <p class="truncate hover:whitespace-normal">{{ product.title }}</p>
                      <p *ngIf="fullWidthMode">{{ product.description }}</p>
                  </div>
                  <div class="flex justify-between">
                      <span class="text-white p-1 bg-gradient-to-b from-blue-800 to-teal-600 rounded">
                          {{ product.price|currency }}</span>
                      <button (click)="onAddToCart()">
                          <mat-icon class="text-green-900">shopping_cart</mat-icon>
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
