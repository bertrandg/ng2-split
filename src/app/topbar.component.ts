import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'topbar',
  template: `
    <nav class="navbar navbar-fixed-top navbar-dark bg-inverse">
      <a class="navbar-brand" href="#">ng2-split</a>
      <ul class="nav navbar-nav">
        <li class="nav-item" [class.active]="router.isActive('/', true)">
          <a class="nav-link" routerLink="/">Home</a>
        </li>
        <li class="nav-item" [class.active]="router.isActive('/documentation', true)">
          <a class="nav-link" routerLink="/documentation">Documentation</a>
        </li>
        <li class="nav-item" [class.active]="router.isActive('/examples', true)">
          <a class="nav-link" routerLink="/examples">Examples</a>
        </li>
        <li class="nav-item" [class.active]="router.isActive('/example-fullscreen', true)">
          <a class="nav-link" routerLink="/example-fullscreen">Fullscreen example</a>
        </li>
      </ul>
    </nav>`
})
export class TopbarComponent {
    constructor(public router: Router) {}
}
