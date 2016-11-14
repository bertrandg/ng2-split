import { NgModule } from '@angular/core'

import { SplitDirective } from './split.directive'
import { SplitAreaDirective } from './splitArea.directive'

@NgModule({
  declarations: [
    SplitDirective,
    SplitAreaDirective
  ],
  exports: [
    SplitDirective,
    SplitAreaDirective
  ]
})
export class SplitModule {}
