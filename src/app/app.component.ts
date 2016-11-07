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
  title = 'app works!';
  isA1:boolean = true
  isA2:boolean = true
  isB1:boolean = true
  isB2:boolean = true
  isC1:boolean = true
  isC2:boolean = true
  splitWidth: number = null
  splitHeight: number = null
  
  dragReport(type) {
    console.log('dragReport ', type);
  }
}
