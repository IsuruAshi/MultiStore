import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar class="max-w-7xl mx-auto border-x justify-between">
        <a routerLink="home">Store</a>
        <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon
                    [matBadge]="1"
                    matBadgeColor="warn"
            >shopping_cart</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
            <div class="p-3 divide-y divide-solid">
                <div class="pb-3 flex justify-between">
                    <span class="mr-16">1 Items</span>
                    <a routerLink="cart">View Cart</a>
                </div>
                <div class="py-3">
                    <div class="flex justify-between font-light mb-2">
                        Keyboard x 1
                        <span class="font-bold">{{'150'|currency:"Rs."}}</span>
                    </div>
                    <div class="flex justify-between font-light mb-2">
                        Keyboard x 1
                        <span class="font-bold">{{'150'|currency:"Rs."}}</span>
                    </div>
                    <div class="flex justify-between font-light mb-2">
                        Keyboard x 1
                        <span class="font-bold">{{'150'|currency:"Rs."}}</span>
                    </div>
                </div>
                <div class="flex justify-between py-3 font-light">
                    Total:
                    <span class="font-bold">{{'450'|currency:"Rs."}}</span>
                </div>
                <div class="pt-3 flex justify-between">
                    <button class="bg-rose-700 text-white rounded-full w-10 h-10 pt-1">
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

}
