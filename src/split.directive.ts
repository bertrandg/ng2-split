import { Directive, ElementRef, HostBinding, ChangeDetectionStrategy, AfterViewChecked, OnChanges, EventEmitter, Input, Output, Renderer, OnDestroy, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs/Subject'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/debounceTime';

import {SplitAreaDirective, IAreaData} from './splitArea.directive'


declare var Split;

@Directive({
  selector: 'split'
})
export class SplitDirective implements OnChanges, OnDestroy {
    @Input() direction: string = 'horizontal'
    @Input() width: string
    @Input() height: string
    
    @Output() dragStart = new EventEmitter<null>(false)
    @Output() drag = new EventEmitter<null>(false)
    @Output() dragEnd = new EventEmitter<null>(false)
    
    private areas:Array<IAreaData> = []
    private splitInstance: any
    private rebuild$ = new Subject<boolean>()
    private sub: Subscription

    constructor(public el: ElementRef, public renderer: Renderer) {
      this.sub = this.rebuild$.debounceTime(1).subscribe(() => this.build());
    }

    public addArea(area: IAreaData) {
      this.areas.push(area);
      this.rebuild$.next(true);
    }
  
    public removeArea(area: IAreaData) {
      const index = this.areas.indexOf(area);
      if(index !== -1) {
        this.areas.splice(index, 1);
        this.rebuild$.next(true);
      }
    }
    
    public ngOnChanges(changes) {
        this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
        this.renderer.setElementStyle(this.el.nativeElement, 'width', this.width && Number.isNaN(Number(this.width)) === false ? this.width+'px' : '100%');
        this.renderer.setElementStyle(this.el.nativeElement, 'height', this.height && Number.isNaN(Number(this.height)) === false ? this.height+'px' : '100%');
        
        this.rebuild$.next(true);
    }
    
    private getSpecificChildren(className: string): Array<HTMLElement> {
      return Array.from(this.el.nativeElement.children).filter(elem => Array.from((elem as HTMLElement).classList).indexOf(className) > -1) as Array<HTMLElement>;
    }
    
    private destroy() {
      const gutters = this.getSpecificChildren('gutter');
      
      for(let i = gutters.length - 1; i >= 0; i--) {
        const gutter = gutters[i];
        if(gutter.parentNode) {
          gutter.parentNode.removeChild(gutter);
        }
      }
      
      this.splitInstance = null;
    }
    
    private build() {
      this.destroy();
      
      if(this.areas.length === 0 || this.areas.some(a => a.element === undefined)) {
        return;
      }
      
      if(this.areas.length === 1) {
        this.renderer.setElementStyle(this.areas[0].element, 'width', '100%');
        this.renderer.setElementStyle(this.areas[0].element, 'height', '100%');
        return;
      }
      
      this.areas.forEach(a => this.renderer.setElementStyle(a.element, 'height', null));
      
      // reorder areas following DOM order
      this.areas = this.areas.sort((a, b) => {
        if(a.element.previousElementSibling === null || b.element.nextElementSibling === null) return -1;
        if(a.element.nextElementSibling === null || b.element.previousElementSibling === null) return 1;
        if(a.element.nextElementSibling === b.element || b.element.previousElementSibling === a.element) return -1;
        if(b.element.nextElementSibling === a.element || a.element.previousElementSibling === b.element) return 1;
        return 0;
      });
      
      // calculate sizes
      const validSizes = this.areas.map(a => a.size).filter(s => Number.isNaN(s) === false);
      let sizes;
      
      if(validSizes.length === this.areas.length && validSizes.reduce((acc, s) => acc+s, 0) === 100) {
        sizes = validSizes;
      }
      else {
        const v = 100/this.areas.length;
        sizes = this.areas.map(() => v);
      }
      
      // build split
      const elements = this.areas.map(a => a.element);
      const params = {
        direction: this.direction,
        sizes: sizes,
        gutterSize: 8,
        minSize: 10,
        onDragStart: () => this.dragStart.emit(null),
        onDrag: () => this.drag.emit(null),
        onDragEnd: () => this.dragEnd.emit(null)
      }
      
      this.splitInstance = Split(elements, params);
      this.addStyles();
    }
    
    private addStyles() {
      const gutters = this.getSpecificChildren('gutter');
      
      gutters.forEach(gutter => {
        this.renderer.setElementStyle(gutter, 'background-color', '#eee');
        this.renderer.setElementStyle(gutter, 'background-repeat', 'no-repeat');
        this.renderer.setElementStyle(gutter, 'background-position', '50%');
        
        if(Array.from(gutter.classList).indexOf('gutter-horizontal') > -1) {
          this.renderer.setElementStyle(gutter, 'cursor', 'ew-resize');
          this.renderer.setElementStyle(gutter, 'background-image', `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg=='`);
          this.renderer.setElementStyle(gutter, 'height', '100%');
          this.renderer.setElementStyle(gutter, 'float', 'left');
        }
        else if(Array.from(gutter.classList).indexOf('gutter-vertical') > -1) {
          this.renderer.setElementStyle(gutter, 'cursor', 'ns-resize');
          this.renderer.setElementStyle(gutter, 'background-image', `url('data:image/png;base64,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')`);
        }
      });
      
      const splits = this.getSpecificChildren('split');
      
      splits.forEach(split => {
          this.renderer.setElementStyle(split, 'box-sizing', 'border-box');
          this.renderer.setElementStyle(split, 'overflow-x', 'hidden');
          this.renderer.setElementStyle(split, 'overflow-y', 'auto');
          
          if(Array.from(split.classList).indexOf('split-horizontal') > -1) {
            this.renderer.setElementStyle(split, 'height', '100%');
            this.renderer.setElementStyle(split, 'float', 'left');
          }
      })
    }
    
    public ngOnDestroy():void {
      if(this.sub) this.sub.unsubscribe();
      this.destroy();
    }
}