import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[buttonLoader]',
})
export class ButtonLoaderDirective {
  @Input('buttonLoader') set buttonLoader(value: boolean) {
    value ? this.createLoader() : this.removeLoader();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  private setLoadingClass() {
    this.renderer.addClass(this.elementRef.nativeElement, 'btn-loading');
  }

  private removeLoadingClass() {
    this.renderer.removeClass(this.elementRef.nativeElement, 'btn-loading');
  }

  private createLoader() {
    const loaderDivEl = this.renderer.createElement('div');
    this.renderer.addClass(loaderDivEl, 'loader');

    for (let i = 0; i < 3; i++) {
      const spanEl = this.renderer.createElement('span');
      this.renderer.addClass(spanEl, 'dot');
      this.renderer.addClass(spanEl, `dot-${i + 1}`);
      this.renderer.appendChild(loaderDivEl, spanEl);
    }

    this.renderer.appendChild(this.elementRef.nativeElement, loaderDivEl);
    this.setLoadingClass();
  }

  private removeLoader() {
    [...this.elementRef.nativeElement.children].forEach((el: HTMLDivElement) =>
      this.renderer.removeChild(this.elementRef.nativeElement, el)
    );
    this.removeLoadingClass();
  }
}
