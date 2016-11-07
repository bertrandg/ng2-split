import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule }   from '@angular/router'
import { SplitModule } from 'ng2-split'

import { AppComponent } from './app.component'
import { TopbarComponent } from './topbar.component'
import { SnippetComponent } from './snippet.component'
import { HomeRouteComponent } from './home/home.route'
import { Example1RouteComponent } from './example1/example1.route'
import { Example2RouteComponent } from './example2/example2.route'

const routes = [
  {path: '', component: HomeRouteComponent},
  {path: 'example1', component: Example1RouteComponent},
  {path: 'example2', component: Example2RouteComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SnippetComponent,
    HomeRouteComponent,
    Example1RouteComponent,
    Example2RouteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    SplitModule
  ],
  providers: [{
    provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
