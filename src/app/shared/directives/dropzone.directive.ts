import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dropzone]',
})
export class DropzoneDirective {
  @Output('dropEvent') dropEvent = new EventEmitter<File[]>();
  @Output('hovered') hovered = new EventEmitter<boolean>();

  constructor() {}

  @HostListener('drop', ['$event']) drop(event: any) {
    event.preventDefault();

    const files = [...event.dataTransfer?.files].filter(
      this.isValidFile.bind(this)
    );

    this.dropEvent.emit(files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event']) dragOver(event: Event) {
    event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event']) dragLeave(event: Event) {
    event.preventDefault();
    this.hovered.emit(false);
  }

  private isValidFile(file: File) {
    return file.type.match(/jpg|png|jpeg/);
  }
}
