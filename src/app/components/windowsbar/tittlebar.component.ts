import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tittlebar',
  templateUrl: './tittlebar.component.html',
  styleUrls: ['./tittlebar.component.scss']
})
export class TittlebarComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }


  cerrar() {
    // ipcRenderer.send('close');

  }

  maximizar() {
    // ipcRenderer.send('maximize');
  }

  minimizar() {
    // ipcRenderer.send('minimize');
  }
}
