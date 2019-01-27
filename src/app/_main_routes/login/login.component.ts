import {Component, OnInit} from '@angular/core';
import {DbService} from '../../_services/db.service';
import {ToolsService} from '../../_services/tools.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  err_msg = '';

  constructor(private db: DbService, public tool: ToolsService) {
  }

  ngOnInit() {
  }

  ingresar(user: string, pass: string) {
    this.db.logIn(user, pass, result => {
      if (result === null) {
        this.tool.snack.show('Ups', 'Datos incorrectos o usuario inexistente', 'error');
        this.err_msg = 'Datos incorrectos o usuario inexistente';
      } else {
        // el ingreso fue exitoso :D
        this.tool.snack.show('Bienvenido,' + this.db.userLogueado.name, 'Que gusto tenerte por aquí', 'ok');
        this.tool.router.navigate(['/home']);
        console.log('testing keep log');
        console.log(result);
        localStorage.setItem('ob_login', result);
      }
    });
  }
}
