import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() message: string | null = null;
  @Output('onClose') closed = new EventEmitter();

  onClose = () => {
    this.closed.emit();
  };
}
