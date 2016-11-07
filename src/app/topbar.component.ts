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
        <li class="nav-item" [class.active]="router.isActive('/example1', true)">
          <a class="nav-link" routerLink="/example1">Example 1</a>
        </li>
        <li class="nav-item" [class.active]="router.isActive('/example2', true)">
          <a class="nav-link" routerLink="/example2">Example 2</a>
        </li>
      </ul>
    </nav>`
})
export class TopbarComponent {
    constructor(public router: Router) {}
}
