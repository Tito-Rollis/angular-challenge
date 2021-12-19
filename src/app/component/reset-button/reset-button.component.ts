import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reset-button',
  templateUrl: './reset-button.component.html',
  styleUrls: ['./reset-button.component.scss'],
})
export class ResetButtonComponent implements OnInit {
  @Output() resetHandler = new EventEmitter();
  constructor() {}
  reset() {
    return this.resetHandler.emit();
  }
  ngOnInit(): void {}
}
