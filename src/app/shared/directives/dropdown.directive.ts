import {
  Directive,
  HostBinding,
  HostListener,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({ selector: '[appDropdown]' })
export class DropdownDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  isShowing = false;

  @HostListener('click') toggle(event: Event) {
    this.isShowing = !this.isShowing;
    let dropdownToggle =
      this.elementRef.nativeElement.querySelector('.dropdown-toggle');
    let dropdownMenu =
      this.elementRef.nativeElement.querySelector('.dropdown-menu');

    if (this.isShowing) {
      this.renderer.addClass(dropdownToggle, 'show');
      this.renderer.setAttribute(dropdownToggle, 'aria-expanded', 'true');
      this.renderer.addClass(dropdownMenu, 'show');
    } else {
      this.renderer.removeClass(dropdownToggle, 'show');
      this.renderer.setAttribute(dropdownToggle, 'aria-expanded', 'false');
      this.renderer.removeClass(dropdownMenu, 'show');
    }
  }
}
