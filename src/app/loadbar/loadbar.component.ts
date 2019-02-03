import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loadbar',
  templateUrl: './loadbar.component.html',
  styleUrls: ['./loadbar.component.scss']
})
export class LoadbarComponent implements OnInit {
  @Input() fill = 25;

  constructor() {
  }

  ngOnInit() {
  }

}
