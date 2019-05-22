import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-m-select',
  templateUrl: './m-select.component.html',
  styleUrls: ['./m-select.component.css']
})
export class MSelectComponent implements OnInit {
  @Input() tittle = 'titulín';
  @Input() isDisabled = false;
  defaultOp = {name: '------'};
  currentOps = [];
  isSelected = false;
  @Output() whenSelecting: EventEmitter<any> = new EventEmitter(true);

  constructor() {
  }

  @Input() set items(options: any[]) {
    this.currentOps.length = 0;
    if (options !== undefined) { // existe d  ata
      this.currentOps = options;
      // si solamente tiene una selección entonces que sea la predeterminada
      if (options.length === 1) {
        // console.log('se selecciona autamaticamente');
        this.isSelected = true;
        // debo esperar para que no lance el pinche probela
        setTimeout(() => this.whenSelecting.emit(options[0]), 100);
      }
    }
  }

  @Input() set selectedItem(value: any) {
    if (value !== undefined) {
      this.isSelected = true;
      this.whenSelecting.emit(value);
      this.defaultOp = value;
    } else {
      this.isSelected = false;
    }
  }

  ngOnInit() {
  }
}
