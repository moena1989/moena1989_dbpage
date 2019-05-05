import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DbMainService} from '../../services/routes/db-main.service';
import {CurrentStorageService} from '../../services/current-storage.service';
import {ToolsServices} from '../../services/tools-services.service';
import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {DEFAULT_CODE_LANG, WATCH_PARTS} from '../../../environments/environment';

@Component({
  selector: 'app-visualizador-config-caja',
  templateUrl: './config-case-page.component.html',
  styleUrls: ['./config-case-page.component.scss']
})
export class ConfigCasePageComponent implements OnInit {
  public partType = {};
  constructor(public current: CurrentStorageService) {
  }

  ngOnInit(): void {
    this.partType = WATCH_PARTS.CASE;
  }
}
