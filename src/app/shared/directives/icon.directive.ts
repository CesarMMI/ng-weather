import { Directive } from '@angular/core';

@Directive({
  selector: '[appIcon]',
  host: { class: 'material-symbols-rounded' },
})
export class IconDirective {}
