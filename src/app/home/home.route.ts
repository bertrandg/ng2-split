import { Component } from '@angular/core';

@Component({
  selector: 'r-home',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `],
  template: `
    <div>
        ng2-split
        <br>
        Angular2 wrapper for the great Split.js librairy.
    </div>`
})
export class HomeRouteComponent {
  
}
