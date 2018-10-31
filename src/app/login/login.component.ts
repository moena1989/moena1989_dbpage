import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';
import {ToolsService} from '../tools.service';

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
    this.db.login(user, pass, result => {
      if (result === null) {
        this.tool.snack.show('Datos incorrectas :/ o usuario inexistente');
      } else {
        // el ingreso fue exitoso :D
        this.tool.snack.show('Hola,' + this.db.userLogueado.nombres);
        this.tool.router.navigate(['/registro/reloj']);
        console.log('testing keep log');
        localStorage.setItem('ob_login', result);
      }
    });
  }
}
