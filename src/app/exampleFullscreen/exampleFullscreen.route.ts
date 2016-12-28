import { Component, ViewChild, ElementRef } from '@angular/core'


@Component({
  selector: 'r-example2',
  styles: [`
    :host {
        display: block;
        width: 100%;
        height: 100%;
    }
    :host > split {
        outline: 5px dashed #f9d676;
    }
    h3 {
        margin: 20px 0;
    }
    h4 {
        color: #f9d676;
        font-weight: bold;
    }
    .panel {
        padding: 15px;
    }
  `],
  template: `
    <split direction="horizontal" [width]="splitWidth" [height]="splitHeight" (dragStart)="dragReport('Split A|B|C start')" (drag)="dragReport('Split A|B|C progress')" (dragEnd)="dragReport('Split A|B|C end')">
        <split-area *ngIf="display.isA1 || display.isA2" size="25">
            <split direction="vertical" (dragStart)="dragReport('Split A1|A2 start')" (drag)="dragReport('Split A1|A2 progress')" (dragEnd)="dragReport('Split A1|A2 end')">
                <split-area *ngIf="display.isA1" size="25">
                    <div class="panel">
                        <h4>A1</h4>
                        <r-example2-actions [display]="display"></r-example2-actions>
                    </div>
                </split-area>
                <split-area *ngIf="display.isA2" size="75">
                    <div class="panel">
                        <h4>A2</h4>
                        <h3>Update style (icones)</h3>
                    </div>
                </split-area>
            </split>
        </split-area>
        <split-area *ngIf="display.isB1 || display.isB2" size="50">
            <split direction="vertical" (dragStart)="dragReport('Split B1|B2 start')" (drag)="dragReport('Split B1|B2 progress')" (dragEnd)="dragReport('Split B1|B2 end')">
                <split-area *ngIf="display.isB1" size="50">
                    <div class="panel">
                        <p style="font-size: 22px; font-weight: bold; color: red;">Deprecated library, please use <a href="https://github.com/bertrandg/angular-split/">angular-split</a>.</p>
                        <br>
                        <h4>B1</h4>
                        <h3>Dynamic split</h3>
                        <r-snippet [code]="code" language="html"></r-snippet>
                    </div>
                </split-area>
                <split-area *ngIf="display.isB2" size="50">
                    <div class="panel">
                        <h4>B2</h4>
                        <br>
                        <p>Update main split size:</p>
                        <button (click)="splitWidth = splitWidth+10" [disabled]="splitWidth === null" class="btn btn-default">WIDTH++</button>
                        <button (click)="splitWidth = splitWidth-10" [disabled]="splitWidth === null" class="btn btn-default">WIDTH--</button>
                        <button (click)="splitWidth = 800" class="btn btn-default">WIDTH=800</button>
                        <button (click)="splitWidth = null" [disabled]="splitWidth === null" class="btn btn-default">WIDTH=null</button>
                        <br><br>
                        <button (click)="splitHeight = splitHeight+10" [disabled]="splitHeight === null" class="btn btn-default">HEIGHT++</button>
                        <button (click)="splitHeight = splitHeight-10" [disabled]="splitHeight === null" class="btn btn-default">HEIGHT--</button>
                        <button (click)="splitHeight = 800" class="btn btn-default">HEIGHT=800</button>
                        <button (click)="splitHeight = null" [disabled]="splitHeight === null" class="btn btn-default">HEIGHT=null</button>
                    </div>
                </split-area>
            </split>
        </split-area>
        <split-area *ngIf="display.isC1 || display.isC2" size="25">
            <split direction="vertical" (dragStart)="dragReport('Split C1|C2 start')" (drag)="dragReport('Split C1|C2 progress')" (dragEnd)="dragReport('Split C1|C2 end')">
                <split-area *ngIf="display.isC1" size="25">
                    <div class="panel">
                        <h4>C1</h4>
                        <r-example2-actions [display]="display"></r-example2-actions>
                    </div>
                </split-area>
                <split-area *ngIf="display.isC2" size="75" #logContainer>
                    <div class="panel" #logContainer>
                        <h4>C2</h4>
                        <h3>Events log:</h3>
                        <pre>{{ logs }}</pre>
                    </div>
                </split-area>
            </split>
        </split-area>
    </split>`
})
export class ExampleFullscreenRouteComponent {
  display = {
    isA1: true,
    isA2: true,
    isB1: true,
    isB2: true,
    isC1: true,
    isC2: true
  }
  splitWidth: number = null
  splitHeight: number = null
  logs: string = ''
  @ViewChild('logContainer') logContainer: ElementRef
  
  code: string = `
<split direction="horizontal" [width]="splitWidth" [height]="splitHeight" (dragStart)="dragReport('Split A|B|C start')" (drag)="dragReport('Split A|B|C progress')" (dragEnd)="dragReport('Split A|B|C end')">
    <split-area *ngIf="isA1 || isA2" size="25">
        <split direction="vertical" (dragStart)="dragReport('Split A1|A2 start')" (drag)="dragReport('Split A1|A2 progress')" (dragEnd)="dragReport('Split A1|A2 end')">
            <split-area *ngIf="isA1" size="25">A1</split-area>
            <split-area *ngIf="isA2" size="75">A2</split-area>
        </split>
    </split-area>
    <split-area *ngIf="isB1 || isB2" size="50">
        <split direction="vertical" (dragStart)="dragReport('Split B1|B2 start')" (drag)="dragReport('Split B1|B2 progress')" (dragEnd)="dragReport('Split B1|B2 end')">
            <split-area *ngIf="isB1" size="50">B1</split-area>
            <split-area *ngIf="isB2" size="50">B2</split-area>
        </split>
    </split-area>
    <split-area *ngIf="isC1 || isC2" size="25">
        <split direction="vertical" (dragStart)="dragReport('Split C1|C2 start')" (drag)="dragReport('Split C1|C2 progress')" (dragEnd)="dragReport('Split C1|C2 end')">
            <split-area *ngIf="isC1" size="25">C1</split-area>
            <split-area *ngIf="isC2" size="75">C2</split-area>
        </split>
    </split-area>
</split>`

  dragReport(type) {
    this.logs += `Event: ${type}\n`;
    
    if(this.logContainer) {
          this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight;
          console.log('this.logContainer.nativeElement.scrollHeight = ', this.logContainer.nativeElement.scrollHeight);
    }
  }

  ngAfterViewInit() {
  }
}
