import { Component, Input, OnInit } from '@angular/core'

declare const Prism

@Component({
  selector: 'r-snippet',
  template: `
    <pre [class]="'language-'+language"><code [innerHTML]="codeStr"></code></pre>`
})
export class SnippetComponent implements OnInit {
  @Input() code: string = ``
  @Input() language: string = ``
  
  codeStr: string
  
  ngOnInit() {
	  this.codeStr = Prism.highlight(this.code, Prism.languages[this.language]);
  }
}
