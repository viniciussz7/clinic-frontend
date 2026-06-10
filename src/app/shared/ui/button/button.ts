import { Component, computed, input } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
})
export class ButtonComponent {

  variant = input<ButtonVariant>('primary');

  type = input<'button' | 'submit' | 'reset'>('button');

  disabled = input(false);

  classes = computed(() => {

    const baseClasses =
      'rounded-lg px-4 py-3 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
      primary:
        'bg-brand text-white hover:bg-brand-hover',

      secondary:
        'bg-white border border-surface-input text-text-primary hover:bg-surface',

      danger:
        'bg-danger text-white hover:opacity-90',
    };

    return `${baseClasses} ${variantClasses[this.variant()]}`;
  });
}