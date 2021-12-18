import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[alertDirective]' })
export class AlertDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
