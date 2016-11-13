import { Component } from '@angular/core'

@Component({
  selector: 'r-documentation',
  styles: [`
    :host {
      display: block;
      width: 100%;
      margin: 100px 0;
    }
  `],
  template: `
    <div class="container">
        <h3>Documentation</h3>
        <h3>Directive</h3>
        <p>...</p>
        <h3>Directive</h3>
        <p>...</p>
    </div>`
})
export class DocumentationRouteComponent {
  code1: string = `npm install ng2-split --save`
  code2: string = ``
}
