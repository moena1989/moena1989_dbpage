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
  // number, email, text, pass,
  // @Input() type = 'number';
  @Input() disable: boolean;
  val: any = '';
  @Input() capitalizar = true;
  @Input() multiLanguage: string = undefined;
  @Input() staticPlaceHolder = undefined;
  private cc: any;

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
      // this.va = cc;
      this.alEscribir.emit(this.capitalize(this.val));
      // switch (this.type) {
      //   case'text':
      //     // this.writing.emit(this.capitalize(this.val));
      //     break;
      //   case 'number':
      //     if (isNumeric(evt)) {
      //       console.log('y pues ajá');
      //       this.cc = evt;
      //     }
      //     break;
      //   case 'email':
      //     // this.writing.emit(this.capitalize(this.val));
      //     break;
      //
      // }
    }
  }
}
