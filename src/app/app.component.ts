import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
        <app-header/>
        <router-outlet/>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'store';
}
