import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() width: string;
  @Input() height: string;
  @Input() textColor: string;
  @Input() buttonColor: string;
  @Input() buttonText: string;
  @Input() isDisabled: boolean | null;

  @Output() buttonClickEvent = new EventEmitter();

  constructor() { }

  onButtonClick(): void {
      this.buttonClickEvent.emit();
  }
}