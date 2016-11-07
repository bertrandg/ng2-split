import { Component } from '@angular/core'

@Component({
  selector: 'r-example1',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `],
  template: `
    <div class="container">
        Example1
        <pre><code class="language-html">{{ code }}</code></pre>
    </div>`
})
export class Example1RouteComponent {
  
  code: string = `<split direction="vertical">
      <split-area *ngIf="isA1" size="25">
          <div class="panel">A1</div>
      </split-area>
      <split-area *ngIf="isA2" size="75">
          <div class="panel">A2</div>
      </split-area>
  </split>`
}
