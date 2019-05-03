import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DbMainService} from '../../services/routes/db-main.service';
import {CurrentStorageService} from '../../services/current-storage.service';
import {ToolsServices} from '../../services/tools-services.service';
import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {DEFAULT_CODE_LANG} from '../../../environments/environment';

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
  public selectedLanguage: any;
  @ViewChild('mdSaveItemWarn') modalGuardar: NgxSmartModalComponent;
  @ViewChild('mdDeleteItemWarn') modalEliminar: NgxSmartModalComponent;
  @ViewChild('mdUpdateItemWan') modalActualizar: NgxSmartModalComponent;
  @ViewChild('mdCancel') modalCancelEd: NgxSmartModalComponent;
  @ViewChild('mdCancel2') modalCancelNew: NgxSmartModalComponent;
  //
  public MSG_NEW_ITEM: any = 'Nueva caja';
  public typeItem = 'Caja';
  private ITEM_TYPE = 'cases';
  private IMG_ROUTE = 'products/watches/parts/' + this.ITEM_TYPE;
  private esImagenActualizable = false;
  private _currentItem: any = {};
  private hasImg = false;

  constructor(private route: ActivatedRoute, private router: Router, private db: DbMainService,
              public current: CurrentStorageService, public tools: ToolsServices) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.selectedLanguage = this.current.defaultSelectedLang;
  }

  private _isUploading = false;

  get isUploading(): boolean {
    return this._isUploading;
  }

  //
  finalizarUpload() {
    setTimeout(() => {
      this._isUploading = false;
    }, 500);
  }

  selectFirsOne() {
    if (this.current.cases[0]) {
      this.currentItem = this.current.cases[0];
    }
  }

  ngOnInit() {
    this.selectedLanguage = this.current.defaultSelectedLang;
    this.selectFirsOne();
    this.hasImg = false;
  }

  selectLanguage(t: any) {
    this.selectedLanguage = t;
  }

  pushNewItem() {
    this._isUploading = true;
    this.db.setNewImage(this.currentImg, this.IMG_ROUTE).then(imgData => {
        this.currentItem.imgData = imgData;
        this.db.setItem(this.ITEM_TYPE, this.currentItem).then(value => {
          this.modalGuardar.close();
          this.isEditable = false;
          // this.currentItem = undefined;
          this.isNewItem = false;
          this.hasImg = false;
          this.finalizarUpload();
        });
      }
    );
  }

  onFileChanged(imagen: any) {
    this.currentImg = imagen;
    this.hasImg = true;
    if (!this.isNewItem && this.isEditable) {
      this.esImagenActualizable = true;
    }
  }

  updateItem() {
    this._isUploading = true;
    this.db.updateImage(this.currentImg, this.IMG_ROUTE, this.currentItem.imgData.id).then(imgData => {
      this.currentItem.imgData = imgData;
      console.log(this.currentItem.imgData);
      this.db.updateItem(this.ITEM_TYPE, this.currentItem).then(value => {
        this.isEditable = false;
        this.modalActualizar.close();
        this.finalizarUpload();
      });
    });
  }

  whenWriting($event: any) {
    this.currentItem[this.selectedLanguage.code].name = $event;
    if (this.selectedLanguage.code === DEFAULT_CODE_LANG) {
      this.currentItem.name = $event;
    }
  }

  newItem() {
    // console.log('se va a registrar una nueva caja ;)');
    this.isNewItem = true;
    this.selectedLanguage = this.current.defaultSelectedLang;
    this.currentItem = {};
    this.currentItem = {imgData: {}, ...this.current.multiLangStructure};
    this.isEditable = true;
    // console.log('el item', this.currentItem);
  }

  deletItem() {
    this._isUploading = true;
    this.db.deleteImage(this.IMG_ROUTE, this.currentItem.imgData).toPromise().then(value => {
      this.db.deleteItem(this.ITEM_TYPE, this.currentItem).then(value1 => {
        this.currentItem = undefined;
        this.modalEliminar.close();
        this.finalizarUpload();
      });
    });
  }

  writingName($event: any) {
    this.currentItem.name = $event;
    this.currentItem[DEFAULT_CODE_LANG].name = $event;
  }

  selectItem(item: any) {
    this.currentItem = item;
    this.isNewItem = false;
  }

  cancelEditing() {
    this.currentItem = this._currentItem;
    this.isEditable = !this.isEditable;
    this.modalCancelEd.close();
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
    this.modalCancelNew.close();
    this.selectFirsOne();
  }
}
