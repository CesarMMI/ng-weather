import { Directive } from '@angular/core';

@Directive({
  selector: '[appGlassmorphism]',
  host: {
    class: `
    rounded-xl
    text-neutral-50
    bg-neutral-950
    bg-opacity-20
    backdrop-filter
    backdrop-blur-lg
    border
    border-neutral-600
  `,
  },
})
export class GlassmorphismDirective {}
