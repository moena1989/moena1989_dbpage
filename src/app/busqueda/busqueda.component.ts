import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';
import {ToolsService} from '../tools.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  rj: any;
  act = false;

  /*
  En teoría, siempre se llegará a esta página cuando ya se halla encontrado un reloj, y deba proyectarse, el objeto buscado está en db
  TODO buscar una manera más opptima sin tener que guardarlo y traerlo de db.
   */
  constructor(public db: DbService, private tool: ToolsService) {
  }

  ngOnInit() {
  }

  buscarBySerial(serial: any) {
    console.log(serial);
    if (serial !== '') {
      this.db.buscarReloj(serial, (result: any) => {
        // aún no sé si es mejor enviar los datos desde aquí o desde la func buscarReloj
        if (result) {
          console.log('Producto encontrado');
          console.log(result);
          this.rj = result;
          this.act = true;
          serial = '';
        } else {
          // no existe serial
          console.log('ese serial no existe');
          this.tool.snack.show('No se encontró producto');
          this.act = false;
        }
      });
    } else {
      console.log('no se escribió ningun serial');
      this.tool.snack.show('No has ingreado ningún serial');
    }
  }
}
