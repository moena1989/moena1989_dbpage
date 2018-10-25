import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DbService} from '../services/db.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public db: DbService, public router: Router) {
  }

  ngOnInit() {
  }

  buscarSerial(serial: any) {
    if (serial.value !== '') {
      // const nsumCallback: () => {};

      this.db.buscarReloj(serial.value, (result: any) => {
        // aún no sé si es mejor enviar los datos desde aquí o desde la func buscarReloj
        if (result) {

          this.router.navigateByUrl('/busqueda');
          console.log(result);
          this.db.relojBuscado = result;
          serial.value = '';
        } else {
          // no existe serial
          console.log('ese serial no existe');
        }
      });
    } else {
      console.log('no se escribió ningun serial');
    }
  }

  cerrarCuenta() {
    this.db.logout();
    this.router.navigate(['/login']);

  }
}
