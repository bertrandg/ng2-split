import { Component } from '@angular/core'

@Component({
  selector: 'r-example2',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `],
  template: `
    <split direction="horizontal" [width]="splitWidth" [height]="splitHeight" (dragStart)="dragReport('start')" (drag)="dragReport('progress')" (dragEnd)="dragReport('end')">
        <split-area *ngIf="isA1 || isA2" size="25">
            <split direction="vertical">
                <split-area *ngIf="isA1" size="25">
                    <div class="panel">A1</div>
                </split-area>
                <split-area *ngIf="isA2" size="75">
                    <div class="panel">A2</div>
                </split-area>
            </split>
        </split-area>
        <split-area *ngIf="isB1 || isB2" size="50">
            <split direction="vertical">
                <split-area *ngIf="isB1" size="50">
                    <div class="panel">
                    B1
                    <br>
                    <button (click)="splitWidth = splitWidth+10" [disabled]="splitWidth === null">WIDTH++</button>
                    <button (click)="splitWidth = splitWidth-10" [disabled]="splitWidth === null">WIDTH--</button>
                    <button (click)="splitWidth = 600">WIDTH=600</button>
                    <button (click)="splitWidth = null" [disabled]="splitWidth === null">WIDTH=null</button>
                    <br>
                    <button (click)="splitHeight = splitHeight+10" [disabled]="splitHeight === null">HEIGHT++</button>
                    <button (click)="splitHeight = splitHeight-10" [disabled]="splitHeight === null">HEIGHT--</button>
                    <button (click)="splitHeight = 600">HEIGHT=600</button>
                    <button (click)="splitHeight = null" [disabled]="splitHeight === null">HEIGHT=null</button>
                    </div>
                </split-area>
                <split-area *ngIf="isB2" size="50">
                    <div class="panel">
                    B2
                    <br>
                    <div style="width: 300px; background-color: rgba(0, 0, 0, .5);">
                        <div style="width: 100px; float: left;">
                        <div class="area" [class.full]="isA1" (click)="isA1 = !isA1">A1</div>
                        <div class="area" [class.full]="isA2" (click)="isA2 = !isA2">A2</div>
                        </div>
                        <div style="width: 100px; float: left;">
                        <div class="area" [class.full]="isB1" (click)="isB1 = !isB1">B1</div>
                        <div class="area" [class.full]="isB2" (click)="isB2 = !isB2">B2</div>
                        </div>
                        <div style="width: 100px; float: left;">
                        <div class="area" [class.full]="isC1" (click)="isC1 = !isC1">C1</div>
                        <div class="area" [class.full]="isC2" (click)="isC2 = !isC2">C2</div>
                        </div>
                    </div>
                    </div>
                </split-area>
            </split>
        </split-area>
        <split-area *ngIf="isC1 || isC2" size="25">
            <split direction="vertical">
                <split-area *ngIf="isC1" size="25">
                    <div class="panel">C1</div>
                </split-area>
                <split-area *ngIf="isC2" size="75">
                    <div class="panel">C2</div>
                </split-area>
            </split>
        </split-area>
    </split>`
})
export class Example2RouteComponent {
  isA1:boolean = true
  isA2:boolean = true
  isB1:boolean = true
  isB2:boolean = true
  isC1:boolean = true
  isC2:boolean = true
  splitWidth: number = null
  splitHeight: number = null
  
  dragReport(type) {
    console.log('dragReport ', type);
  }
}
