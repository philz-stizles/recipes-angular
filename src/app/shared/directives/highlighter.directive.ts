import {
  Directive,
  OnInit,
  Renderer2,
  ElementRef,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[appHighlighter]',
})
export class HighlighterDirective implements OnInit {
  // @HostBinding('style.backgroundColor') backgroundColor = 'transparent';
  // @HostBinding('style.color') color = 'black';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'blue'
    );
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
    // this.backgroundColor = 'blue';
    // this.color = 'white';
  }
}
