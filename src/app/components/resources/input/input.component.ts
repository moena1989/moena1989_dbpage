import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() ttl: string;
  @Input() placeholder: string;
  @Output() whenWriting = new EventEmitter();
  @Output() enterPressed = new EventEmitter();
  // number, email, text, pass,
  @Input() type = 'text';
  @Input() isDisabled: boolean;
  val: any = '';
  @Input() capitalizar = true;
  @Input() langCode: string = undefined;
  @Input() staticPlaceHolder = undefined;
  @Input() maxLength = 200;
  @Input() errMsg = '';
  @Input() upperCase = false;

  constructor() {
  }

  @Input() set value(val: string) {
    this.val = '';
    this.errMsg = '';
    if (val !== undefined) {
      this.val = val;
      this.tesText();
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
    // todo: tiene que haber una mejor manera de mayusculizar...
    this.tesText();
  }

  tesText() {
    if (this.upperCase) {
      this.val = this.val.toUpperCase();
    }

    if (this.capitalizar) {
      switch (this.type) {
        case'text':
          break;
        case 'number':
          break;
        case 'email':
          break;
      }
    }

    this.whenWriting.emit(this.val);
  }

  clear() {
    this.val = '';
    this.whenWriting.emit(this.val);
  }

  send($event) {
    this.enterPressed.emit(this.val);
  }
}
