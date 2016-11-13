import { Component } from '@angular/core'

@Component({
  selector: 'r-home',
  styles: [`
    :host {
      display: block;
      width: 100%;
      margin: 100px 0;
    }
  `],
  template: `
    <div class="container">
        <div class="page-header">
          <h1>ng2-split <small><br>Angular2 wrapper for the great <a href="http://nathancahill.github.io/Split.js/">Split.js</a> library.</small></h1>
        </div>
        
        <br><br>
        <h3>Install npm module:</h3>
        <r-snippet [code]="code1" language="javascript"></r-snippet>
        <br>
        <h3>Import angular2 module:</h3>
        <r-snippet [code]="code2" language="javascript"></r-snippet>
        <br>
        <button class="btn btn-default" routerLink="/documentation">Documentation</button>
        <button class="btn btn-default" routerLink="/examples">View examples</button>
    </div>`
})
export class HomeRouteComponent {
  code1: string = `npm install ng2-split --save`
  code2: string = `import { SplitModule } from 'ng2-split'
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
}
