import {Component, NgZone, OnInit} from '@angular/core';
import {DbManagerService} from '../../_services/db-manager.service';
import {ToolsService} from '../../_services/tools.service';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  err_msg = '';

  constructor(private db: DbManagerService, public tool: ToolsService, private router: Router, private auth: AuthService, private ngZone: NgZone) {
  }

  ngOnInit() {
    // console.log(user);
    // this.tool.gUser = user;
    // this.tool.router.navigate(['/home']);
    // this.tool.snack.show('Bienvenido,' + this.db.userLogueado.name, 'Que gusto tenerte por aquí', 'ok');/
  }

  ingresar() {
    this.auth.signInWithGoogle().then(value => {
      console.log('Maldita sea');
      // console.log(value.currentUser);
      this.ngZone.run(args => {
        this.router.navigateByUrl('/home');
      });
    });
  }

  salir(value: string, value2: string) {

  }
}

