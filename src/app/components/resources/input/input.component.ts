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
  @Input() value = '';

  constructor() {
  }

  ngOnInit() {
    // if (this.value === undefined) {
    //   this.value = '';
    //   this.alEscribir.emit(this.value);
    // }
  }

  capitalize(s) {
    if (typeof s !== 'string') {
      return '';
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  tecla(evt: any) {


    this.alEscribir.emit(this.capitalize(this.value));
  }
}
