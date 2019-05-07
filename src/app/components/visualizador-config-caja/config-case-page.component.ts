import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WATCH_PARTS} from '../../../environments/environment';
import {CurrentStorageService} from '../../services/current-storage.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {DbMainService} from '../../services/routes/db-main.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-visualizador-config-caja',
  templateUrl: './config-case-page.component.html',
  styleUrls: ['./config-case-page.component.scss']
})
export class ConfigCasePageComponent implements OnInit {
  items: any = [];
  modelIdFilter: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public partType = {};
  cases: any;
  private qf: Observable<any[]>;
  private selectedModel: any;

  constructor(private route: ActivatedRoute, public current: CurrentStorageService, public db: DbMainService) {
    this.items = [];
    this.partType = WATCH_PARTS.CASE;
    this.cases = current.cases;
    this.modelIdFilter.pipe(switchMap(modelId => {
      return db.getItemsByModel('cases', modelId);
    })).subscribe(value => this.items = value);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedModel = this.current.models.filter(value => {
        return value.metadata.id === params.get('modelId');
      })[0];
      console.log('EL MODELO SELECCIONADO', params.get('modelId'));
      console.log('el pinche result', this.selectedModel);
    });

    this.modelIdFilter.next(this.route.snapshot.params.modelId);
  }
}
