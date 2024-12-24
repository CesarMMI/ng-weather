import { Directive } from '@angular/core';
import { IconDirective } from './icon.directive';

@Directive({
	selector: 'button[appIconButton]',
	hostDirectives: [IconDirective],
  host: {class: 'cursor-pointer transition-colors text-xl text-neutral-400 hover:text-neutral-100'}
})
export class IconButtonDirective {}
