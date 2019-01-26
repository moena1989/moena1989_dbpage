import {Component, OnInit} from '@angular/core';
import {DbService} from '../../_services/db.service';
import {ToolsService} from '../../_services/tools.service';

@Component({
  selector: 'app-worker-reg',
  templateUrl: './worker-reg.component.html',
  styleUrls: ['./worker-reg.component.css']
})
export class WorkerRegComponent implements OnInit {

  constructor(private db: DbService, private tools: ToolsService) {
  }

  ngOnInit() {
  }

  registrarUser(mail: string, pass: string, name: string, last_name: string, cargo: string) {
    const usr = {name: name, email: mail, last_name: last_name, cargo: cargo};
    this.db.pushNuevoUsuario(usr, pass);
    // this.tools.snack.show('Registro exitoso! ;)');
  }
}


