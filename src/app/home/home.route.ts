import { Component } from '@angular/core'

declare const Prism

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
    <div class="container">
        ng2-split
        <br>
        Angular2 wrapper for the great Split.js library.
        <br><br>
        Installation:
        <pre><code>npm install ng2-split --save</code></pre>
        <pre class="language-javascript"><code [innerHTML]="codeStr"></code></pre>
    </div>`
})
export class HomeRouteComponent {
  _code: string = `import { SplitModule } from 'ng2-split'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    ...
    SplitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}`
  
  codeStr: string
  
  constructor() {
	  this.codeStr = Prism.highlight(this._code, Prism.languages.javascript);
  }
}
