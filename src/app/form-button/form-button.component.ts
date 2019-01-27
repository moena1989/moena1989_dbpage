import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements OnInit {
  @Output() click = new EventEmitter();
  @Input() text: string;

  constructor() {
  }

  ngOnInit() {
  }


  alPresionar() {
    this.click.emit();
  }
}
