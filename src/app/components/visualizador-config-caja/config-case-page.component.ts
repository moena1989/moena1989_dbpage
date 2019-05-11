import {Component, OnInit, ViewChild} from '@angular/core';
import {CATEGORIES, WATCH_PARTS} from '../../../environments/environment';
import {CurrentStorageService} from '../../services/current-storage.service';
import {DbMainService} from '../../services/routes/db-main.service';
import {ItemConfigComponent} from '../../item-config/item-config.component';
import {combineLatest, Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-visualizador-config-caja',
  templateUrl: './config-case-page.component.html',
  styleUrls: ['./config-case-page.component.scss']
})
export class ConfigCasePageComponent implements OnInit {
  items: any = undefined;
  public itemType = WATCH_PARTS.CASE;
  public category = CATEGORIES.STRUCTURE;
  cases: any;
  modelSelected: any = undefined;
  externalDiameterSelected: any = undefined;
  @ViewChild('caseConfig') itemConfig: ItemConfigComponent;

  modelIdFilter = new Subject<string>();
  externalDiameterFilter = new Subject<string>();
  diameters = [];

  constructor(public currentData: CurrentStorageService, public db: DbMainService) {
    this.cases = currentData.cases;
    currentData.getCasesEmitter.subscribe(cases => {
      this.cases = cases;
    });
    const s = combineLatest(
      this.modelIdFilter,
      this.externalDiameterFilter
    ).pipe(switchMap(([model, ed]) => {
      return this.db.getItemsByWhereFilters('cases', [{a: 'model.metadata.id', b: '==', c: model}, {
        a: 'externalDiameter',
        b: '==',
        c: ed
      }]);
    }));
    s.subscribe(value => {
      if (this.externalDiameterSelected) {
        this.items = value;
      }
    });
  }

  ngOnInit(): void {
  }

  selectModel(model: any) {
    this.modelSelected = model;
    this.itemConfig.currentItem['model'] = model;
    this.externalDiameterSelected = undefined;
    this.itemConfig.currentItem['externalDiameter'] = undefined;
    this.diameters = model.externalDiameters;
    console.log(this.diameters);
    this.modelIdFilter.next(model.metadata.id);
  }

  selectExternalDiameter(ed: any) {
    this.externalDiameterSelected = ed;
    this.itemConfig.currentItem['externalDiameter'] = ed;
    this.externalDiameterFilter.next(ed);
  }

}
