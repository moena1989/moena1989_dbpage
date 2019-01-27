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
  }


  tecla(evt: any) {
    this.alEscribir.emit(this.value);
  }
}
