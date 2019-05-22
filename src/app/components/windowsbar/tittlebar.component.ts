import {Component, OnInit} from '@angular/core';
import {ElectronService} from '../../electron.service';

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
    ElectronService.cerrar();
    // this.electron.send('close');
  }

  maximizar() {
    // ipcRenderer.send('maximize');
  }

  minimizar() {
    // ipcRenderer.send('minimize');
  }
}
