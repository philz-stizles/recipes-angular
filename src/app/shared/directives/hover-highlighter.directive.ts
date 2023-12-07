import {
  Directive,
  Renderer2,
  ElementRef,
  HostListener,
  HostBinding,
  Input,
} from '@angular/core';

interface Colors {
  bgColor: string;
  color: string;
}

@Directive({
  selector: '[appHoverHighlighter]',
})
export class HoverHighlighterDirective {
  @Input() defaultColors: Colors = { bgColor: 'transparent', color: 'black' };
  @Input() highlightColors: Colors = { bgColor: 'blue', color: 'white' };
  @HostBinding('style.backgroundColor') backgroundColor!: string;
  @HostBinding('style.color') color!: string;

  @HostListener('mouseenter') mouseEnter(event: Event) {
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   'background-color',
    //   'blue'
    // );
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
    // this.backgroundColor = 'blue';
    // this.color = 'white';
    this.backgroundColor = this.highlightColors.bgColor;
    this.color = this.highlightColors.color;
  }

  @HostListener('mouseleave') mouseLeave(event: Event) {
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   'background-color',
    //   'transparent'
    // );
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');
    // this.backgroundColor = 'transparent';
    // this.color = 'black';
    this.backgroundColor = this.defaultColors.bgColor;
    this.color = this.defaultColors.color;
  }
}
