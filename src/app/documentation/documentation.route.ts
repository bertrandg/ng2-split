import { Component } from '@angular/core'

@Component({
  selector: 'r-documentation',
  styles: [`
    :host {
      display: block;
      width: 100%;
      margin: 100px 0;
    }
    h4 {
      margin: 20px 0;
    }
    .direcive {
      font-weight: bold;
      color: #f9d676;
    }
  `],
  template: `
    <div class="container">
        <p style="font-size: 22px; font-weight: bold; color: red;">Deprecated library, please use <a href="https://github.com/bertrandg/angular-split/">angular-split</a>.</p>
        <br>
        <h3>Documentation</h3>
        <h4>Directive <span class="direcive">&#60;split&#62;</span></h4>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>@Input()</th>
              <th>Type</th>
              <th>Default</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>direction</td>
              <td>string</td>
              <td>'horizontal'</td>
              <td>Specify 'horizontal' or 'vertical'.</td>
            </tr>
            <tr>
              <td>width</td>
              <td>number</td>
              <td>null</td>
              <td>Specify a value in pixels or null and it will take all space available.</td>
            </tr>
            <tr>
              <td>height</td>
              <td>number</td>
              <td>null</td>
              <td>Specify a value in pixels or null and it will take all space available.</td>
            </tr>
          </tbody>
        </table>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>@Output()</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>dragStart</td>
              <td>Emit when drag starts.</td>
            </tr>
            <tr>
              <td>drag</td>
              <td>Emit when dragging.</td>
            </tr>
            <tr>
              <td>dragEnd</td>
              <td>Emit when drag ends.</td>
            </tr>
          </tbody>
        </table>
        <h4>Directive <span class="direcive">&#60;split-area&#62;</span></h4>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>@Input()</th>
              <th>Type</th>
              <th>Default</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>size</td>
              <td>number</td>
              <td>null</td>
              <td>Percentage of the area. If null or if all areas sizes not equal to 100,<br>all areas will have the same size.</td>
            </tr>
          </tbody>
        </table>
        <br>
        <button class="btn btn-default" routerLink="/examples">View examples</button>
    </div>`
})
export class DocumentationRouteComponent {
  code1: string = `npm install ng2-split --save`
  code2: string = ``
}
