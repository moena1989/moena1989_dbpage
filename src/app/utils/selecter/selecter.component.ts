import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-selecter',
  templateUrl: './selecter.component.html',
  styleUrls: ['./selecter.component.css']
})
export class SelecterComponent implements OnInit {

  @Input() titulo = 'asdd';
  @Input() opciones = [];
  @Output() SelectedValue = new EventEmitter<String>();
  selectedValue: any;

  constructor() {
  }

  ngOnInit() {
  }

  selecciona(ev) {
    this.selectedValue = ev;
    console.log(ev);
    this.SelectedValue.emit(ev);
  }
}
