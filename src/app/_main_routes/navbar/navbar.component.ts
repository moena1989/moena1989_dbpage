import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {DbService} from '../../_services/db.service';
import {ToolsService} from '../../_services/tools.service';
import {CurrentStorageService} from '../../_services/current-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('modal') modal: NgxSmartModalComponent;
  err_msg: string;

  constructor(public db: DbService, public router: Router, private tool: ToolsService, private currentStorage: CurrentStorageService) {
  }

  ngOnInit() {
  }

  cerrarCuenta() {
    this.db.logOut();
    this.router.navigate(['/logIn']);
  }

  buscarBySerial(serial: any) {
    console.log(serial);
    if (serial !== '') {
      this.db.buscarReloj(serial, (result: any) => {
        // aún no sé si es mejor enviar los datos desde aquí o desde la func buscarReloj
        if (result) {
          console.log('Producto encontrado');
          console.log(result);
          this.currentStorage.relojDisponible = result;
          serial = '';
          this.router.navigate(['/busqueda']);
          this.modal.close();
        } else {
          // no existe serial
          console.log('ese serial no existe');
          this.err_msg = ' No se encontró producto con ese serial';
        }
      });
    } else {
      console.log('no se escribió ningun serial');
      this.err_msg = ' No se ha encontrado el producto';
    }
  }

  abriModal() {
    this.modal.open();
    this.err_msg = '';
  }
}
