import { Component, Input } from '@angular/core'


@Component({
  selector: 'r-example2-actions',
  styles: [`
    :host {
      width: 300px; 
      background-color: rgba(0, 0, 0, .5);
    }
    .area {
        background-color: rgba(0, 0, 0, .3);
        cursor: pointer;
        margin: 5px;
        text-align: center;
        color: #ffffff;
    }
    .area.full {
        background-color: rgba(0, 0, 0, 1);
    }
  `],
  template: `
    <p>Show/hide areas clicking on it:</p>
    <div style="width: 100px; float: left;">
        <div class="area" [class.full]="display.isA1" (click)="display.isA1 = !display.isA1">A1</div>
        <div class="area" [class.full]="display.isA2" (click)="display.isA2 = !display.isA2">A2</div>
    </div>
    <div style="width: 100px; float: left;">
        <div class="area" [class.full]="display.isB1" (click)="display.isB1 = !display.isB1">B1</div>
        <div class="area" [class.full]="display.isB2" (click)="display.isB2 = !display.isB2">B2</div>
    </div>
    <div style="width: 100px; float: left;">
        <div class="area" [class.full]="display.isC1" (click)="display.isC1 = !display.isC1">C1</div>
        <div class="area" [class.full]="display.isC2" (click)="display.isC2 = !display.isC2">C2</div>
    </div>`
})
export class ActionsComponent {
  @Input() display
}
