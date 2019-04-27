import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() ttl: string;
  @Input() placeholder: string;
  @Output() alEscribir = new EventEmitter();
  @Input() disable: boolean;
  val = '';
  @Input() capitalizar = true;

  constructor() {
  }

  @Input() set value(val: string) {
    this.val = '';
    if (val !== undefined) {
      this.val = val;
    }
  }

  ngOnInit() {
  }

  capitalize(s) {
    if (typeof s !== 'string') {
      return '';
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  tecla(evt: any) {
    if (this.capitalizar) {
      this.alEscribir.emit(this.capitalize(this.val));
    } else {
    }
  }
}
