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
        <r-snippet [code]="code1" language="javascript"></r-snippet>
        <r-snippet [code]="code2" language="javascript"></r-snippet>
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
