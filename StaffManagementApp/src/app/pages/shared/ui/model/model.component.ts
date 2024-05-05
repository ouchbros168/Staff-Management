import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [],
  templateUrl: './model.component.html',
  styles: ``
})
export class ModelComponent {
  @Input() isOpen = false;
  @Output() closeModel = new EventEmitter();

  onCloseModel() {
    this.closeModel.emit(false);
  }
}
