import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
	selector: '[appSkeleton]',
	host: {
		class: 'rounded',
		'[class.animate-pulse]': 'appSkeleton',
		'[class.bg-neutral-50]': 'appSkeleton',
	},
})
export class SkeletonDirective {
	@Input() appSkeleton: boolean = true;

	@HostBinding('class.animate-pulse') get animatePulse() {
		return this.appSkeleton;
	}

	@HostBinding('class.bg-neutral-50') get bgColor() {
		return this.appSkeleton;
	}
}
