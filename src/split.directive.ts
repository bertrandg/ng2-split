import { Directive, ElementRef, HostBinding, ChangeDetectionStrategy, AfterViewChecked, OnChanges, EventEmitter, Input, Output, Renderer, OnDestroy, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs/Subject'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/debounceTime'

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
    private build$ = new Subject<boolean>()
    private sub: Subscription

    constructor(public el: ElementRef, 
                public renderer: Renderer) {
      this.sub = this.build$.debounceTime(1).subscribe(() => this.build());
    }

    public addArea(area: IAreaData) {
      this.areas.push(area);
      this.build$.next(true);
    }
  
    public removeArea(area: IAreaData) {
      const index = this.areas.indexOf(area);
      if(index !== -1) {
        this.areas.splice(index, 1);
        this.build$.next(true);
      }
    }
    
    public ngOnChanges(changes) {
        this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
        this.renderer.setElementStyle(this.el.nativeElement, 'width', this.width && Number.isNaN(Number(this.width)) === false ? this.width+'px' : '100%');
        this.renderer.setElementStyle(this.el.nativeElement, 'height', this.height && Number.isNaN(Number(this.height)) === false ? this.height+'px' : '100%');
        
        this.build$.next(true);
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
        onDragEnd: () => {
          this.dragEnd.emit(null);

          // Split.js remove cursor after send 'onDragEnd' event (line 247) 
          // add it again
          setTimeout(() => {
            const gutters = this.getSpecificChildren('gutter');

            gutters.forEach(gutter => {
              if(Array.from(gutter.classList).indexOf('gutter-horizontal') > -1) {
                this.renderer.setElementStyle(gutter, 'cursor', 'ew-resize');
              }
              else if(Array.from(gutter.classList).indexOf('gutter-vertical') > -1) {
                this.renderer.setElementStyle(gutter, 'cursor', 'ns-resize');
              }
            });
          });
        }
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
          this.renderer.setElementStyle(gutter, 'background-image', `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC)`);
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