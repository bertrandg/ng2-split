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
import { DocumentationRouteComponent } from './documentation/documentation.route'
import { ExamplesRouteComponent } from './examples/examples.route'
import { ExampleFullscreenRouteComponent } from './exampleFullscreen/exampleFullscreen.route'
import { ActionsComponent } from './exampleFullscreen/actions.components'

const routes = [
  {path: '', component: HomeRouteComponent},
  {path: 'documentation', component: DocumentationRouteComponent},
  {path: 'examples', component: ExamplesRouteComponent},
  {path: 'example-fullscreen', component: ExampleFullscreenRouteComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SnippetComponent,
    HomeRouteComponent,
    DocumentationRouteComponent,
    ExamplesRouteComponent,
    ExampleFullscreenRouteComponent,
    ActionsComponent
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
