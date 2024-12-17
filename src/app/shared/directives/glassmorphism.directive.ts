import { Directive } from '@angular/core';

@Directive({
  selector: '[appGlassmorphism]',
  host: {
    class: `
    rounded-xl
    text-neutral-50
    bg-neutral-900
    bg-opacity-20
    backdrop-filter
    backdrop-blur-xl
    border
    border-neutral-500
  `,
  },
})
export class GlassmorphismDirective {}
