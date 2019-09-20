import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-m-select',
  templateUrl: './m-select.component.html',
  styleUrls: ['./m-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MSelectComponent),
      multi: true
    }
  ]
})
export class MSelectComponent implements OnInit, ControlValueAccessor {
  @Input() tittle = 'titulín';
  @Input() isDisabled = false;
  defaultOp = {name: '------'};
  currentOps = [];
  isSelected = false;
  @Output() whenSelecting: EventEmitter<any> = new EventEmitter(true);

  constructor() {
  }

  // se desactivará la selección automática.

  @Input() set items(options: any[]) {
    // this.currentOps.length = 0;
    this.selectedItem = undefined;
    if (options === undefined || options === null) {
      this.currentOps = [];
    } else { // existe d  ata
      this.currentOps = options;
      // si solamente tiene una selección entonces que sea la predeterminada
      // if (options.length === 1) {
      // console.log('SOLO EXISTE UNO');
      // console.log('se selecciona autamaticamente');
      // this.isSelected = true;
      // // debo esperar para que no lance el pinche probela
      // this.whenSelecting.emit(options[0]);
      // setTimeout(() => this.whenSelecting.emit(options[0]), 500);
      // }
    }
  }

  @Input() set selectedItem(value: any) {
    if (value !== undefined) {
      this.isSelected = true;
      this.defaultOp = value;
      this.whenSelecting.emit(value);
    } else {
      this.defaultOp = {name: '------'};
      this.isSelected = false;
    }
    this.isSelected = false;
  }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }

}
