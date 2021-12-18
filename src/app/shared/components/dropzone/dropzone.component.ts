import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
})
export class DropzoneComponent {
  @Input('accept') accept = '.jpg,.jpeg,.png,';
  @Input('multiple') multiple = false;
  @Output('dropped') droppedEvent = new EventEmitter<File[]>();

  hovered = false;

  onChange(event: any | File[]) {
    const files: File[] = Array.isArray(event)
      ? event
      : [...event.target.files];
    this.droppedEvent.emit(files);
  }
}
