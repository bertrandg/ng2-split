import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    :host > div {
      padding-top: 54px;
      height: 100%;
      height: 100%;
    }
  `],
  template: `
    <topbar></topbar>
    <div>
      <router-outlet></router-outlet>
    </div>`
})
export class AppComponent {
}
