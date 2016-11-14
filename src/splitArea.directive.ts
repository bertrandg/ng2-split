import { Directive, ElementRef, Input, Renderer, ChangeDetectionStrategy, OnInit, OnDestroy, ViewChildren, HostBinding } from '@angular/core'

import {SplitDirective} from './split.directive'

export interface IAreaData {
  element: HTMLElement
  size: number
}


@Directive({
  selector: 'split-area'
})
export class SplitAreaDirective implements OnInit, OnDestroy {
    @Input() size: number
    conf: IAreaData
  
    constructor(public split: SplitDirective, 
                public el: ElementRef, 
                public renderer: Renderer) {}

    public ngOnInit():void {
      this.renderer.setElementClass(this.el.nativeElement, 'split', true);
      this.renderer.setElementClass(this.el.nativeElement, 'split-horizontal', this.split.direction === 'horizontal');
      this.renderer.setElementClass(this.el.nativeElement, 'split-vertical', this.split.direction === 'vertical');
      
      this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
      this.renderer.setElementStyle(this.el.nativeElement, 'height', this.split.direction === 'horizontal' ? '100%' : null);
      
      this.conf = {
        element: this.el.nativeElement,
        size: Number(this.size)
      }
      
      this.split.addArea(this.conf);
    }
    
    public ngOnDestroy():void {
      this.split.removeArea(this.conf);
    }
}