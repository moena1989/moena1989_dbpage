import {Component, NgZone, OnInit} from '@angular/core';
import {DbManagerService} from '../../../services/db-manager.service';
import {ToolsServices} from '../../../services/tools-services.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/routes/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  err_msg = '';

  constructor(private db: DbManagerService, public tool: ToolsServices,
              private router: Router, private auth: AuthService, private ngZone: NgZone) {
  }

  ngOnInit() {
    // this.tool.gUser = user;
    // this.tool.router.navigate(['/home']);
    // this.tool.snack.show('Bienvenido,' + this.db.userLogueado.name, 'Que gusto tenerte por aquí', 'ok');/
  }

  ingresar() {
    this.auth.signInWithGoogle().then(value => {
      this.ngZone.run(args => {
      });
    });
  }

  signIn(email: string, pass: string) {
    console.log('login... ', email, pass);
    this.auth.signInWithEmail(email, pass).then(result => {
      if (result) {
        console.log('login correcto');
        this.router.navigateByUrl('/');
      } else {
        console.error('NARANJAS!');
        console.log(result);
      }
    });
  }
}

