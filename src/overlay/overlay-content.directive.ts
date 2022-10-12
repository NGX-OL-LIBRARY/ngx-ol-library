import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nolOverlayContent]',
  exportAs: 'nolOverlayContent'
})
export class NolOverlayContentDirective {

  constructor(public templateRef: TemplateRef<{}>) { }

}
