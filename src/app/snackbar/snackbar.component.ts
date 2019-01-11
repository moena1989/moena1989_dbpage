import {Component, OnInit} from '@angular/core';
import {ToolsService} from '../_services/tools.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {
  msg = '';
  minimal_time = 3000;
  snacktive = false;
  color = {};

  constructor() {
  }

  /*
  TODO Agregagr color dinamico, para identificar un mensaje positivo de uno negativo
   */

  ngOnInit() {
  }

  show(msg: string) {
    this.msg = msg;
    this.snacktive = true;
    setTimeout(() => this.snacktive = !this.snacktive, 3000);
  }
}
