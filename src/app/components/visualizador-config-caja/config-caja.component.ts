import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DbMainService} from '../../services/routes/db-main.service';
import {CurrentStorageService} from '../../services/current-storage.service';
import {ToolsServices} from '../../services/tools-services.service';
import {NgxSmartModalComponent} from 'ngx-smart-modal';

@Component({
  selector: 'app-visualizador-config-caja',
  templateUrl: './config-caja.component.html',
  styleUrls: ['./config-caja.component.scss']
})
export class ConfigCajaComponent implements OnInit {
  public currentItem: any = undefined;
  public currentImg: any;
  public isEditable = false;
  public isNewItem = false;
  idiomaSeleccionado: any;
  @ViewChild('mdGuardarItem') modalGuardar: NgxSmartModalComponent;
  @ViewChild('mdEliminarItem') modalEliminar: NgxSmartModalComponent;
  @ViewChild('mdActualizarItem') modalActualizar: NgxSmartModalComponent;
  //
  public MSG_NEW_ITEM: any = 'Nueva Caja';
  typeItem = 'caja';
  private ITEM_TYPE = 'cases';
  private IMG_ROUTE = 'products/watches/parts/';
  //
  private esImagenActualizable = false;
  private _currentItem: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private db: DbMainService,
              public current: CurrentStorageService, public tools: ToolsServices) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.idiomaSeleccionado = this.current.defaultSelectedLang;
  }

  ngOnInit() {
    this.idiomaSeleccionado = this.current.defaultSelectedLang;
  }

  selectLanguage(t: any) {
    this.idiomaSeleccionado = t;
  }

  pushNewItem() {
    this.db.setNewImage(this.currentImg, this.IMG_ROUTE + this.ITEM_TYPE).then(imgData => {
        this.currentItem['imgData'] = imgData;
        this.db.setItem(this.ITEM_TYPE, this.currentItem).then(value => {
          this.modalGuardar.close();
          this.isEditable = false;
          this.currentItem = undefined;
          this.isNewItem = false;
        });
      }
    );
  }

  onFileChanged(imagen: any) {
    this.currentImg = imagen;
    // console.log('la imagen cambió');
    if (!this.isNewItem && this.isEditable) {
      this.esImagenActualizable = true;
    }
  }

  updateItem() {
    this.db.updateImage(this.currentImg, this.route, this.currentItem.imgData.key).then(imgData => {
      this.currentItem.imgData = imgData;
      // console.log(this.currentItem.imgData);
      this.db.updateItem(this.ITEM_TYPE, this.currentItem).then(value => {
        this.isEditable = false;
        this.modalActualizar.close();
      });
    });
  }

  writing($event: any) {
    this.currentItem[this.idiomaSeleccionado.codigo].nombre = $event;
    if (this.idiomaSeleccionado.codigo === 'es') {
      this.currentItem.nombre = $event;
    }
  }

  newItem() {
    // console.log('se va a registrar una nueva caja ;)');
    this.isNewItem = true;
    this.idiomaSeleccionado = this.current.defaultSelectedLang;
    this.currentItem = {};
    this.currentItem = {imgData: {}, ...this.current.multiLangStructure};
    this.isEditable = true;
    // console.log('el item', this.currentItem);
  }

  deletItem() {
    this.db.deleteItem(this.ITEM_TYPE, this.currentItem).then(value => {
      this.currentItem = undefined;
      this.modalEliminar.close();
    });
  }

  writingName($event: any) {
    this.currentItem.nombre = $event;
    this.currentItem['es'].nombre = $event;
  }

  selectItem(item: any) {
    this.currentItem = item;
    this.isNewItem = false;
  }

  cancelEditing() {
    this.currentItem = this._currentItem;
    this.isEditable = !this.isEditable;
  }

  startEditing() {
    // console.log('iniciando edición');
    this.isEditable = !this.isEditable;
    this._currentItem = Object.assign({}, this.currentItem);
  }

  cancelNewItem() {
    this.currentItem = undefined;
    this.isNewItem = false;
    this.isEditable = false;
  }
}
