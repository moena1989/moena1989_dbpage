import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CurrentStorageService} from '../../services/current-storage.service';
import {DbMainService} from '../../services/routes/db-main.service';
import {ItemConfigComponent} from '../../item-config/item-config.component';
import {combineLatest, Subject, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-visualizador-config-caja',
  templateUrl: './config-case-page.component.html',
  styleUrls: ['./config-case-page.component.scss']
})
export class ConfigCasePageComponent implements OnInit, OnDestroy {
  @ViewChild('item') itemConfig: ItemConfigComponent;
  public itemType = 'cases';
  public productType = 'watches';
  public category = 'structures';
  typeName = 'Especie';
  msgNewItem = 'Nueva Especie';
  collections: any = undefined;
  private codeFilter: Subject<any> = new Subject();
  private modelIdFilter: Subject<any> = new Subject();
  private obCases: Subscription;
  public errMsg = '';
  private modelSelected: any;
  private obCollections: Subscription;
  private collectionSelected: any;

  constructor(public current: CurrentStorageService, private db: DbMainService) {
    this.obCases = this.findCode().subscribe(value => {
      if (value !== undefined && value[0]) {
        this.errMsg = 'Código ya utilizado.';
      } else {
        this.errMsg = '';
      }
      console.log('se encontró', value);
    });

    this.obCollections = this.getCollectionsFiltered().subscribe(value => {
        if (value !== undefined && value[0]) {
        }
        this.collections = value;
        console.log(value);
      }
    );
  }

  ngOnInit(): void {
    this.beforePush();
  }

  selectingModel(m) {
    console.log('se selecciona modelo', m);
    this.modelSelected = m;
    this.modelIdFilter.next(m.metadata.id);
    this.itemConfig.currentItem.model = m;
  }

  findCode() {
    return combineLatest(this.codeFilter).pipe(switchMap(([code]) => {
      return this.db.getGeneralItemsByWhereFilters(this.productType,
        this.category, this.itemType, [{a: 'code', b: '==', c: code}]);
    }));
  }

  beforePush() {
    this.itemConfig.beforePush.subscribe(value => {
      this.itemConfig.promiseBeforePush = new Promise(resolve => {
        this.itemConfig.currentItem.name = this.itemConfig.currentItem.model.code
          + this.itemConfig.currentItem.collection.code
          + '-'
          + this.itemConfig.currentItem.name;
        resolve();
      });
    });
  }

  whenWrittingCode(code: any) {
    console.log('código: ', code);
    this.itemConfig.currentItem.code = code;
    this.codeFilter.next(code);
  }

  ngOnDestroy(): void {
    this.obCases.unsubscribe();
    this.obCollections.unsubscribe();
  }

  selectingCollection(c: any) {
    this.collectionSelected = c;
    this.itemConfig.currentItem.collection = c;
  }

  private getCollectionsFiltered() {
    return combineLatest(this.modelIdFilter).pipe(switchMap(([code]) => {
      return this.db.getGeneralItemsByWhereFilters(this.productType, this.category, 'collections',
        [{a: 'model.metadata.id', b: '==', c: code}]);
    }));
  }
}
