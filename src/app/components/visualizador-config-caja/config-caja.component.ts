import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DbMainService} from '../../services/routes/db-main.service';
import {CurrentStorageService} from '../../services/current-storage.service';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-visualizador-config-caja',
  templateUrl: './config-caja.component.html',
  styleUrls: ['./config-caja.component.scss']
})
export class ConfigCajaComponent implements OnInit {
  esEditable = false;
  img: any;
  @Output() alregistrar = new EventEmitter();
  maqSelected: any;
  esNuevoItem = false;
  currentItem: any = {};
  private idiomaSeleccionado: any;

  constructor(private route: ActivatedRoute, private router: Router,
              private db: DbMainService, public current: CurrentStorageService, public tools: SettingsService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.idiomaSeleccionado = this.current.idiomaDefault;
    this.currentItem = {...this.current.multiLangStructure};
  }

  @Input('keyMaq')
  set keyMaq(value: boolean) {
    this.maqSelected = value;
    this.comprobarVar(this.maqSelected);
  }

  seleccionarIdioma(t: any) {
    this.idiomaSeleccionado = t;
  }

  ngOnInit() {
  }

  finalizarRegistro() {
    this.db.pushImage(this.img, 'modelos/reloj/cajas/', url => {
      this.currentItem['imgUrl'] = url;
      this.db.setItem('cajas', this.currentItem).then(value => {
        // this.router.navigateByUrl('caracteristicas/maqs/' + this.currentItem.nombre);
        this.alregistrar.emit(this.currentItem.nombre);
      });
    });
  }

  onFileChanged(imagen: any) {
    this.img = imagen;
  }

  eliminarMaquina() {
    console.log('jojojojo');
    // DbMainService.deleteImg(this.currentItem.imgUrl).then(value => {
    //   // console.log('se elimina la imagen D:');
    //   // this.db.deleteSpecificModel('maqs', this.maqSelected).then(value1 => {
    //   //   this.router.navigateByUrl('caracteristicas/maqs');
    //   //
    //   // });
    // });
  }

  escribirNombre($event: any) {
    // si bien la base de datos está basada en
    // español, la información multi-idioma, deber+a estar en la
    // carpeta de codigoo correspondiente, sin embargo, si o  si debe
    // haber un nombre que será basado en el español,
    this.currentItem[this.idiomaSeleccionado.codigo].nombre = $event;
    if (this.idiomaSeleccionado.codigo === 'es') {
      this.currentItem['nombre'] = $event;
    }
    console.log(this.currentItem);
  }

  private comprobarVar(maqSelected: any) {
    if (maqSelected === 'nuevo-item') {
      console.log('se va a registrar una nueva caja ;)');
      this.esNuevoItem = true;
      this.esEditable = true;
      this.currentItem = {...this.current.multiLangStructure};
    } else if (maqSelected !== '') {
      // buscar los datos de la maquinaria
      this.db.getItem('cajas', maqSelected).subscribe(value => {
        this.currentItem = value;
      });
    }
  }
}
