import { Component, NgZone, OnInit } from '@angular/core';
import { DbManagerService } from '../../_services/db-manager.service';
import { ToolsService } from '../../_services/tools.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  err_msg = '';

  constructor(private db: DbManagerService, public tool: ToolsService,
    private router: Router, private auth: AuthService, private ngZone: NgZone) {
  }

  ngOnInit() {
    console.log('me cago en la verga maldita sea no joda coño ');
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
    console.log('mierdad !!, parece que ya entendí como funciona la joda de github con VSCode');

  }

  signInWithZoho() {
    // console.log(window.location.pathname);
    this.router.navigate(['/externalRedirect', { externalUrl: 'https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.users.ALL&client_id=1000.A67SKNS3UDRO530634DXY89X5CFYNO&response_type=code&access_type=online&redirect_uri=' + this.tool.urlDomain + '/OAuthCallback' }], {
      skipLocationChange: true,
    });
    // this.auth.signInWithZoho();
  }
}

