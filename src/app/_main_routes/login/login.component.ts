import {Component, OnInit} from '@angular/core';
import {DbService} from '../../_services/db.service';
import {ToolsService} from '../../_services/tools.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private db: DbService, private tool: ToolsService) {
  }

  ngOnInit() {
  }

  ingresar(user: string, pass: string) {
    this.db.logIn(user, pass, result => {
      if (result === null) {
        this.tool.snack.show('Datos incorrectas :/ o usuario inexistente');
      } else {
        // el ingreso fue exitoso :D
        this.tool.snack.show('Bienvenido de nuevo ' + this.db.userLogueado.name);
        this.tool.router.navigate(['/registro/reloj']);
        console.log('testing keep log');
        console.log(result);
        localStorage.setItem('ob_login', result);
      }
    });
  }
}
